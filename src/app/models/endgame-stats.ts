import { ROUND_TYPE } from "../shared/constants";
import { Player } from "./player";
import { Team } from "./team";

export interface EndgameStats {
  winner: Player;
  loser: Player;
  winningTeam: Team;
  losingTeam: Team;
}

export interface EndgameTableStats {
  name: string;
  roundScore: RoundScoreStats[];
  totalScore: number;
  totalScoreWithExtra: number | null;
}

export interface RoundScoreStats {
  roundType: ROUND_TYPE;
  score: number | null;
  secondScore: number | null;
}