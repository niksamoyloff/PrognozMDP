import React, { Fragment, useState } from 'react';
import SelectSection from './SelectSection';
import EquipmentTable from './EquipmentTable';
import Calculation from './Calculation';

function Home() {
    const [sectionId, setSectionId] = useState("");

    function handleChangeSectionId(newSectionId) {
        setSectionId(newSectionId);
    }

    return (
        <Fragment>
            <SelectSection onChangeSectionId={handleChangeSectionId} />
            <EquipmentTable sectionId={sectionId} />
            <Calculation />
        </Fragment>
    );
}

export default Home;