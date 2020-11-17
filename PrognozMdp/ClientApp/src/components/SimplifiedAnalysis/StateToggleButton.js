import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

function StateToggleButton(props) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState(props.defaultState ? "1" : "0");

    return (
        <ButtonGroup toggle>
        {
            props.radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant={ radio.value === "1" ? props.variants[0] : props.variants[1] }
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                         setRadioValue(e.currentTarget.value);
                         if (props.hasOwnProperty('onChangeState')) {
                             props.onChangeState();
                         }
                    }}
                    size={props.size}
                >
                    {radio.name}
                </ToggleButton>
            )
        )}
        </ButtonGroup>
    );
}

export default StateToggleButton;