import React, { Fragment } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlowWithValues } from '../../store/actions/simplified/result';
import './CalcButton.css'

function CalcButton() {
    const dispatch = useDispatch();

    const { loading, flowName, section, bitMask, isCurrentDt, dt, hasError } = useSelector(
        state => ({
            loading: state.simplifiedResultReducer.loading,
            flowName: state.simplifiedResultReducer.flowName,
            bitMask: state.simplifiedResultReducer.bitMask,
            isCurrentDt: state.simplifiedResultReducer.isCurrentDt,
            dt: state.simplifiedResultReducer.dt,
            hasError: state.simplifiedResultReducer.error !== null ? true : false,
            section: state.simplifiedSectionsReducer.selectedSection
        })
    );

    const handleClick = () => {
         const fetchFlowValue = async () => {
             await dispatch(fetchFlowWithValues(
                 flowName,
                 section.value,
                 bitMask,
                 isCurrentDt ? new Date() : dt
             ));
         };
         fetchFlowValue();
    }

    return (
        <Fragment>
            { hasError ? <Error/> : "" }
            <Button
                variant="primary"
                disabled={!loading && bitMask ? false : true}
                onClick={!loading ? handleClick : null}
            >
                {
                    loading ?
                    <Fragment>
                        <span>Расчет </span>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Fragment>
                    : 'Расчет'
                }
            </Button>
        </Fragment>
    );
}

export default CalcButton;