﻿import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../store/actions/sections';
import { fetchEquipment } from '../../store/actions/equipment';
import { getCurrentSection } from '../../store/actions/calculation';
import './SelectSection.css';

function SelectSection() {
    const dispatch = useDispatch();
    const { sections, loading, hasError } = useSelector(
        state => ({
            hasError: state.sectionsReducer.error !== null ? true : false,
            sections: state.sectionsReducer.items,
            loading: state.sectionsReducer.loading
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
        dispatch(getCurrentSection(sect));
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
                onChange={handleChangeSelect}
                className="react-select-container" />

        </Fragment>
    );
};

export default SelectSection;