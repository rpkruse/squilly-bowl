import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Team } from '../../../models/team';
import { Round } from '../../../models/round';
import { StorageService } from '../../../services/storage.service';
import { SessionStorageKeys } from '../../../shared/constants';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-team-round',
  standalone: true,
  imports: [StatsComponent, CommonModule, FormsModule],
  templateUrl: './team-round.component.html',
  styleUrl: './team-round.component.scss'
})
export class TeamRoundComponent {
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
    const splitTeamLength = this.round.teams ? this.round.teams.length - 1 : 0;

    if (this.currentGameIndex >= splitTeamLength) {
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

  get nextSetOfTeams(): Team[] {
    if (this.round.teams && this.round.teams.length > 0) {
      return this.round.teams[this.currentGameIndex];
    }

    return [];
  }

  get continueButtonText(): string {
    const splitTeamLength = this.round.teams ? this.round.teams.length - 1 : 0;

    return this.currentGameIndex >= splitTeamLength ? 'Next Round' : 'Next Set';
  }

  get backDisabled(): boolean {
    return this.currentGameIndex === 0;
  }

  get nextDisabled(): boolean {
    if (!this.round.teams) return true;

    return this.round.teams[this.currentGameIndex].some(x => x.score <= -1 || isNaN(x.score) || (x.score === null || x.score === undefined));
  }
}
