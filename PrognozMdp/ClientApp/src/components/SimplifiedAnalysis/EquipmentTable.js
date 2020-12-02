import React, { Fragment, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import StateToggleButton from './StateToggleButton';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';
import { getBitMask, getDisabledEq } from '../../store/actions/calculation';
import 'react-table-6/react-table.css';
import './EquipmentTable.css';

function EquipmentTable(props) {
    const states = [
        { name: "Вкл", value: "1" },
        { name: "Откл", value: "0" }
    ];
    const variants = ["outline-success","outline-danger"];

    const dispatch = useDispatch();
    const { equipment, loading, hasError } = useSelector(
        state => ({
            hasError: state.equipmentReducer.error !== null ? true : false,
            equipment: state.equipmentReducer.items,
            loading: state.equipmentReducer.loading
        })
    );

    useEffect(() => {
        sendBitMask(equipment);
    }, [loading, dispatch]);

    function handleChangeEquipmentState(row) {
        row.original.isEnabled = !row.original.isEnabled;
        const items = [...equipment];
        const item = {
             ...equipment[row.original.nameEq], 
             isEnabled: row.original.isEnabled
        };
        items[row.original.nameEq] = item;
        sendBitMask(items);
        sendDisabledEq(equipment);
    }

    function sendDisabledEq(items) {
        const disabledEq = items
            .filter((item) => !item.isEnabled)
            .map(item => item.typeEq + " " + item.nameEq)
            .join(", ");
        dispatch(getDisabledEq(disabledEq));
    }
    function sendBitMask(items) {
        const bitMask = items.map((item) => {
            return item.isEnabled ? "1" : "0";
        }).join("");
        dispatch(getBitMask(bitMask));
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
            loading,
            states,
            variants
        ]
    );

    return (
        <div>
            <Fragment>
                { hasError ? <Error/> : "" }
                <ReactTable 
                    columns={columns} 
                    data={equipment} 
                    loading={loading}
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
            </Fragment>
        </div>
    );
}

export default EquipmentTable;