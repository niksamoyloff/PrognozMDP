import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function SelectSection(props) {
    const [sections, setSections] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSections = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('SimplifiedAnalysis/GetSections')
                    .then(response => {
                        const result = response.data;
                        setSections(result);
                    })
                    .catch(() => setSections());
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSections();
    }, []);

    function handleChangeSelect(sect) {
        props.onChangeSectionId(sect.value);
        props.onChangeSection(sect.label);
    }

    return (
        <Select
            options={sections}
            isLoading={isLoading}
            placeholder="Выберите сечение..."
            noOptionsMessage={() => "Сечения отсутствуют."}
            onChange={handleChangeSelect}/>
    );
};

export default SelectSection;

//useEffect(() => {
//    const fetchSections = async () => {
//        setIsLoading(true);
//        const response = await window.fetch('SimplifiedAnalysis/GetSections',{
//            headers: {
//                'Content-Type': 'application/json'
//            }
//        });
//        const result = await response.json();
//        setSections(result);
//        setIsLoading(false);
//        return result;
//    };
//    fetchSections();
//}, []);