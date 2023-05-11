import React, { useState, useContext, createContext } from "react";
// Created by Lucas & Brian
// Context que señala casa seleccionada en el buscador, apra hacer highlight a los Marks del mapa

// Lucas nunca quizo agregar la foto por flojo.
export interface CurrentFilter {
  bank_origin: string;
  bank_destiny: string;
  publish_time: string;
}
interface CurrentFilterContext {
  currentFilter: CurrentFilter;
  setCurrentFilter: (
    currentFilter: React.SetStateAction<CurrentFilter>
  ) => void;
}

const defaultFilter = {
  bank_origin: "",
  bank_destiny: "",
  publish_time: "",
};

const searchContext = createContext<CurrentFilterContext>(null);

export function ProvideCurrentFilter({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const context = CurrentFilter();
  return (
    <searchContext.Provider value={context}>{children}</searchContext.Provider>
  );
}

export const useCurrentFilter = (): CurrentFilterContext => {
  return useContext(searchContext);
};

function CurrentFilter() {
  const [currentFilter, setCurrentFilter] =
    useState<CurrentFilter>(defaultFilter);
  return { currentFilter, setCurrentFilter };
}
