import React from "react";

function CustomTable({ tableHeads }) {
  return (
    <div className="overflow-scroll">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm rounded border-white-two">
        <thead>
          <tr className="text-gray-default bg-white-two/25">
            {tableHeads.map((item) => (
              <th key={item.id} className="table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table__td">1</td>
            <td className="table__td">#824856</td>
            <td className="table__td">website support</td>
            <td className="table__td">
              website 404 error when i want to open website i have problem with
              that please fix that thanks im farhan ahmadi
            </td>
            <td className="table__td">open</td>
            <td className="table__td">1402/12/10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
