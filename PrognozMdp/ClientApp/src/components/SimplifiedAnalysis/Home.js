import React, { Fragment, useState } from 'react';
import SelectSection from './SelectSection';
import EquipmentTable from './EquipmentTable';
import Calculation from './Calculation';
import CalcResult from './CalcResult';

function Home() {
    const [eqBitMask, setEqBitMask] = useState("");
    const [section, setSection] = useState("");
    const [sectionId, setSectionId] = useState();
    const [currentFlow, setCurrentFlow] = useState("");
    const [currentFlowWithVals, setCurrentFlowWithVals] = useState(null);
    const [currentDt, setCurrentDt] = useState(new Date());
    const [disabledEq, setDisabledEq] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [clear, setClear] = useState(false);

    function handleChangeEqBitMask(newMask) {
        setEqBitMask(newMask);
    }
    function handleChangeSection(newSect) {
        setSection(newSect);
        setClear(true);
    }
    function handleChangeSectionId(sectId) {
        setSectionId(sectId);
    }
    function handleDisableEq(newEq) {
        setDisabledEq(newEq);
        setClear(true);
    }
    function handleChangeFlow(newFlow) {
        setCurrentFlow(newFlow);
    }
    function handleChangeDt(newDt) {
        setCurrentDt(newDt);
    }
    function handleChangeLoading(loading) {
        setLoading(loading);
    }
    function handleChangeFlowWithVals(newFlow) {
        setCurrentFlowWithVals(newFlow);
        setClear(false);
    }
    return (
        <Fragment>
            <SelectSection 
                onChangeSection={handleChangeSection}
                onChangeSectionId={handleChangeSectionId}
                isLoadingToResult={isLoading} />
            <EquipmentTable 
                sectionId={sectionId ? sectionId : null} 
                isLoadingToResult={isLoading}
                onChangeBitMask={handleChangeEqBitMask}
                onChangeDisabledEq={handleDisableEq} />
            <Calculation 
                sectionId={sectionId ? sectionId : null} 
                bitMask={eqBitMask}  
                onChangeDt={handleChangeDt}
                onChangeFlow={handleChangeFlow}
                onChangeFlowWithVals={handleChangeFlowWithVals}
                onLoading={handleChangeLoading} />
            <CalcResult isClear={clear} flow={currentFlow} flowWithVals={currentFlowWithVals} section={section} dt={currentDt} disEq={disabledEq} />
        </Fragment>
    );
}

export default Home;