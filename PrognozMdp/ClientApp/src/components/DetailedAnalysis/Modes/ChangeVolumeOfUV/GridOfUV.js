import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';

export function GridOfUV() {
    const dispatch = useDispatch();

    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'product', title: 'Product' },
        { name: 'owner', title: 'Owner' },
    ];
    const rows = [
        { id: 0, product: 'UV', owner: 'UV' },
        { id: 1, product: 'UV', owner: 'UV' },
    ];

    return (
        <div className="card">
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <Table />
                    <TableHeaderRow />
                </Grid>
            </div>
    );
}