import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../../models/player';
import { SessionStorageKeys } from '../../../shared/constants';
import { StorageService } from '../../../services/storage.service';
import { Round } from '../../../models/round';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-single-round',
  standalone: true,
  imports: [StatsComponent, CommonModule, FormsModule],
  templateUrl: './single-round.component.html',
  styleUrl: './single-round.component.scss'
})
export class SingleRoundComponent {
  private _round!: Round;
  @Input() set round (value: Round) {
    this._round = value;
    this.currentGameIndex = 0;

    const allRounds: Round[] | null = this.storageService.getValue<Round[]>(SessionStorageKeys.ROUNDS);

    if (allRounds) {
      this.roundInfo = allRounds;
    }
  }
  get round(): Round { return this._round; }

  @Input() roundTitle: string = '';
  @Input() roundIndex!: number;

  @Output() moveToNextRound: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentGameIndex: number = 0;
  roundInfo: Round[] = [];

  constructor(private storageService: StorageService) { }

  saveRoundDataToStorage(): void {
    const allRounds: Round[] | null = this.storageService.getValue<Round[]>(SessionStorageKeys.ROUNDS);

    if (allRounds) {
      allRounds[this.roundIndex] = this.round;
      this.storageService.setValue(SessionStorageKeys.ROUNDS, allRounds);

      this.roundInfo = allRounds;
    }
  }

  nextClicked(): void {
    this.saveRoundDataToStorage();
    const splitPlayerLength = this.round.players ? this.round.players.length - 1 : 0;

    if (this.currentGameIndex >= splitPlayerLength) {
      // Save the current round data and emit to move to the next round
      this.moveToNextRound.emit(true);
      return;
    }

    this.currentGameIndex++;
  }

  backClicked(): void {
    if (this.currentGameIndex <= 0) return;

    this.currentGameIndex--;
  }

  get nextSetOfPlayers(): Player[] {
    if (this.round.players && this.round.players.length > 0) {
      return this.round.players[this.currentGameIndex];
    }

    return [];
  }

  get continueButtonText(): string {
    const splitPlayerLength = this.round.players ? this.round.players.length - 1 : 0;

    return this.currentGameIndex >= splitPlayerLength ? 'Next Round' : 'Next Set';
  }

  get backDisabled(): boolean {
    return this.currentGameIndex === 0;
  }

  get nextDisabled(): boolean {
    if (!this.round.players) return true;

    return this.round.players[this.currentGameIndex].some(x => x.score <= -1 || isNaN(x.score) || (x.score === null || x.score === undefined));
  }
}
