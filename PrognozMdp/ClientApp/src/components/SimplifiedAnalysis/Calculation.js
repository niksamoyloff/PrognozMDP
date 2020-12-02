import React, { Fragment, useState, useEffect } from 'react';
import DtPicker from './DtPicker';
import StateToggleButton from './StateToggleButton';
import CalcButton from './CalcButton';
import { useDispatch } from 'react-redux';
import { getFlowName } from '../../store/actions/calculation';
import './Calculation.css';
import './DtPicker.css';

function Calculation(props) {
    const dispatch = useDispatch();
    const [flow, setFlow] = useState(true);
    const flows = [
        { name: "МДП", value: "1" },
        { name: "АДП", value: "0" }
    ];
    const flowName = flow ? "mdp" : "adp";
    const variants = ["outline-warning","outline-danger"];


    useEffect(() => {
        dispatch(getFlowName(flowName));
    }, [flow, dispatch]);


    function handleChangeFlow() {
        setFlow(!flow);
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
                        defaultState={flow} 
                        onChangeState={handleChangeFlow}
                    />
                </div>
                <div className="select-time">
                    <DtPicker />
                </div>
                <div className="calc-btn">
                    <CalcButton />
                </div>
            </div>
        </Fragment>
    );
}

export default Calculation;
