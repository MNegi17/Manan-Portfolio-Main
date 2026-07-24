"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type CursorType = "default" | "pointer" | "project" | "magnetic" | "text";

interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  cursorText: "",
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorText, setCursorText] = useState<string>("");

  const setCursor = (type: CursorType, text: string = "") => {
    setCursorType(type);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorType("default");
    setCursorText("");
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
