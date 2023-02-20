import { useState } from "react";
import InputGroup from "./InputGroup";
import uuid from "uuid-random";

const App = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  const handleAddItems = () => {
    setItems([...items, { key: uuid() }]);
  };

  const handleRemoveItems = (key) => {
    const newItems = items.filter((item) => item.key !== key);
    setItems(newItems);
    setData(data.filter((item) => item.id !== key));
  };

  const handleSaveItems = () => {
    /** PAYLOAD */
    const payload = {
      outputdata: {
        id: uuid(),
        cells: data,
      }
    };

    console.log(payload);
  };

  return (
    <div className="w-full h-full">
      <div className="m-6">
        <div className="flex flex-col gap-4">
          <button
            className="mb-6 px-6 w-56 col-span-2 py-2 rounded bg-sky-400 hover:bg-sky-500 text-sky-100 border-solid border-black border-2"
            onClick={handleAddItems}
          >
            Adicionar itens
          </button>
          {items.length > 0 ? (
            <button
              className="mb-6 px-6 py-2 w-56 col-span-2 rounded bg-red-400 hover:bg-red-500 text-sky-100 border-solid border-black border-2"
              onClick={handleSaveItems}
            >
              Salvar
            </button>
          ) : null}
        </div>
        {items.map((item) => {
          return (
            <InputGroup
              key={item.key}
              id={item.key}
              handleRemoveItems={() => handleRemoveItems(item.key)}
              data={data}
              setData={setData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
