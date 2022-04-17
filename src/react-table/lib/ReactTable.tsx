import React, { useState, useRef, useEffect } from "react";
import TableRow from "./TableRow";
import TableRowCellWrapper from "./TableRowCellWrapper";
import TableHeaderColumn from "./TableHeaderColumn";
import TableRowCell from "./TableRowCell";

interface ReactTableProps {
  data?: any[];
  children: any;
  showSelectRow: boolean;
  viewportHeight?: number;
  rowHeight?: number;
  amountRowsBuffered?: number;
}

type Props = ReactTableProps;

const ReactTable: React.FC<Props> = (props) => {
  const { data = [], children, showSelectRow } = props;
  const didMount = useRef(false);

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [newData, setNewData] = useState<any>([]);
  const [widths, setWidths] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<string[] | string>([]);
  let trRef = useRef<any>(null);

  const viewportHeight = props.viewportHeight ? props.viewportHeight : 544;
  const rowHeight = props.rowHeight ? props.rowHeight : 96;
  const amountRowsBuffered = props.amountRowsBuffered
    ? props.amountRowsBuffered
    : 40;
  const amountRows = data.length;

  useEffect(() => {
    let indexStart = 0;
    let indexEnd = amountRowsBuffered;

    if (didMount.current) {
      indexStart = Math.max(
        Math.floor(scrollTop / rowHeight) - amountRowsBuffered,
        0
      );

      indexEnd = Math.min(
        Math.ceil((scrollTop + viewportHeight) / rowHeight - 1) +
          amountRowsBuffered,
        amountRows - 1
      );
    } else {
      didMount.current = true;
    }

    setNewData(data.slice(indexStart, indexEnd + 1));
  }, [
    scrollTop,
    data,
    amountRows,
    amountRowsBuffered,
    rowHeight,
    viewportHeight,
  ]);

  const update = (e: any) => {
    setScrollTop(e.target.scrollTop);
  };

  const handleSelectedAllRows = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const handleSelectedRows = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedRow: string[] | string
  ) => {};

  const handleOnRowClick = (event: any, row: any, index: any) => {};

  return (
    <div className="mx-auto container bg-white shadow rounded mt-20">
      <div
        className="w-full overflow-x-scroll xl:overflow-x-hidden"
        onScroll={update}
        style={{ height: viewportHeight }}
      >
        <table className="min-w-full bg-white" style={{ tableLayout: "fixed" }}>
          <thead
            style={{
              position: "sticky",
              top: "0px",
              zIndex: 999,
            }}
          >
            <tr
              className="w-full flex flex-row h-16 border-gray-300 border-b py-8 bg-white"
              ref={trRef}
            >
              {showSelectRow && (
                <TableHeaderColumn width={100}>
                  <input
                    type="checkbox"
                    className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white outline-none"
                    onChange={(e) => handleSelectedAllRows(e)}
                  />
                </TableHeaderColumn>
              )}
              {props.children}
            </tr>
          </thead>
          <tbody
            style={{ height: amountRows * rowHeight, position: "relative" }}
          >
            {newData &&
              newData.map((row: any, index: number) => (
                <TableRow
                  onClick={(e) => handleOnRowClick(e, row, row.id)}
                  key={row && row.id ? row.id : index}
                  style={{
                    top: (row.id - 1) * rowHeight,
                    position: "absolute",
                  }}
                >
                  <>
                    {showSelectRow && (
                      <TableRowCell
                        key={`${row.id}-${0}`}
                        width={100}
                        className="text-sm pl-6 pr-6 text-gray-800 tracking-normal leading-4"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedRows === "All"
                              ? true
                              : selectedRows.includes(row.id)
                          }
                          className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white outline-none"
                          onChange={(e) => handleSelectedRows(e, row.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableRowCell>
                    )}
                    <TableRowCellWrapper
                      showSelectRow={showSelectRow}
                      widths={widths}
                      childProps={props.children}
                      rowChildren={children}
                      row={row}
                      keyId={row && row.id ? row.id : index}
                    />
                  </>
                </TableRow>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReactTable;
