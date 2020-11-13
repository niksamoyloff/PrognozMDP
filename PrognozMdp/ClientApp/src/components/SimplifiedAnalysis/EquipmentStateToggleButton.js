import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function EquipmentStateToggleButton() {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Вкл', value: '1' },
        { name: 'Откл', value: '0' }
    ];

    return (
        <ButtonGroup toggle>
        {
            radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant= { radio.value === "1" ? "outline-success" : "outline-danger" }
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    size="sm"
                >
                    {radio.name}
                </ToggleButton>
            )
        )}
        </ButtonGroup>
    );
}

export default EquipmentStateToggleButton;