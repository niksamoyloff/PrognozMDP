import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import schemeUrl from './scheme/scheme.svg'
import { Container, Spinner } from 'react-bootstrap';
import * as d3 from 'd3';
import $ from 'jquery';
import { fetchNetItemNameById, removeFromSelectedItems } from '../../store/actions/detailed/networkTopology';
import store from '../../store/store';
import { NetworkItemsAccordion } from './Modes/ChangeNetworkTopology/NetworkItemsAccordion';

const SchemeLoader = () => {
    return (
        <Container fluid className="h-100">
            <div className="row h-100 justify-content-center align-items-center" style={{marginTop: 200}}>
                <span>Загрузка схемы&nbsp;</span>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />    
            </div>
        </Container>
    );
}

export function RepairScheme() {
    const [firstUpdate, setFirstUpdate] = useState(true);
    const dispatch = useDispatch();
    const { loading, selectedNetItems, hasError } = useSelector(
        state => ({
            loading: state.detailedNetworkTopologyReducer.loading,
            selectedNetItems: state.detailedNetworkTopologyReducer.selectedNetItems,
            hasError: state.detailedNetworkTopologyReducer.error !== null ? true : false
        })
        //(prev, next) => prev.loading === next.loading
    );

    useEffect(() => {
        if (firstUpdate) {
            $("#schemeSvg").load(schemeUrl);
            setFirstUpdate(false);
        }
    }, [loading, firstUpdate, selectedNetItems]);

    function handleGetElementDataById(target, id) {
        dispatch(fetchNetItemNameById(id)).then(() => {
            if (!store.getState().detailedNetworkTopologyReducer.selectedNetItems.some(item => item.id === id)) // ???
                handleShowPopover(target);
            else
                target.attr("class", "clicked");
        });
    }

    function handleRemoveFromSelectedItems(id) {
        dispatch(removeFromSelectedItems(id));
    }

    function handleMouseMove(evt) {
        handleZoom();
        handleGetElementByClick(evt);
    }

    function handleZoom() {
        const svg = d3.select("svg");
        const scheme = svg.select("#layer1");
        svg.call(d3.zoom()
            .scaleExtent([0, 4])
            .on("zoom", function({ transform }) {
                scheme.attr("transform", transform);
            })
        );
    }

    function handleShowPopover(target) {
        target.popover({
            trigger: 'focus',
            placement: 'top',
            title: 'Ошибка!',
            content: 'Нет данных о сетевом оборудовании.',
            delay:
            {
                "show": 500,
                "hide": 100
            }
        }).popover("show");

        target.on('shown.bs.popover', function () {
            setTimeout(function() {
                $('.popover').popover('hide'); 
            },1500);
        });
    }

    function handleGetElementByClick(evt) {
        const target = $(evt.target);
        const id = target.attr("id");
        if (typeof id !== typeof undefined && id !== false) {
            if (id.indexOf("path") !== -1) {
                target.css("cursor", "pointer");
                target.off().click(function() {
                    if (!target.hasClass("clicked")) {
                        handleGetElementDataById(target, id);
                    } else {
                        target.attr("class", "");
                        handleRemoveFromSelectedItems(id);
                    }
                });
            }
        }
    }

    return (
        <Fragment>
            <div id="schemeSvg" onMouseMove={handleMouseMove}></div>
            {
                selectedNetItems.length > 0 ? <NetworkItemsAccordion /> : ""
            }
        </Fragment>
    );
}
//<object 
//    id="svgScheme"
//    type="image/svg+xml" 
//    data={scheme}
//    onClick={() => alert("object")}
///>