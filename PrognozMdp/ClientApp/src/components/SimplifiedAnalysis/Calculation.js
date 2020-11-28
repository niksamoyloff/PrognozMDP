import React, { Fragment, useState } from 'react';
import DtPicker from './DtPicker';
import StateToggleButton from './StateToggleButton';
import CalcButton from './CalcButton';
import './Calculation.css';
import './DtPicker.css';

function Calculation(props) {
    const [flow, setFlow] = useState("1");
    const [dt, setDt] = useState(new Date());
    //const [flowWithVals, setFlowWithVals] = useState();
    const [isLoading, setLoading] = useState(false);
    const flows = [
        { name: "МДП", value: "1" },
        { name: "АДП", value: "0" }
    ];
    const variants = ["outline-warning","outline-danger"];

    function handleChangeDt(newDt) {
        setDt(newDt);
    }

    function handleGetFlow(newFlow) {
        if (isLoading) {
            props.onChangeFlowWithVals(newFlow);
        }
    }

    function handleOnLoading(loading) {
        setLoading(loading);
        props.onLoading(loading);
        if (isLoading) {
            props.onChangeDt(dt);
            props.onChangeFlow(flow ? "МДП" : "АДП");
        }
    }

    return (
        <Fragment>
            <div className="calculation">
                <div className="select-flow">
                    <span><b>Вычислить: </b></span>
                    <StateToggleButton
                        key="select-flow"
                        radios={flows}
                        variants={variants}
                        defaultState={true} 
                        onChangeState={() => setFlow(!flow)}
                    />
                </div>
                <div className="select-time">
                    <DtPicker onChangeDt={handleChangeDt}/>
                </div>
                <div className="calc-btn">
                    <CalcButton 
                        flow={flow ? "mdp" : "adp"}
                        dt={dt}
                        sectId={props.sectionId}
                        bitMask={props.bitMask}
                        onGetFlow={handleGetFlow}
                        onLoading={handleOnLoading}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Calculation;
