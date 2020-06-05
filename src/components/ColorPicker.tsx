import React, { useState, useCallback } from "react";
import { BlockPicker, ColorResult } from "react-color";

import { Card } from "../card";

const container = document.querySelector(".project-columns-container");
const setScroll = (enabled: boolean) => {
  if (container) {
    container.setAttribute(
      "style",
      `overflow-x: ${enabled ? "visible" : "hidden"} !important`
    );
  }
};

export const ColorPicker = ({
  card,
  onChange,
}: {
  card: Card;
  onChange: (id: string, color: string) => void;
}) => {
  const [open, toggle] = useState(false);
  const setPicker = (s: boolean) => {
    setScroll(!s);
    toggle(s);
  };
  const openPicker = () => setPicker(true);
  const closePicker = () => setPicker(false);
  const setCardColor = useCallback(
    (color: ColorResult, e: any) => {
      onChange(card.id, color.hex);
      closePicker();
    },
    [card.id]
  );
  return (
    <>
      <button
        className="gh-colorer-palette"
        style={{ backgroundColor: card.color }}
        onClick={openPicker}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="18px"
          width="18px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
          </g>
        </svg>
      </button>
      {open ? (
        <div className="gh-colorer-picker">
          <div onClick={closePicker} className="gh-colorer-fade" />
          <BlockPicker
            color={card.color}
            onChange={setCardColor}
            colors={[
              "#ffffff",
              "#ffa3a3",
              "#ffdaa3",
              "#f5ffa3",
              "#a4ffa3",
              "#a3ffff",
              "#a3a6ff",
              "#ffa3e7",
            ]}
          />
        </div>
      ) : null}
    </>
  );
};
