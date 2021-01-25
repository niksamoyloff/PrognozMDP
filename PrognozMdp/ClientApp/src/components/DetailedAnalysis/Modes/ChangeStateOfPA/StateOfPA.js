import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowMode } from '../../../../store/actions/detailed/common'
import { GridOfPA } from './GridOfPA';

export function StateOfPA() {
    const dispatch = useDispatch();
    const modeId = "1";
    const { curModeId, show, hasError } = useSelector(
        state => ({
            curModeId: state.detailedShowModeReducer.curModeId,
            show: state.detailedShowModeReducer.show,
            hasError: state.detailedShowModeReducer.error !== null ? true : false
        })
    );

    const handleClose = () => dispatch(toggleShowMode(curModeId, false));

    return (
        <Fragment>
            <Modal
                show={curModeId === modeId ? show : false}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GridOfPA />
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
