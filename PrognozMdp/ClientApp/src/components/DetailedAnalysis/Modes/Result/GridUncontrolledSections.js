import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';

export function GridUncontrolledSections() {
    const dispatch = useDispatch();

    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
    ];
    const rows = [
        { id: 0, product: 'Тест' },
        { id: 1, product: 'Тест' }
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