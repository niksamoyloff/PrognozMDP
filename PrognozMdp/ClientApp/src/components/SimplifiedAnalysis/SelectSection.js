import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import Error from '../Error';
import axios from 'axios';

function SelectSection(props) {
    const [sections, setSections] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchSections = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('SimplifiedAnalysis/GetSections')
                    .then(response => {
                        const result = response.data;
                        setSections(result);
                    });
            } catch (e) {
                setSections();
                setHasError(true);
                console.log(e);
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
        <Fragment>
            {
                hasError ? <Error/> : ""
            }
            <Select
                options={sections}
                isLoading={isLoading}
                placeholder="Выберите сечение..."
                noOptionsMessage={() => "Сечения отсутствуют."}
                onChange={handleChangeSelect}/>

        </Fragment>
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