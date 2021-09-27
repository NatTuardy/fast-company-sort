import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    console.log("1", item);
    if (selectedSort.path === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      }));
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  const takeIcons = (item) => {
    console.log("item :>> ", item);
    if (selectedSort.path === item) {
      return selectedSort.order === "asc" ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>;
    } else {
      return "";
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => <th key={column} onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined} {...{ role: columns[column].path && "button" }} scope="col">
          {columns[column].name}
          {takeIcons(columns[column].path)}
        </th>)}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};
export default TableHeader;
