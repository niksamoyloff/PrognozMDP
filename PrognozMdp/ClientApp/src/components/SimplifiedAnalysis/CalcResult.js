import React, { Fragment, useState } from 'react';
import moment from 'moment'

function CalcResult(props) {
    const [isLoading, setLoading] = useState(props.loading);

    return (
        <Fragment>
            {
                !props.isClear
            ?
                props.flowWithVals !== undefined && props.flowWithVals !== null
                    ? props.flowWithVals.flowCalcValue !== null
                    ? <div className="result-calc">    
                                <b>{props.flow}</b> в КС <b>{props.section}</b> для схемы <b>[</b><em>{props.disEq !== "" ? props.disEq : "Нормальная схема"}</em><b>]</b> на момент <b>{
                                    moment(props.dt).format("HH:mm:ss DD.MM.yyyy")}</b> составляет <b style={
                                 props.flowWithVals.flowCalcValue > props.flowWithVals.flowCurrentValue ? { color: 'red' } : ""}>{props.flowWithVals
                                     .flowCalcValue.toFixed(2)}</b> МВт.
                      </div>
                    : <div>
                            <span><b>Ремонт неинструктивный.</b></span>        
                        </div>
                    : ""
            : ""
            }
        </Fragment>
    );
}

export default CalcResult;