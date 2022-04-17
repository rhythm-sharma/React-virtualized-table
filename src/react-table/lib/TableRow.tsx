import React from "react";

interface TableRowProps {
  children: any;
  style: object;
  onClick: (e: React.SyntheticEvent) => void;
}

type Props = TableRowProps;

const TableRow: React.FC<Props> = (props) => {
  return (
    <tr {...props} className="h-24 border-gray-300 border-b break-all	">
      {props.children}
    </tr>
  );
};

export default React.memo(TableRow);
