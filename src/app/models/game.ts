import { Player } from "./player";
import { Team } from "./team";

export interface Game {
  players: Player[];
  teams: Team[],
  round: number;
  maxRounds: number;
  hasTeams: boolean;
  usb: boolean; // Ultimate squilly bowl
}

export class GameFactory {
  public static CreateNewGame(): Game {
    return { maxRounds: -1, players: [], round: 1, teams: [], hasTeams: false, usb: false };
  }
}