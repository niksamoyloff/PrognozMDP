import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../store/actions/simplified/sections';
import { fetchEquipment } from '../../store/actions/simplified/equipment';
import { setCurrentSection } from '../../store/actions/simplified/result';
import './SelectSection.css';

function SelectSection() {
    const dispatch = useDispatch();
    const { loading, sections, selectedSection, hasError } = useSelector(
        state => ({
            hasError: state.simplifiedSectionsReducer.error !== null ? true : false,
            sections: state.simplifiedSectionsReducer.sections,
            loading: state.simplifiedSectionsReducer.loading,
            selectedSection: state.simplifiedResultReducer.section
        })
    );

    useEffect(() => {
        const loadSections = async () => {
            await dispatch(fetchSections());
        };
        loadSections();
    }, [dispatch]);

    function handleChangeSelect(sect) {
        dispatch(fetchEquipment(sect.value));
        dispatch(setCurrentSection(sect));
    }

    return (
        <Fragment>
            {
                hasError ? <Error/> : ""
            }
            <Select
                options={sections}
                isLoading={loading}
                value={sections.find(({val}) => val === selectedSection)}
                placeholder="Выберите сечение..."
                noOptionsMessage={() => "Сечения отсутствуют."}
                onChange={handleChangeSelect}
                className="react-select-container" />

        </Fragment>
    );
};

export default SelectSection;