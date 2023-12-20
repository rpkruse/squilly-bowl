import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { SessionStorageKeys, URL_ROUTES } from '../../shared/constants';
import { Game, GameFactory } from '../../models/game';
import { CommonModule } from '@angular/common';
import { NewPlayer, NewPlayerFactory } from '../../models/new-player';
import { FormsModule } from '@angular/forms';
import { GameGeneratorService } from '../../services/game-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  hasTeamRound: boolean = true;
  game!: Game;
  players: NewPlayer[] = [];
  newPlayerName: string = '';

  constructor(private storageService: StorageService, private gameService: GameGeneratorService, private router: Router) { }

  ngOnInit(): void {
    this.storageService.removeSessionData(SessionStorageKeys.GAME);
    this.storageService.removeSessionData(SessionStorageKeys.ROUNDS);
    // Either get a game from storage or create a new default game
    this.game = GameFactory.CreateNewGame();

    this.saveGameToStorage();
  }

  editPlayerClicked(newPlayer: NewPlayer): void {
    newPlayer.isEditMode = true;
  }

  savePlayerEditClicked(newPlayer: NewPlayer): void {
    newPlayer.isEditMode = false;
  }

  addNewPlayer(): void {
    if (!this.addNewPlayerEnabled) {
      return;
    }
    
    this.players.push(NewPlayerFactory.CreateNewPlayer(this.players.length, this.newPlayerName));

    this.newPlayerName = '';
  }

  deletePlayer(newPlayer: NewPlayer): void {
    const index: number = this.players.findIndex(x => x.id === newPlayer.id);

    if (index >= 0) {
      this.players.splice(index, 1);

      for (let i = index; i < this.players.length; i++) {
        this.players[i].id--;
      }
    }
  }

  startGame(): void {
    this.game = this.gameService.generateGame(this.players, this.game);
    this.saveGameToStorage();

    this.router.navigate([`${URL_ROUTES.PLAY}`]);
  }

  saveGameToStorage(): void {
    this.storageService.setValue<Game>(SessionStorageKeys.GAME, this.game);
  }

  get startEnabled(): boolean {
    const hasPlayers = this.players.length > 0;

    return hasPlayers;
  }

  get addNewPlayerEnabled(): boolean {
    return this.newPlayerName.trim().length > 0;
  }
}
