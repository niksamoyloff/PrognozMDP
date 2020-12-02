import React, { Fragment, useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Error from '../Error';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlowWithValues } from '../../store/actions/calculation';
import './CalcButton.css'

function CalcButton(props) {
    const dispatch = useDispatch();
    //const [isLoading, setLoading] = useState(false);
    //const [hasError, setHasError] = useState(false);

    const { loading, flowName, section, bitMask, isCurrentDt, dt, hasError } = useSelector(
        state => ({
            loading: state.calculationReducer.loading,
            flowName: state.calculationReducer.flowName,
            section: state.calculationReducer.section,
            bitMask: state.calculationReducer.bitMask,
            isCurrentDt: state.calculationReducer.isCurrentDt,
            dt: state.calculationReducer.dt,
            hasError: state.calculationReducer.error !== null ? true : false
        })
    );

    //useEffect(() => {
    //    if (loading) {
    //        const fetchFlowValue = async () => {
    //            await dispatch(fetchFlowWithValues(
    //                flowName,
    //                section.value,
    //                bitMask,
    //                isCurrentDt ? new Date() : dt
    //            ));
    //        };
    //        fetchFlowValue();
    //    }
    //}, [dispatch]);

    const handleClick = () => {
         //setLoading(true);
         //props.onLoading(true);
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