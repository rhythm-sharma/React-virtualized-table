# React Virtualized Table

> React component for efficiently rendering large tabular data. Check out the [the demo](https://react-virtualized-table-demo.netlify.app/).

## Usage
```javascript
import {
  ReactTable, TableHeaderColumn
} from "./react-table/lib/index";

export default function App() {
    const data = [
        {
            id: 1,
            firstName: "Celisse"
            lastName: "Oriana"
        },
        {
            id: 2,
            firstName: "Jorry"
            lastName: "Neils"
        }
    ]
    
    const onSelectionChange = (event, selectedRows) => {
        // code goes here 
    };
    
    const onRowClick = (e, row, index) => {
        // code goes here       
    }

    return (
        <ReactTable
            onRowClick={onRowClick}
            showSelectRow={true}
            onSelectionChange={onSelectionChange}
            data={data}
            viewportHeight={640}
        >
            <TableHeaderColumn dataField="id">Sr No.</TableHeaderColumn>
            <TableHeaderColumn dataField="firstName">First Name</TableHeaderColumn>
            <TableHeaderColumn dataField="lastName">Last Name</TableHeaderColumn>
        </ReactTable>
  );
}
```

### Prop Types

#### ReactTable

| Property          | Type                              | Required? | Description |
| :---------------- | :-------------------------------- | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onRowClick | Function | | Callback invoked when a user clicks on a table Row. ({ event: Event, rowData: Object, rowIndex: number  }): void |
| onSelectionChange | Function |  | Callback invoked when a user clicks on CheckBox. ({ event: Event, selectedRow: string[] | string }): void |
| data| Array| ✓ | Table Data that will be rendered in Table |
| showSelectRow| Boolean|| The showSelectRow control to show and hide checkbox  |
| viewportHeight| Number | | Table Height |
| rowHeight| Number | | Row Height |
| amountRowsBuffered| Number | | The amount of Rows that will in the DOM  |

#### TableHeaderColumn

| Property          | Type                              | Required? | Description |
| :---------------- | :-------------------------------- | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataField | string | | The field of data you want to show on column.|
| dataFormat | Function |  | To customize the column. This callback function should return a String or a React Component. In addition, this function taking argument ({ cell : any , row: object }): void |
| width| number|  | Set the column width of column. ex: '150' or '200' |
| tdStyle| Object || Allow you to add your custom style object on TD element  |



