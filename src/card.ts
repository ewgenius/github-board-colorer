export interface Card {
  id: string;
  element: Element;
  color: string;
}

export type CardsDictionary = { [id: string]: Card };
