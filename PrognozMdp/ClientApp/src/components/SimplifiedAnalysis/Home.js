import React, { Fragment, useState } from 'react';
import SelectSection from './SelectSection';
import EquipmentTable from './EquipmentTable';
import Calculation from './Calculation';
import CalcResult from './CalcResult';

function SimplifiedAnalysis() {
    return (
        <Fragment>
            <SelectSection />
            <EquipmentTable />
            <Calculation />
            <CalcResult />
        </Fragment>
    );
}

export default SimplifiedAnalysis;