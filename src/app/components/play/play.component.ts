import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameGeneratorService } from '../../services/game-generator.service';
import { StorageService } from '../../services/storage.service';
import { Game } from '../../models/game';
import { Constants, ROUND_TYPE, SessionStorageKeys, URL_ROUTES } from '../../shared/constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../../models/player';
import { SingleRoundComponent } from '../shared/single-round/single-round.component';
import { TeamRoundComponent } from '../shared/team-round/team-round.component';
import { Round, RoundFactory } from '../../models/round';
import { Team } from '../../models/team';
import { EndGameComponent } from '../shared/end-game/end-game.component';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleRoundComponent, TeamRoundComponent, EndGameComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit {
  game!: Game;
  splitPlayers: Player[][] = [];
  rounds: Round[] = []; // each row will be it's own round

  constructor(private storageService: StorageService, private gameService: GameGeneratorService, private router: Router) { }

  ngOnInit(): void {
    const gameFromStorage = this.storageService.getValue<Game>(SessionStorageKeys.GAME);

    if (gameFromStorage === null) {
      this.router.navigate([`${URL_ROUTES.CREATE}`]);
      return;
    }

    this.game =  gameFromStorage;

    const roundsFromStorage: Round[] | null = this.storageService.getValue<Round[]>(SessionStorageKeys.ROUNDS);
    this.rounds = (roundsFromStorage !== null) ? roundsFromStorage : [];

    if (this.game.round === 1) {
      if (!roundsFromStorage) {
        this.setupFirstRoundPlayers(this.game.players);
        this.createNewRound(this.splitPlayers, [], ROUND_TYPE.NORMAL, 1);
      } else {
        const players = this.rounds[this.currentRound].players;

        if (players) {
          this.splitPlayers = players;
        }

        this.createNewRound(this.splitPlayers, [], ROUND_TYPE.NORMAL, 1, false);
      }
    }
  }

  moveToNextRound(): void {
    // We are moving on from the init round so we need to generate the winner and loser rounds (first winner then loser)
    if (this.currentRound === 0) {
      // Generate the winner round (single player)
      const players2D: any = this.rounds[this.currentRound].players;
      
      if (!players2D) return;
      

      const players: Player[] = JSON.parse(JSON.stringify([].concat(...players2D))); // de-ref the array so we can reset scores

      // Sort from best to worst
      players.sort((p1: Player, p2: Player) => (p1.score > p2.score ? -1 : 1));

      const halfPoint = Math.ceil(players.length / 2);
      const winners = players.slice(0, halfPoint);
      const losers = players.slice(halfPoint, players.length);

      winners.map(x => x.score = -1);
      losers.map(x => x.score = -1);

      const splitWinners = this.gameService.generateSingleRoundOrder(winners);
      const splitLosers = this.gameService.generateSingleRoundOrder(losers);


      this.createNewRound(splitWinners, [], ROUND_TYPE.WINNNER, 2);
      this.createNewRound(splitLosers, [], ROUND_TYPE.LOSER, 3);

      this.game.round++;
      this.saveGameToStorage();

      return;
    }

    // If we just finished the winner round, then we need to move on to the loser round
    if (this.currentRound === 1) {
      this.game.round++;
      this.saveGameToStorage();

      return;
    }

    // If we just finished the loser round, then do some logic to display winner OR move to the team round
    if (this.currentRound === 2) {
      if (this.game.hasTeams) {
        const winners2D: any = this.rounds[this.currentRound - 1].players;
        const losers2D: any = this.rounds[this.currentRound].players;
        
        if (!winners2D) return;
        if (!losers2D) return;
        

        const winners: Player[] = JSON.parse(JSON.stringify([].concat(...winners2D)));
        const losers: Player[] = JSON.parse(JSON.stringify([].concat(...losers2D)));

        // const players: Player[] = JSON.parse(JSON.stringify(winners.concat(...losers))); // de-ref the array so we can reset scores

        // Sort from best to worst
        winners.sort((p1: Player, p2: Player) => (p1.score > p2.score ? -1 : 1));
        losers.sort((p1: Player, p2: Player) => (p1.score > p2.score ? -1 : 1));
        // players.sort((p1: Player, p2: Player) => (p1.score > p2.score ? -1 : 1));


        const teams = this.gameService.generateTeams(winners, losers);

        const currentRounds: Round[] | null = this.storageService.getValue(SessionStorageKeys.ROUNDS);

        if (!currentRounds) return;

        const saveToStorage: boolean = !currentRounds.some(x => x.type === ROUND_TYPE.TEAM);


        this.createNewRound([], teams, ROUND_TYPE.TEAM, 4, saveToStorage);
      }
      this.game.round++;
      this.saveGameToStorage();

      return;
    }

    // If we finished the team round, it's time to do the USB
    if (this.currentRound === 3) {
      if (this.game.usb) {
        const teams2D: any = this.rounds[this.currentRound].teams;

        const teams: Team[] = JSON.parse(JSON.stringify([].concat(...teams2D)));
        teams.sort((t1: Team, t2: Team) => (t1.score > t2.score ? -1 : 1));

        const finalRoundTeams: Team[][] = [];

        const bestTeam = teams[0];
        const worstTeam = teams[teams.length - 1];

        bestTeam.score = -1;
        worstTeam.score = -1;

        finalRoundTeams.push([bestTeam, worstTeam]);

        const currentRounds: Round[] | null = this.storageService.getValue(SessionStorageKeys.ROUNDS);

        if (!currentRounds) return;

        const saveToStorage: boolean = !currentRounds.some(x => x.type === ROUND_TYPE.USB);

        this.createNewRound([], finalRoundTeams, ROUND_TYPE.USB, 5, saveToStorage);
      }

      this.game.round++;
      this.saveGameToStorage();

      return;
    }

    if (this.currentRound === 4) {
      this.game.round++;
      this.saveGameToStorage();

      return;
    }
  }

  private createNewRound(players: Player[][], teams: Team[][], type: ROUND_TYPE, roundNumber: number, addToStorage = true): void {
    const rounds: Round[] | null = this.storageService.getValue<Round[]>(SessionStorageKeys.ROUNDS);

    // Don't want the user making 1000000 rounds
    if (rounds) {
      if (rounds[roundNumber]) {
        return;
      }
    }

    const round: Round = RoundFactory.CreateRound(type, roundNumber, players, teams);

    this.rounds.push(round);

    if (addToStorage) {
      this.storageService.setValue(SessionStorageKeys.ROUNDS, this.rounds);
    }
  }

  private setupFirstRoundPlayers(players: Player[]): void {
    this.splitPlayers = this.gameService.generateSingleRoundOrder(players);
  }

  private saveGameToStorage(): void {
    this.storageService.setValue<Game>(SessionStorageKeys.GAME, this.game);
  }

  get currentRound(): number {
    return this.game.round - 1;
  }

  get roundTitle(): string {
    return Constants.roundTitles[this.currentRound];
  }
}
