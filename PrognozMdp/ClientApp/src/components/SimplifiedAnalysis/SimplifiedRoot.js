import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import SelectSection from './SelectSection';
import EquipmentTable from './EquipmentTable';
import Calculation from './Calculation';
import CalcResult from './CalcResult';

function SimplifiedRoot() {
    return (
        <Fragment>
            <Container>
                <SelectSection />
                <EquipmentTable />
                <Calculation />
                <CalcResult />
            </Container>
        </Fragment>
    );
}

export default SimplifiedRoot;