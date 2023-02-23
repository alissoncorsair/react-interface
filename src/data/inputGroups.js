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

export const listV2 = inputs.inputList.map((input) => {
  return {
    fileName: input.fileName,
    columns: input.columns.map((colObj) => {
      return {
        columnId: colObj.columnId,
        columnName: colObj.columnName,
        columnType: colObj.columnType,
      };
    }),
  };
});

export const inputTypes = () =>
  listV2.map((input) => {
    return {
      id: input.fileName,
      name: input.fileName,
    };
  });

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
