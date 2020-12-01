import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../store/actions';

function SelectSection(props) {
    //const [sections, setSections] = useState({});
    //const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sections.items);
    const loading = useSelector(state => state.sections.loading);
    //const { loading } = useSelector(state => state.loading);

    useEffect(() => {
        const loadSections = async () => {
            await dispatch(fetchSections());
            console.log(sections);
        };
        loadSections();
        //dispatch(fetchSections());
    }, [dispatch]);

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
                isLoading={loading}
                placeholder="Выберите сечение..."
                noOptionsMessage={() => "Сечения отсутствуют."}
                onChange={handleChangeSelect}/>

        </Fragment>
    );
};

export default SelectSection;