import React, { Fragment, useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setDatetime } from '../../store/actions/simplified/result';

function DtPicker() {
    const [value, onChange] = useState(new Date());
    const [checked, setChecked] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDatetime(value, checked));
    }, [checked, dispatch]);

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
                        }}
                    />
                    {
                        !checked ?
                            <DateTimePicker
                                onChange={(val) => {
                                    onChange(val);
                                    dispatch(setDatetime(val, checked));
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