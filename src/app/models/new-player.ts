export interface NewPlayer {
  id: number;
  name: string;
  isEditMode: boolean;
}

export class NewPlayerFactory {
  public static CreateNewPlayer(id: number, name: string, isEditMode: boolean = false): NewPlayer {
    return {
      id: id,
      name: name,
      isEditMode: isEditMode
    };
  }
}