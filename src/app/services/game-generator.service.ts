import { Injectable } from '@angular/core';
import { NewPlayer } from '../models/new-player';
import { Game } from '../models/game';
import { Player, PlayerFactory } from '../models/player';
import { Team, TeamFactory } from '../models/team';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class GameGeneratorService {
  public generateGame(newPlayers: NewPlayer[], gameSetup: Game): Game {
    const players: Player[] = this.createAllPlayers(newPlayers);

    /*
      Round 1: Everyone plays
      Round 2: Winners
      Round 3: Losers
      Round 4: Teams *
      Round 5: Best Team v Worst Team *
      * = optional round

      => at min we will always have 3 rounds
    */
    let roundCount: number = 3;

    if (gameSetup.hasTeams) roundCount++;
    if (gameSetup.usb) roundCount++;

    gameSetup.players = players;

    return gameSetup;
  }

  public generateSingleRoundOrder(players: Player[]): Player[][] {
    let rp: Player[][] = [];

    // If we have <= players than the max group size, then we know that we will only have one group
    if (Constants.maxPlayersPerRound >= players.length) {
      rp.push(players);

      return rp;
    }

    const numChunks = Math.ceil(players.length / Constants.maxPlayersPerRound);

    const t = Array.from(
      { length: numChunks},
      (_, i) => players.slice(i * players.length / numChunks, (i + 1) * players.length / numChunks));

    rp = t;

    return rp;
  }

  public generateTeams(winners: Player[], losers: Player[]): Team[][] {
    let teams: Team[][] = [];

    const extraAmount: number = winners.length - losers.length;

    const extraPersonList: Player[] = [];
    const loserLength: number = losers.length - 1;

    // worst person is last so we need to add them to the list ___ times
    for (let i = 0; i < extraAmount; i++) {
      const randomIndex = this.getRandomNumber(0, loserLength);
      const randomPerson = JSON.parse(JSON.stringify(losers[randomIndex]));

      randomPerson.score = losers[loserLength].score + 1;
      extraPersonList.push(randomPerson);
    }

    losers = losers.concat(extraPersonList);

    // sort the loser from worst to first now
    losers.sort((p1: Player, p2: Player) => (p1.score > p2.score ? 1 : -1));

    const tt: Team[] = [];
    for (let i = 0; i < winners.length; i++) {
      tt.push(TeamFactory.CreateTeam(winners[i], losers[i]));
    }

    const numChunks = Math.ceil(tt.length / Constants.maxPlayersPerRound);
    const t = Array.from(
      { length: numChunks},
      (_, i) => tt.slice(i * tt.length / numChunks, (i + 1) * tt.length / numChunks));

    teams = t;

    return teams;
  }

  private createAllPlayers(newPlayers: NewPlayer[]): Player[] {
    const players: Player[] = [];
    
    newPlayers.forEach((newPlayer: NewPlayer) => {
      players.push(PlayerFactory.CreatePlayer(newPlayer.id, newPlayer.name))
    });

    return players;
  }

  // Inclusive rolls
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}