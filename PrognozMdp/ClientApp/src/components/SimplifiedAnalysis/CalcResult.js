import React, { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment'

function CalcResult() {
    const { loading, flowName, flowWithValues, section, disabledEq, isCurrentDt, dt } = useSelector(
        state => ({
            loading: state.simplifiedResultReducer.loading,
            flowName: state.simplifiedResultReducer.flowName === "mdp" ? "МДП" : "АДП",
            flowWithValues: state.simplifiedResultReducer.flowWithValues,
            section: state.simplifiedResultReducer.section,
            disabledEq: state.simplifiedResultReducer.disabledEq,
            isCurrentDt: state.simplifiedResultReducer.isCurrentDt,
            dt: state.simplifiedResultReducer.dt
        }),
        (prev, next) => prev.loading === next.loading
    );

    return (
        <Fragment>
            {
                loading ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="md"
                        role="status"
                        aria-hidden="true"
                    />
                :
                flowWithValues !== undefined && flowWithValues !== null
                    ? flowWithValues.flowCalcValue !== null
                    ? <div className="result-calc">    
                                <b>{flowName}</b>&nbsp;в&nbsp;КС&nbsp;<b>{section.label}</b>&nbsp;для схемы&nbsp;<b>
                                    [</b><em>{disabledEq !== "" ? disabledEq : "Нормальная схема"}</em><b>]</b>&nbsp;на&nbsp;момент&nbsp;<b>
                                    {
                                        moment(isCurrentDt ? new Date() : dt).format("HH:mm:ss DD.MM.yyyy")
                                    }
                                </b>
                                &nbsp;составляет&nbsp;
                                <b style={{ color: flowWithValues.flowCurrentValue > flowWithValues.flowCalcValue ? "red" : "" }}>
                                    {flowWithValues.flowCalcValue.toFixed(2)}
                                </b>&nbsp;МВт.
                      </div>
                    : <div>
                        <span>
                            <b>Ремонт неинструктивный.</b>
                        </span>
                      </div>
                    : ""
            }
        </Fragment>
    );
}

export default CalcResult;

//flowWithValues.flowCalcValue < flowWithValues.flowCurrentValue ? { color: 'red' } : ""