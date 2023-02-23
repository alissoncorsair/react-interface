import { useState, useEffect, useCallback } from "react";
import { functions, inputTypes, listV2 } from "../data/inputGroups";
import listaFuncoes from "../data/lista-funcoes.json";

import Select from "./Select";

const InputGroup = ({
  id,
  handleRemoveItems = () => {},
  data,
  setData = () => {},
}) => {
  const componentId = id;

  const [selectedInput, setSelectedInput] = useState("file1.csv");
  const [selectedColumn, setSelectedColumn] = useState("f01");
  const [selectedFunction, setFunction] = useState("somar");
  const [literalValue, setLiteralValue] = useState("");
  const [availableColumns, setAvailableColumns] = useState([]);
  const [sanitizedAvailableColumns, setSanitizedAvailableColumns] = useState(
    []
  );
  const [currentSupportedDataTypes, setCurrentSupportedDataTypes] = useState([
    "DATE",
    "DATE_TIME",
    "DOUBLE",
    "EMAIL",
    "GEO_POINT",
    "GEO_POLYGON",
    "HASH",
    "IP",
    "LONG",
    "PHONE",
    "STRING",
    "URL",
  ]);

  const [selectedParamType, setSelectedParamType] = useState("");
  const [paramType, setParamType] = useState([]);
  const [lastInput, setLastInput] = useState([]);

  const handleChangeParamType = useCallback((event) => {
    const functionName = event?.currentTarget?.value;

    const params = listaFuncoes.data?.find(({ name }) => name === functionName);
    setCurrentSupportedDataTypes(
      params.supportedDataTypes.map((column) => column)
    );

    setParamType(
      params.supportedValueTypes.map((column) => ({
        id: column,
        name: column,
      }))
    );
    setFunction(functionName);
  }, []);

  const handleselectedParamType = useCallback((event) => {
    setSelectedParamType(event.currentTarget.value);
  }, []);

  useEffect(() => {
    if (selectedInput && selectedFunction && selectedParamType) {
      if (selectedParamType === "COL") {
        const newInput = {
          id: componentId,
          functionName: selectedFunction,
          param: {
            type: selectedParamType,
            column: {
              columnId: selectedColumn.columnId,
              columnName: selectedColumn.columnName,
              columnType: selectedColumn.columnType,
            },
          },
        };
        setData((prevData) => [
          ...prevData.filter(({ id }) => id !== componentId),
          newInput,
        ]);
      }
      if (selectedParamType === "LIT") {
        const newInput = {
          id: componentId,
          functionName: selectedFunction,
          param: {
            type: selectedParamType,
            literalValue: literalValue ?? "",
          },
        };
        setData((prevData) => [
          ...prevData.filter(({ id }) => id !== componentId),
          newInput,
        ]);
      }
    }
  }, [
    selectedInput,
    selectedFunction,
    selectedParamType,
    selectedColumn,
    literalValue,
    componentId,
    setData,
  ]);

  const handleSelectedInputV2 = useCallback(
    (event) => {
      const input = event?.currentTarget?.value;
      const inputSelected = listV2.find(({ fileName }) => fileName === input);
      setSelectedInput({
        fileName: inputSelected.fileName,
      });
      const filtered = inputSelected.columns.filter((column) => {
        return currentSupportedDataTypes.includes(column.columnType);
      });

      setAvailableColumns(filtered);
    },
    [currentSupportedDataTypes]
  );

  useEffect(() => {
    const sanitizedAvailableColumns = availableColumns
      .map((column) => ({
        id: column.columnId,
        name: column.columnName,
        type: column.columnType,
      }))
      .filter((column) => {
        return currentSupportedDataTypes.includes(column.type);
      });
    setSanitizedAvailableColumns(sanitizedAvailableColumns);
  }, [availableColumns, currentSupportedDataTypes]);

  const handleChangeSelectedColumn = useCallback(
    (event) => {
      const column = event?.currentTarget?.value;
      const columnSelected = availableColumns.find(
        ({ columnName }) => columnName === column
      );
      setSelectedColumn(columnSelected);
    },
    [availableColumns]
  );

  useEffect(() => {
    const { supportedValueTypes } = listaFuncoes.data[0];
    const paramsType = supportedValueTypes.map((type) => ({
      id: type,
      name: type,
    }));

    setParamType(paramsType);

    const defaultSelectedColumn = listV2.find(
      ({ fileName }) => fileName === "file1.csv"
    );
    setAvailableColumns(defaultSelectedColumn.columns);

    const columnSelected = defaultSelectedColumn.columns.find(
      ({ columnName }) => columnName === "f01"
    );
    setSelectedColumn(columnSelected);
  }, []);

  useEffect(() => {
    const funcao = listaFuncoes.data?.find(
      ({ name }) => name === selectedFunction
    );
    const dataType = funcao?.supportedDataTypes.map((column) => ({
      id: column,
      name: column,
    }));
    if (selectedParamType !== "LIT") {
      setSelectedParamType(funcao?.supportedValueTypes?.[0]);
    }
    setLastInput(dataType);
  }, [selectedFunction, selectedParamType]);

  return (
    <div className="w-fit mx-auto grid grid-cols-5 gap-8">
      <Select
        titleProp="Escolha Input"
        data={inputTypes()}
        onChange={handleSelectedInputV2}
      />

      <Select
        titleProp="Escolha uma função"
        data={functions}
        onChange={handleChangeParamType}
      />

      <Select
        disabled={paramType.length === 0}
        titleProp="Escolha tipo de parametro"
        onChange={handleselectedParamType}
        data={paramType}
      />
      {selectedParamType === "LIT" ? (
        <div className="col-span-1 flex flex-col">
          <label className="mb-2 text-lg">Escolha o valor</label>
          <input
            type="text"
            value={literalValue}
            onChange={(event) => setLiteralValue(event.currentTarget.value)}
            className="border rounded-md py-2 px-4 w-48"
          />
        </div>
      ) : (
        <Select
          disabled={lastInput.length === 0}
          titleProp="Escolha coluna"
          data={sanitizedAvailableColumns}
          onChange={handleChangeSelectedColumn}
        />
      )}
      <div className="col-span-1">
        <button onClick={handleRemoveItems} className="col-span-1 mt-6 w-12">
          <span className="text-red-500 border-solid border-2 text-[40px] px-2">
            X
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputGroup;
