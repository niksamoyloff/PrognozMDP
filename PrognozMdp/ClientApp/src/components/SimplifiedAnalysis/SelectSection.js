import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function SelectSection(props) {
    const [sections, setSections] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSections = async () => {
            setIsLoading(true);
            const result = await axios(
                'SimplifiedAnalysis/GetSections',
            );
            setSections(result);
            setIsLoading(false);
        };
        fetchSections();
    }, []);

    function handleChangeSelect(e) {
        props.onChangeSectionId(e.value);
    }

    return (
        <Select
            options={sections.data}
            isLoading={isLoading}
            placeholder="Выберите сечение..."
            noOptionsMessage={() => "Сечения отсутствуют."}
            onChange={handleChangeSelect}/>
    );
};

export default SelectSection;