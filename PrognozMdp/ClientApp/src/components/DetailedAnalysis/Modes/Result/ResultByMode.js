import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GridUncontrolledSections } from './GridUncontrolledSections';
import { GridControlledSections } from './GridControlledSections';
import { GridSectionsWithNonCalcSchemes } from './GridSectionsWithNonCalcSchemes';
import { GridSectionsWithAlteredFlow } from './GridSectionsWithAlteredFlow';
import { showResults } from '../../../../store/actions/detailed/result';


export function ResultByMode() {
    const dispatch = useDispatch();
    const { show, hasError } = useSelector(
        state => ({
            show: state.detailedResultReducer.show,
            hasError: state.detailedResultReducer.error !== null ? true : false
        })
    );

    const handleClose = () => dispatch(showResults(false));

    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                  <Modal.Title>Перечни сечений</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Перечень сечений, которые снимаются с контроля:
                        <GridUncontrolledSections />
                    </div>
                    <div>
                        Перечень сечений, в которых возникают неинструктивные схемы:
                        <GridSectionsWithNonCalcSchemes />
                    </div>
                    <div>
                        Перечень сечений, которые ставятся на контроль:
                        <GridControlledSections />
                    </div>
                    <div>
                        Перечень сечений, в которых изменяется МДП (АДП):
                        <GridSectionsWithAlteredFlow />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}