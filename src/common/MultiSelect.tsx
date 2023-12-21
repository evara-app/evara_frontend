import React from "react";

const data = [
  {
    category: "istanbul",
    options: [
      { value: "chocolate", label: "Chocolate", id: 1 },
      { value: "chocolatee", label: "Chocolate", id: 2 },
    ],
  },
  {
    category: "ankara",
    options: [
      { value: "strawberry", label: "Strawberry", id: 3 },
      { value: "strawberryy", label: "Strawberry", id: 4 },
      { value: "strawberryy", label: "Strawberry", id: 5 },
    ],
  },
  {
    category: "adiyaman",
    options: [
      { value: "vanilla", label: "Vanilla", id: 6 },
      { value: "vanillaa", label: "Vanilla", id: 7 },
      { value: "vanillaa", label: "Vanilla", id: 8 },
    ],
  },
];

//? typescript typs
type Props = {
  status: boolean | string;
};

const MultiSelect: React.FunctionComponent<Props> = ({ status }) => {
  return (
    <div className={status ? "block" : "hidden"}>
      <div className="absolute min-w-full top-20 rounded-md border border-gray-default/20 bg-white/40 backdrop-blur-sm p-2 overflow-y-auto overflow-x-hidden">
        {data.map((input) => {
          return (
            <div>
              <span className="text-gray-700 text-xl">{input.category}</span>
              {input.options.map((option) => {
                return (
                  <div className="flex items-center justify-end flex-row-reverse gap-x-1 mx-2">
                    <label
                      className="cursor-pointer text-lg"
                      htmlFor={option.value}
                    >
                      {option.label}
                    </label>
                    <input
                      id={option.value}
                      className="checkBox"
                      value={option.value}
                      type="checkbox"
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
