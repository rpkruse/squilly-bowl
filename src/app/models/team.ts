import { Player } from "./player";

export interface Team {
  firstPlayer: Player;
  secondPlayer: Player;
  score: number;
}

export class TeamFactory {
  public static CreateTeam(p1: Player, p2: Player, score: number = -1): Team {
    return {
      firstPlayer: p1,
      secondPlayer: p2,
      score: score
    }
  }
}