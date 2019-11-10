export type MenuActionObject
  = { type: 'UPDATE_PLAYER_COUNT', count: number }
  | { type: 'CHANGE_USERNAME', username: string };

export type ActionObject = MenuActionObject;
