import { Card, CardsDictionary } from "./card";

export const storageKey = "github-card-colors";

export type UpdateHandler = (
  id: string,
  elemnt: Element,
  color: string,
  persist?: boolean
) => void;

export class CardsObserver {
  private static instance: CardsObserver;
  private observer: MutationObserver;

  constructor(cards: CardsDictionary, onUpdate: UpdateHandler) {
    this.observer = new MutationObserver((mutations) => {
      const storedPalette: { [id: string]: string } = JSON.parse(
        localStorage.getItem(storageKey) || "{}"
      );
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node: Node) => {
            const element = node as Element;
            const id = element.id;
            if (id && id.startsWith("card-")) {
              const color = storedPalette[id] || "#ffffff";
              if (!cards[id]) {
                onUpdate(id, element, color);
              }
            }
          });
        }
      });
    });
  }

  public static observe(cards: CardsDictionary, onUpdate: UpdateHandler) {
    if (!this.instance) {
      this.instance = new CardsObserver(cards, onUpdate);
    }

    const columns = document.querySelectorAll(
      ".project-column > .js-project-column-cards"
    );

    this.instance.observer.disconnect();
    columns.forEach((column) =>
      this.instance.observer.observe(column, {
        childList: true,
        subtree: true,
      })
    );
  }
}
