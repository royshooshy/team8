export interface IListItem {
  id: string;
  text?: string;
  image?: string;
  selectedState?: { key: number; value: string };
  states?:  { key: number; value: string }[];
}
