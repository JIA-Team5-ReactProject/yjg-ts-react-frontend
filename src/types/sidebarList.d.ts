export type PowerListItem = {
  name: string;
  path: string;
};

export type Power = {
  power: string;
  icon?: JSX.Element;
  path: string;
  list: PowerListItem[];
};
