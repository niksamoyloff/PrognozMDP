import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import StateToggleButton from './StateToggleButton';
import 'react-table-6/react-table.css';
import './EquipmentTable.css';

function EquipmentTable(props) {
    const [equipment, setEquipment] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const states = [
        { name: "Вкл", value: "1" },
        { name: "Откл", value: "0" }
    ];
    const variants = ["outline-success","outline-danger"];

    useEffect(() => {
        const fetchEquipment = async () => {
            setLoading(true);
            try {
                const response = await axios.get('SimplifiedAnalysis/GetEquipmentBySection',
                    {
                        params: { sectionId: props.sectionId }
                    })
                    .then(response => {
                        const result = response.data;
                        setEquipment(result);
                        sendBitMaskToProps(result);
                    })
                    .catch(() => {
                    setEquipment([]);
                });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (props.sectionId !== null && props.sectionId !== "")
            fetchEquipment();
    }, [props.sectionId]);

    function handleChangeEquipmentState(row) {
        row.original.isEnabled = !row.original.isEnabled;
        const items = [...equipment];
        const item = {
             ...equipment[row.original.nameEq], 
             isEnabled: row.original.isEnabled
        };
        items[row.original.nameEq] = item;
        setEquipment(items);
        sendBitMaskToProps(items);
        sendDisabledEq(equipment);
    }

    function sendDisabledEq(items) {
        props.onChangeDisabledEq(items
            .filter((item) => !item.isEnabled)
            .map(item => item.typeEq + " " + item.nameEq)
            .join(", "));
    }
    function sendBitMaskToProps(items) {
        props.onChangeBitMask(items.map((item) => {
            return item.isEnabled ? "1" : "0";
        }).join(""));
    }

    const columns = useMemo(
        () => [
            {
                Header: () => <b>Тип</b>,
                accessor: 'typeEq',
                minWidth: 100,
                width: 100,
                Footer: () => <b>Всего: {equipment.length}</b>
            },
            {
                Header: () => <b>Название оборудования</b>,
                accessor: 'nameEq',
                style: { 'whiteSpace': 'normal' }
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
                Cell: (row) => <StateToggleButton 
                                    key={row.index + '-state-button'} 
                                    radios={states}
                                    variants={variants}
                                    size="sm"
                                    defaultState={row.original.isEnabled} 
                                    onChangeState={() => handleChangeEquipmentState(row)}/>
            }   
            ],
        [
            equipment.length, 
            states,
            variants
        ]
    );

    return (
        <div>
            <ReactTable 
                columns={columns} 
                data={equipment} 
                loading={isLoading}
                sortable={true}
                showPagination={false}
                pageSize={equipment.length}
                loadingText="Поиск оборудования..."
                noDataText={equipment.length === 0 ? "Оборудование не найдено." : ""}
                //previousText="Предыдущая"
                //nextText="Следующая"
                //pageText="Страница"
                //ofText="из"
                //rowsText="строк"
                //pageSizeOptions={[10, 15, 20, 25, 50]}
            />
        </div>
    );
}

export default EquipmentTable;