import React from "react";
import TableRowCell from "./TableRowCell";

interface TableRowCellWrapperProps {
  rowChildren: any;
  row: any;
  keyId: number;
  widths: any;
  showSelectRow: boolean;
  childProps: any;
}

type dataFormatType = (cell: any, row: any) => any;

type Props = TableRowCellWrapperProps;

const TableRowCellWrapper: React.FC<Props> = (props) => {
  const { rowChildren, row, keyId, widths, showSelectRow, childProps } = props;

  return (
    <>
      {rowChildren.map((item: any, idx: number) => {
        const dataFormat: dataFormatType = item.props.dataFormat;
        const dataField: string = item.props.dataField;
        const index = showSelectRow ? idx + 1 : idx;
        return (
          <TableRowCell
            key={`${keyId}-${index}`}
            width={widths[index]}
            style={
              childProps &&
              childProps[idx] &&
              childProps[idx].props &&
              childProps[idx].props.tdStyle
            }
            className="text-sm pl-6 pr-6 text-gray-800 tracking-normal leading-4 cursor-pointer"
          >
            {item.props.dataFormat
              ? dataFormat(row[`${dataField}`], row)
              : row[`${dataField}`]}
          </TableRowCell>
        );
      })}
    </>
  );
};

export default React.memo(TableRowCellWrapper);
