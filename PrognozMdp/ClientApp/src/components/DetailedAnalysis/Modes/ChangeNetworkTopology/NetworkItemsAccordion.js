import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import DtPicker from '../../../SimplifiedAnalysis/DtPicker';
import { GridSelectedItems } from './GridNetworkSelectedItems';
import { useSelector, useDispatch } from 'react-redux';
import { showResults, fetchResults } from '../../../../store/actions/detailed/result';



export function NetworkItemsAccordion() {
    const dispatch = useDispatch();
    const { loading, selectedNetItems, hasError } = useSelector(
        state => ({
            loading: state.detailedNetworkTopologyReducer.loading,
            selectedNetItems: state.detailedNetworkTopologyReducer.selectedNetItems,
            hasError: state.detailedNetworkTopologyReducer.error !== null ? true : false
        })
        //(prev, next) => prev.loading === next.loading
    );

    const handleGetResults = () => {
        dispatch(showResults(true));
    }

    return(
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="dark" eventKey="0">
                        Выбрать срез и рассчитать
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div className="select-time">
                            <DtPicker />    
                        </div>
                        <GridSelectedItems />
                        <div className="calc-btn">
                            <Button variant="primary" onClick={handleGetResults}>Расчет</Button>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}