import React, { useState, useEffect, useMemo } from 'react';
//import { useTable, usePagination } from 'react-table';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import BTable from 'react-bootstrap/Table';
import axios from 'axios';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import './EquipmentTable.css'
import StateButton from './EquipmentStateToggleButton';

//function Table({ columns, data }) {
//    const {
//        getTableProps,
//        getTableBodyProps,
//        headerGroups,
//        rows,
//        prepareRow,
//    } = useTable(
//        {
//            columns,
//            data,
//            initialState: { pageSize: 15 }
//        }, 
//        usePagination
//    );

//    // Render the UI for your table
//    return (
//        <BTable striped bordered hover size="sm" {...getTableProps()}>
//          <thead>
//            {headerGroups.map(headerGroup => (
//                <tr {...headerGroup.getHeaderGroupProps()}>
//                {headerGroup.headers.map(column => (
//                    <th {...column.getHeaderProps()}>
//                    {column.render('Header')}
//                  </th>
//                ))}
//              </tr>
//            ))}
//          </thead>
//          <tbody {...getTableBodyProps()}>
//            {rows.map((row, i) => {
//                prepareRow(row);
//                return (
//                    <tr {...row.getRowProps()}>
//                  {row.cells.map(cell => {
//                      return (
//                          <td {...cell.getCellProps()}>
//                        {cell.render('Cell')}
//                      </td>
//                      );
//                  })}
//                </tr>
//                );
//            })}
//          </tbody>
//        </BTable>
//    );
//}

function EquipmentTable(props) {
    const [equipment, setEquipment] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEquipment = async () => {
            setIsLoading(true);
            const result = await axios.get(
                'SimplifiedAnalysis/GetEquipmentBySection',
                {
                    params: {
                        sectionId: props.sectionId
                    }
                }
            );
            setEquipment(result.data);
            setIsLoading(false);
        };
        if (props.sectionId !== null && props.sectionId !== "")
            fetchEquipment();
    }, [props]);

    const columns = useMemo(
        () => [
            {
                Header: () => <b>Тип</b>,
                accessor: 'typeEq',
                minWidth: 100,
                width: 100
            },
            {
                Header: () => <b>Название оборудования</b>,
                accessor: 'nameEq'
            },
            {
                Header: () => <b>ТС</b>,
                accessor: 'tsId',
                minWidth: 70,
                width: 70
            },
            {
                Header: () => <b>Состояние</b>,
                minWidth: 100,
                width: 100,
                Cell: () => <StateButton/>
            }
            ],
        []
    );

    return (
        <div>
            <ReactTable 
                columns={columns} 
                data={equipment} 
                loading={isLoading}
                defaultPageSize={20}
                previousText="Предыдущая"
                nextText="Следующая"
                loadingText="Поиск оборудования..."
                noDataText={equipment.length === 0 ? "Оборудование не найдено." : ""}
                pageText="Страница"
                ofText="из"
                rowsText="строк"
                pageSizeOptions={[10, 15, 20, 25, 50]}
            />
        </div>
    );
}

export default EquipmentTable;