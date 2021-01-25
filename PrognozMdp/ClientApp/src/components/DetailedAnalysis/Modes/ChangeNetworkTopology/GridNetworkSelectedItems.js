import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
     Grid, 
     Table, 
     TableHeaderRow, 
     TableColumnVisibility,
} from '@devexpress/dx-react-grid-bootstrap4';
import { XIcon } from '@primer/octicons-react';
import { 
    removeFromSelectedItems, 
    removeAllSelectedItems
} from '../../../../store/actions/detailed/networkTopology';
import $ from 'jquery';


export function GridSelectedItems() {
    const dispatch = useDispatch();
    const { selectedNetItems } = useSelector(
        state => ({
            selectedNetItems: state.detailedNetworkTopologyReducer.selectedNetItems
        })
    );
    const [defaultHiddenColumnNames] = useState(['id']);

    const RemoveIcon = (props) => {
        return (
            <a 
                className="btn" 
                title="Снять выделение" 
                style={{color: "red", padding: 0}}
                onClick={() => handleRemoveItem(props.itemId, props.forAll)}
                >
                <XIcon size={24} />
            </a>
            );
    }

    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Сетевое оборудование' },
        { name: 'action', title: <RemoveIcon forAll={true}/> }
    ];

    const [columnWidthExtensions] = useState([
        //{ columnName: 'id', width: 50 },
        { columnName: 'name', width: '80%' },
        { columnName: 'action', width: 'auto', align: "right" }
    ]);


    const Header = ({...props}) => {
        return (
            <Table.Row
                {...props}
                style={{height:'30px'}}
            />
        );
    }

    function handleRemoveItem(id, forAll) {
        if (forAll) {
            dispatch(removeAllSelectedItems());
            selectedNetItems.forEach(item => $(document.getElementById(item.id)).attr("class", ""));
        } else {
            dispatch(removeFromSelectedItems(id));
            $(document.getElementById(id)).attr("class", "");
        }
    }

    const getRowId = row => row.id;

    return (
        <div className="card">
                <Grid
                    rows={
                        selectedNetItems.map(item => ({
                            ...item,
                            action: <RemoveIcon itemId={item.id} forAll={false}/>
                        }))
                    }
                    columns={columns}
                    getRowId={getRowId}
                >
                    <Table columnExtensions={columnWidthExtensions}/>
                    <TableHeaderRow rowComponent={Header} />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                </Grid>
            </div>
    );
}