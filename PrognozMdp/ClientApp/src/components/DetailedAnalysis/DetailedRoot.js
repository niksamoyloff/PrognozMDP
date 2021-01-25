import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { RepairScheme } from './RepairScheme';
import { StateOfPA } from './Modes/ChangeStateOfPA/StateOfPA';
import { VolumeOfUV } from './Modes/ChangeVolumeOfUV/VolumeOfUV';
import { ResultByMode } from './Modes/Result/ResultByMode';
import './RepairScheme.css';

function DetailedRoot() {
    return (
        <Fragment>
            <Container fluid className="container-repair-scheme">
                <RepairScheme />
                <StateOfPA />
                <VolumeOfUV />
                <ResultByMode />
            </Container>
        </Fragment>
    );
}

export default DetailedRoot;