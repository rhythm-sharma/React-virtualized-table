import React from "react";

interface TableRowCellProps {
  className: string;
  children: any;
  width: any;
  style?: any;
}

type Props = TableRowCellProps;

const TableRowCell: React.FC<Props> = (props) => {
  const styleProps: any = {
    ...props.style,
    height: "inherit",
  };

  return (
    <td style={styleProps} {...props}>
      {props.children}
    </td>
  );
};

export default React.memo(TableRowCell);
