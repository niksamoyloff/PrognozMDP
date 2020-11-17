import React, { Fragment, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Form } from 'react-bootstrap';

function DtPicker() {
    const [value, onChange] = useState(new Date());
    const [checked, setChecked] = useState(true);

    return (
        <Fragment>
                <Form>
                    <Form.Check 
                        id="currentTimeCheckbox"
                        type="checkbox"
                        checked={checked}
                        label={<b>Текущее время</b>}
                        onChange={() => setChecked(!checked)}
                    />
                    {
                        !checked ?
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                                format="dd.MM.yyyy HH:mm:ss"
                                disableClock={true}
                            /> :
                            null
                    }
                </Form>
        </Fragment>
        
    );
}

export default DtPicker;