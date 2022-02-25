import React from 'react';
import {
  useTable,
  HeaderGroup,
  Row,
  Column,
  Cell,
} from 'react-table';
import { Table as BootstrapTable } from 'react-bootstrap';

interface TableProps<T extends object> {
  columns: ReadonlyArray<Column<T>>;
  data: T[];
  updateMyData?: any;
  skipPageReset?: boolean | undefined;
  tableProps?: any;
  // table?: React.FC;
  // thead?: React.FC;
  // tbody?: React.FC;
  // tr?: React.FC;
  // th?: React.FC;
  // td?: React.FC;
}
 
export default function Table<T extends object>({
  columns,
  data,
  updateMyData,
  skipPageReset = false,
  tableProps = {},
  // table = table,
  // thead = thead,
  // tbody = tbody,
  // tr = tr,
  // th = th,
  // td = td,
}: TableProps<T>) {
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({
   columns,
   data,
 });
 
 return (
   <BootstrapTable {...tableProps} {...getTableProps()}>
     <thead>
       {headerGroups.map((headerGroup: HeaderGroup<T>, i) => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>
               {column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {rows.map((row: Row<T>, i) => {
         prepareRow(row)
         return (
           <tr {...row.getRowProps()}>
             {row.cells.map((cell: Cell<T>) => (
               <td>{cell.render('Cell')}</td>
             ))}
           </tr>
         )
       })}
     </tbody>
   </BootstrapTable>
 );
}
