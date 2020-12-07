import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import RepairScheme from './RepairScheme';
import './RepairScheme.css';

function DetailedRoot() {
    return (
        <Fragment>
            <Container fluid className="container-repair-scheme">
                <RepairScheme />
            </Container>
        </Fragment>
    );
}

export default DetailedRoot;