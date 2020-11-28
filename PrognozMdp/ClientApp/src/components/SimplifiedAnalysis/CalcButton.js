import React, { Fragment, useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './CalcButton.css'

function CalcButton(props) {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const fetchFlowValue = async () => {
                try {
                    await axios.get('SimplifiedAnalysis/CalculateFlowByScheme',
                        {
                            params: {
                                flow: props.flow,
                                sectionId: props.sectId,
                                mask: props.bitMask,
                                dt: props.dt
                            }
                        }).then(response => {
                        const result = response.data;
                        props.onGetFlow(result);
                    });
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                    props.onLoading(false);
                }
            };
            fetchFlowValue();
        }
    }, [isLoading]);

    const handleClick = () => {
         setLoading(true);
         props.onLoading(true);
    }

    return (
        <Fragment>
            <Button
                variant="primary"
                disabled={!isLoading && props.bitMask ? false : true}
                onClick={!isLoading ? handleClick : null}
            >
                {
                    isLoading ?
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