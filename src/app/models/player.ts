export interface Player {
  id: number;
  name: string;
  score: number;
}

export class PlayerFactory {
  public static CreatePlayer(id: number, name: string, score: number = -1): Player {
    return {
      id: id,
      name: name,
      score: score
    };
  }
}