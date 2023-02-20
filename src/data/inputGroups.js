import inputs from "./lista-input.json";
import listaFuncoes from "./lista-funcoes.json";

export const list = inputs.inputList.reduce(
  (prev, current) => [
    ...prev,
    ...current.columns.map((name) => ({
      id: name.columnId,
      name: name.columnName,
    })),
  ],
  []
);

export const functions = listaFuncoes.data.reduce(
  (prev, current) => [
    ...prev,
    {
      id: current.name,
      name: current.name,
    },
  ],
  []
);
