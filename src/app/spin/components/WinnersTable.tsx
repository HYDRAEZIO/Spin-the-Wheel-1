import React from "react";

interface Winner {
  code: string;
  prize: string;
}

const WinnersTable = ({ winners }: { winners: Winner[] }) => {
  return (
    <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg mt-6 p-4">
      <h2 className="text-lg font-bold mb-4">Recent Winners</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Code</th>
            <th className="px-4 py-2 border-b">Prize</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
            >
              <td className="px-4 py-2 text-center">{winner.code}</td>
              <td className="px-4 py-2 text-center">{winner.prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinnersTable;