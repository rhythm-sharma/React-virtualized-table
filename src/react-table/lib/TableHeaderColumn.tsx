import React from "react";

interface TableHeaderColumnProps {
  dataField?: string;
  dataFormat?: () => any;
  data?: object[];
  children: any;
  width?: number;
  style?: any;
}

type Props = TableHeaderColumnProps;

export const TableHeaderColumn: React.FC<Props> = (props) => {
  const { width, style } = props;

  const styleProps: object = {
    ...style,
    width: width ? width : "",
  };

  return (
    <th
      style={styleProps}
      className={`pl-6 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4 bg-white ${
        width ? "" : "flex-auto"
      }`}
    >
      {props.children}
    </th>
  );
};

export default React.memo(TableHeaderColumn);
