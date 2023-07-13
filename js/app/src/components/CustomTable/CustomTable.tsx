import React from 'react';
import Table from "@mui/joy/Table";
import { Statistics } from "../../types/types.ts";
import './CustomTable.css';

interface TableProps {
  results: Array<Statistics>
}

const CustomTable: React.FC<TableProps> = (props) => {
  const { results } = props;

  return (
    <div className="table-wrapper">
      <Table
        size="sm"
        variant="plain"
        color="secondary"
        borderAxis="xBetween"
      >
        <thead>
          <tr>
            <th>Number</th>
            <th>Probability</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.prediction}>
              <td>{result.prediction}</td>
              <td>{result.probability.toFixed(10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
