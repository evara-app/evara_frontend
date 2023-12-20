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

function MultiSelect() {
  return (
    <div>
      {data.map((input) => {
        return (
          <div>
            <span>{input.category}</span>
            {input.options.map((option) => {
              return (
                <div className="flex items-center justify-end flex-row-reverse gap-x-2">
                  <label htmlFor={option.value}>{option.label}</label>
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
  );
}

export default MultiSelect;
