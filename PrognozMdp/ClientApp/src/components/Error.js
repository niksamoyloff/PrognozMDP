import React, { Fragment, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Error() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка</Modal.Title>
                </Modal.Header>
                <Modal.Body>Произошла ошибка при получении данных!<br/>Попробуйте еще раз или обратитесь к администратору.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default Error;