import React, { Fragment, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Form } from 'react-bootstrap';

function DtPicker(props) {
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
                        onChange={() => {
                            setChecked(!checked);
                            props.onChangeDt(new Date());
                        }}
                    />
                    {
                        !checked ?
                            <DateTimePicker
                                onChange={(val) => {
                                    onChange(val);
                                    props.onChangeDt(val);
                                }}
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