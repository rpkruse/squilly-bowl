export enum URL_ROUTES {
  HOME = 'home',
  RULES = 'rules',
  CREATE = 'create',
  PLAY = 'play',
  DEFAULT = '**',
  EMPTY = ''
};

export enum ROUND_TYPE {
  WINNNER = 'winner',
  LOSER = 'loser',
  NORMAL = 'normal',
  TEAM = 'team',
  USB = 'usb'
}

export enum SessionStorageKeys {
  GAME = 'game',
  ROUNDS ='rounds'
}

export class Constants {
  public static readonly maxPlayersPerRound: number = 4;
  public static readonly roundTitles: string[] = ['Round 1: All Players', 'Round 2: Winners', 'Round 3: Losers', 'Round 4: Teams', 'Round 5: ULTIMATE SQUILLY BOWL'];
}