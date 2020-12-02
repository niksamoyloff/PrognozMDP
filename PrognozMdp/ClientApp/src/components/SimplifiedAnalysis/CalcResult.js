import React, { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment'

function CalcResult() {
    const { loading, flowName, flowWithValues, section, disabledEq, isCurrentDt, dt } = useSelector(
        state => ({
            loading: state.calculationReducer.loading,
            flowName: state.calculationReducer.flowName === "mdp" ? "МДП" : "АДП",
            flowWithValues: state.calculationReducer.flowWithValues,
            section: state.calculationReducer.section,
            disabledEq: state.calculationReducer.disabledEq,
            isCurrentDt: state.calculationReducer.isCurrentDt,
            dt: state.calculationReducer.dt
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
                                <b>{flowName}</b> в КС <b>{section.label}</b> для схемы <b>
                                    [</b><em>{disabledEq !== "" ? disabledEq : "Нормальная схема"}</em><b>]</b> на момент <b>
                                    {
                                        moment(isCurrentDt ? new Date() : dt).format("HH:mm:ss DD.MM.yyyy")
                                    }
                                </b> составляет <b style={flowWithValues.flowCalcValue > flowWithValues.flowCurrentValue ? { color: 'red' } : ""}>
                                    {flowWithValues.flowCalcValue.toFixed(2)}
                                </b> МВт.
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