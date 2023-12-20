import { ROUND_TYPE } from "../shared/constants";
import { Player } from "./player";
import { Team } from "./team";

export interface Round {
  players: Player[][];
  teams: Team[][];
  type: ROUND_TYPE,
  roundNumber: number;
}

export class RoundFactory {
  public static CreateRound(type: ROUND_TYPE, roundNumber: number, players: Player[][] = [], teams: Team[][] = []): Round {
    return {
      players: players,
      teams: teams,
      type: type,
      roundNumber: roundNumber
    };
  }
}