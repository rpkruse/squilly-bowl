import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../models/game';
import { Round } from '../../../models/round';
import { StorageService } from '../../../services/storage.service';
import { Constants, ROUND_TYPE, SessionStorageKeys, URL_ROUTES } from '../../../shared/constants';
import { EndgameStats, EndgameTableStats, RoundScoreStats } from '../../../models/endgame-stats';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { Team } from '../../../models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.scss'
})
export class EndGameComponent implements OnInit {
  
  game!: Game;
  rounds: Round[] = [];
  endGameStats!: EndgameStats;
  tableStats: EndgameTableStats[] = [];

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    const gameFromStorage: Game | null = this.storageService.getValue<Game>(SessionStorageKeys.GAME);
    const roundsFromStorage: Round[] | null = this.storageService.getValue<Round[]>(SessionStorageKeys.ROUNDS);

    if (gameFromStorage === null) return;
    if (roundsFromStorage === null) return;

    this.game = gameFromStorage;
    this.rounds = roundsFromStorage;

    this.generateTableStats();
  }

  playAgain(): void {
    this.router.navigate([`${URL_ROUTES.CREATE}`]); 
  }

  getRoundData(stat: EndgameTableStats, index: number): RoundScoreStats {
    return stat.roundScore[index];
  }

  private generateTableStats(): void {
    const stats: EndgameTableStats[] = [];

    // Get all of the players:
    for (let i = 0; i < this.game.players.length; i++) {
      const pStat: EndgameTableStats =  {
        name: this.game.players[i].name,
        roundScore: [],
        totalScore: 0,
        totalScoreWithExtra: null
      };

      stats.push(pStat);
    }

    // Loop through each players stats:
    stats.forEach((playerStat: EndgameTableStats) => {
      // Loop through each round:
      for (let i = 0; i < this.rounds.length; i++) {
        const round: Round = this.rounds[i];
        const isSingleRound = (round.type !== ROUND_TYPE.TEAM && round.type !== ROUND_TYPE.USB);

        if (isSingleRound) {
          let players2D: any = round.players;
          let players: Player[] = JSON.parse(JSON.stringify([].concat(...players2D)));

          const playerIndex: number = players.findIndex(x => x.name === playerStat.name);

          const roundScore: RoundScoreStats = {
            roundType: round.type,
            score: playerIndex >= 0 ? players[playerIndex].score : null,
            secondScore: null
          };

          playerStat.roundScore.push(roundScore);
          playerStat.totalScore += playerIndex >= 0 ? players[playerIndex].score : 0

          continue;
        } 
        else {
          let teams2D: any = round.teams;
          let teams: Team[] = JSON.parse(JSON.stringify([].concat(...teams2D)));
          let secondScore: number | null = null;

          const allPlayerOccurs = teams.filter(x => x.firstPlayer.name === playerStat.name || x.secondPlayer.name === playerStat.name);

          if (allPlayerOccurs.length <= 0) {
            playerStat.roundScore.push({
              roundType: round.type,
              score: null,
              secondScore: null
            });
            continue;
          }

          if (allPlayerOccurs.length > 1) {
            // console.log(`${playerStat.name} has more than one`);
            secondScore = allPlayerOccurs[1].score;
          }

          // don't add dupe stats
          if (playerStat.roundScore.some(x => x.roundType === round.type)) {
            console.log(`${playerStat.name} alreay has a score for ${round.type}`);
            continue;
          }


          const roundScore: RoundScoreStats = {
            roundType: round.type,
            score: allPlayerOccurs[0].score,
            secondScore: secondScore
          };

          playerStat.roundScore.push(roundScore);

          const otherScoreValue = (secondScore !== null) ? secondScore : 0;
          const totalToAdd = allPlayerOccurs[0].score > otherScoreValue ? allPlayerOccurs[0].score : otherScoreValue;
          playerStat.totalScore += totalToAdd;
        }
      }
    });

    this.tableStats = stats;
  }

  private getWorstTeam(): Team | null {
    const round: Round = this.rounds[this.rounds.length - 1];
    const teams2D: any = round.teams;

    if (!teams2D) return null;
      

    const teams: Team[] = JSON.parse(JSON.stringify([].concat(...teams2D))); // de-ref the array so we can reset scores

    // sort from worst to best
    teams.sort((t1: Team, t2: Team) => (t1.score > t2.score ? 1 : -1));

    return teams[0];
  }

  private getWorstPlayer(): Player | null {
    const round: Round = this.rounds[this.rounds.length - 1];
    const players2D: any = round.players;

    if (!players2D) return null;
      

    const players: Player[] = JSON.parse(JSON.stringify([].concat(...players2D))); // de-ref the array so we can reset scores

    // sort from worst to best
    players.sort((p1: Player, p2: Player) => (p1.score > p2.score ? 1 : -1));

    return players[0];
  }

  get squillyBowlChamp(): string {
    if (!this.game || !this.rounds) return '';

    if (this.game.hasTeams || this.game.usb) {
      const worstTeam = this.getWorstTeam();

      return `${worstTeam?.firstPlayer.name}/${worstTeam?.secondPlayer.name}`;
    }

    const worstPlayer = this.getWorstPlayer();

    return `${worstPlayer?.name}`;
  }

  get roundNames(): string[] {
    const roundNames: string[] = [];

    for (let i = 0; i < this.rounds.length; i++) {
      roundNames.push(Constants.roundTitles[i]);
    }

    return roundNames;
  }
}
