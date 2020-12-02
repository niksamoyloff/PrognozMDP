import React, { Fragment, useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getDatetime } from '../../store/actions/calculation';

function DtPicker(props) {
    const [value, onChange] = useState(new Date());
    const [checked, setChecked] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDatetime(value, checked));
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
                                    dispatch(getDatetime(val, checked));
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