import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowMode } from '../../store/actions/detailed/common'

export function DetailedAnalysisMode(props) {
    const dispatch = useDispatch();
    const [currentMode, setCurrentMode] = useState({});

    const detailedAnalysisModes = [
        { id: 0, name: "Изменение топологии сети" },
        { id: 1, name: "Изменение эксплуатационного состояния ПА" },
        { id: 2, name: "Изменение объема УВ" }
    ];

    useEffect(() => {
        setCurrentMode(detailedAnalysisModes[0]);
    }, [props.isDetailed]);

    function handleSelectMode(modeId) {
        setCurrentMode(detailedAnalysisModes[modeId]);
        dispatch(toggleShowMode(modeId, true));
    }

    return (
        <DropdownButton
            title="Режим"
            variant="outline-light"
            disabled={!props.isDetailed}
            onSelect={handleSelectMode}
        >
        {
          detailedAnalysisModes.map((mode, i) => (
            <Dropdown.Item key={i} eventKey={i} active={mode.id === currentMode.id ? true : false}>
                {mode.name}
            </Dropdown.Item>
        ))}
        </DropdownButton>
    );
}