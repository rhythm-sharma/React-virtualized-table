import React, { useEffect, useState } from "react";
import "./App.css";
import { ReactTable, TableHeaderColumn } from "./react-table/lib/index";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((response) => response.json())
      .then((result) => {
        console.log("result: ", result);
        setData(result);
      })
      .catch(() => {});
  }, []);

  const showUrl = (cell, row) => {
    return (
      <div className="flex items-center">
        <div className="h-8 w-8">
          <img
            src={cell}
            alt=""
            className="h-full w-full rounded-full overflow-hidden shadow"
          />
        </div>
      </div>
    );
  };

  const onSelectionChange = (event, selectedRows) => {
    alert(`selectedRows :-> ${selectedRows} is clicked`);
  };

  const onRowClick = (e, row, index) => {
    console.log("index : ", index);
    console.log("event: ", e);
    console.log("row: ", row);
    alert(`row with index ${index} is clicked`);
  };

  return (
    <ReactTable
      onRowClick={onRowClick}
      showSelectRow={true}
      onSelectionChange={onSelectionChange}
      data={data}
      viewportHeight={640}
    >
      <TableHeaderColumn width={100} dataField="id">
        Sr No.
      </TableHeaderColumn>
      <TableHeaderColumn
        width={100}
        dataField="thumbnailUrl"
        dataFormat={showUrl}
      >
        URL
      </TableHeaderColumn>
      <TableHeaderColumn dataField="title">Title</TableHeaderColumn>
    </ReactTable>
  );
}

export default App;
