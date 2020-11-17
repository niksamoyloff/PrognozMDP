import React, { Fragment, useState } from 'react';
import DtPicker from './DtPicker';
import StateToggleButton from './StateToggleButton';
import CalcButton from './CalcButton';
import './Calculation.css';
import './DtPicker.css';

function Calculation() {
    const states = [
        { name: "МДП", value: "1" },
        { name: "АДП", value: "0" }
    ];
    const variants = ["outline-warning","outline-danger"];

    return (
        <Fragment>
            <div className="calculation">
                <div className="select-flow">
                    <span><b>Вычислить: </b></span>
                    <StateToggleButton
                        key="select-flow"
                        radios={states}
                        variants={variants}
                        defaultState={true} 
                        //onChangeState={}

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
