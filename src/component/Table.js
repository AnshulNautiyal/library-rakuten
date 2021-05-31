import React from "react";
import { getKeys } from "../Utils/TableSelectors";

function Table({ tableProps = [] }) {
  let len = tableProps.length;
  const renderTableHeader = () => {
    let tableHeaderName = len > 0 ? getKeys(len > 0 ? tableProps[0] : []) : [];
    return tableHeaderName.map((item) => {
      return <td>{item}</td>;
    });
  };
  const renderTableBody = () => {
    return tableProps.map((item) => {
      return (
        <tr key={item.Id}>
          {getKeys(item).map((key) => {
            return <td key={item[key]}>{item[key]}</td>;
          })}
        </tr>
      );
    });
  };
  return (
    <table className="table">
      <thead className="table__header">{renderTableHeader()}</thead>
      <tbody className="table__body">{renderTableBody()}</tbody>
    </table>
  );
}

export default Table;
