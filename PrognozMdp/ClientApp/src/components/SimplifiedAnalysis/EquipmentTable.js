import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import StateButton from './EquipmentStateToggleButton';
import 'react-table-6/react-table.css';
import './EquipmentTable.css';

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