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
        style={{
          border: "none",
          backgroundColor: card.color,
          position: "absolute",
          top: 26,
          right: 10,
        }}
        onClick={openPicker}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="#6a737d"
        >
          <path d="M5 5.782V2.5h-.25a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5H11v3.282l3.666 5.76C15.619 13.04 14.543 15 12.767 15H3.233c-1.776 0-2.852-1.96-1.899-3.458L5 5.782zM9.5 2.5h-3V6a.75.75 0 01-.117.403L4.73 9h6.54L9.617 6.403A.75.75 0 019.5 6V2.5zm-6.9 9.847L3.775 10.5h8.45l1.175 1.847a.75.75 0 01-.633 1.153H3.233a.75.75 0 01-.633-1.153z"></path>
        </svg>
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 48,
            zIndex: 1000,
            overflow: "hidden",
            borderRadius: 6,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            cursor: "default",
          }}
        >
          <div
            onClick={closePicker}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          />
          <BlockPicker
            color={card.color}
            onChange={setCardColor}
            colors={["#ffffff", "#8af3b6", "#f3f994", "#f99494", "#94cbf9"]}
          />
        </div>
      ) : null}
    </>
  );
};
