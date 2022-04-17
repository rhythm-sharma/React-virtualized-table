import React, { useEffect, useState } from "react";
import jsonData from "./50K.json";
import "./App.css";
import { ReactTable, TableHeaderColumn } from "./react-table/lib/index";

function App() {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    setDataLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setDataLoading(false);
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
    <>
      <div className="text-center mt-10">
        <p className="text-3xl">React Virtualized Table Demo</p>
        <button
          onClick={() => setToggle(!toggle)}
          type="button"
          className="mt-10 p-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {toggle
            ? "Load 50 Thousand Row's in Table"
            : "Load API fetched Data in Table"}
        </button>
      </div>

      {toggle && (
        <>
          {dataLoading ? (
            <p className="text-xl mt-10 text-center">Loading Data...</p>
          ) : (
            <ReactTable
              onRowClick={onRowClick}
              showSelectRow={true}
              onSelectionChange={onSelectionChange}
              data={data}
              viewportHeight={640}
            >
              <TableHeaderColumn dataField="id">Sr No.</TableHeaderColumn>
              <TableHeaderColumn dataField="thumbnailUrl" dataFormat={showUrl}>
                URL
              </TableHeaderColumn>
              <TableHeaderColumn dataField="title">Title</TableHeaderColumn>
            </ReactTable>
          )}
        </>
      )}
      {!toggle && (
        <ReactTable
          onRowClick={onRowClick}
          showSelectRow={true}
          onSelectionChange={onSelectionChange}
          data={jsonData}
          viewportHeight={640}
        >
          <TableHeaderColumn dataField="id">Sr No.</TableHeaderColumn>
          <TableHeaderColumn
            dataField="firstname"
            // width={300}
            tdStyle={{
              textAlign: "left",
            }}
          >
            First Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="lastname"
            // width={300}
            tdStyle={{
              textAlign: "left",
            }}
          >
            Last Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="email"
            // width={300}
            tdStyle={{
              textAlign: "left",
            }}
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="email2"
            // width={300}
            tdStyle={{
              textAlign: "left",
            }}
          >
            Email 2
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="profession"
            // width={300}
            tdStyle={{
              textAlign: "left",
            }}
          >
            Profession
          </TableHeaderColumn>
        </ReactTable>
      )}
    </>
  );
}

export default App;
