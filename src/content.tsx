import React, { useEffect, useState, useCallback } from "react";
import { render } from "react-dom";

import { Portal } from "./components/Portal";
import { ColorPicker } from "./components/ColorPicker";
import { CardsDictionary } from "./card";
import { CardsObserver, UpdateHandler, storageKey } from "./storage";

const root = document.createElement("div");
document.body.appendChild(root);

const Root = () => {
  const [cards, setCards] = useState<CardsDictionary>({});

  const updateCards: UpdateHandler = (
    id: string,
    element: Element,
    color: string,
    persist?: boolean
  ) =>
    setCards((cards) => {
      const newCards = {
        ...cards,
        [id]: {
          id,
          element,
          color,
        },
      };

      element.setAttribute("style", `background-color: ${color} !important`);

      if (persist) {
        localStorage.setItem(
          storageKey,
          JSON.stringify(
            Object.values(newCards).reduce(
              (d, c) => (c.color === "#ffffff" ? d : { ...d, [c.id]: c.color }),
              {}
            )
          )
        );
      }

      return newCards;
    });

  useEffect(() => CardsObserver.observe(cards, updateCards), [cards]);

  const setCardColor = (id: string, color: string) => {
    const card = cards[id];
    if (card) {
      updateCards(id, card.element, color, true);
    }
  };

  const cardsList = Object.values(cards);

  return (
    <div>
      {cardsList.map((card) => {
        return (
          <Portal key={card.id} element={card.element}>
            <ColorPicker card={card} onChange={setCardColor} />
          </Portal>
        );
      })}
    </div>
  );
};

render(<Root />, root);
