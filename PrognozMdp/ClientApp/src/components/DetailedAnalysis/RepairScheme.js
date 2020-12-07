import React from 'react';
import { ReactSVG } from 'react-svg';
import { render } from 'react-dom';
import scheme from './scheme/scheme.svg'
import { Container, Spinner } from 'react-bootstrap';

function SchemeLoader() {
    return (
        <Container fluid className="h-100">
            <div className="row h-100 justify-content-center align-items-center" style={{marginTop: 200}}>
                <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                />    
            </div>
        </Container>
    );
}

function RepairScheme() {
    return (
        //<ReactSVG 
        //    src={scheme} 
        //    loading={() => <SchemeLoader/>}
        ///>
        <object type="image/svg+xml" data={scheme} />
    );
}
//render(<ReactSVG src="scheme.svg" />, document.getElementsByClassName('container'));
export default RepairScheme;