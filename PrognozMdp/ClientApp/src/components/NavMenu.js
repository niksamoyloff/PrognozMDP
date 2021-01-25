import React, { useState } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import { DetailedAnalysisMode } from './DetailedAnalysis/DetailedAnalysisMode';
import './NavMenu.css';

export function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);
    const [isDetailed, setIsDetailed] = useState(false);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    const checkActive = (match, location) => {
        if(!location) return false;
        const {pathname} = location;
        if (pathname === "/detailed") {
            setIsDetailed(true);
            return false;
        }
        else if (pathname === "/" || pathname === "/simplified") {
            setIsDetailed(false);
            return true;
        }
        return false;
    }

    return (
        <header>
            <Navbar expand="lg" color="dark" fixed="top" dark>
                <Container fluid>
                    <NavbarBrand tag={Link} to="/">Прогноз МДП|АДП</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink to="/simplified" isActive={checkActive} tag={RRNavLink}>Упрощенный анализ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/detailed" tag={RRNavLink}>Подробный анализ</NavLink>
                            </NavItem> 
                            <NavItem>
                                <DetailedAnalysisMode isDetailed={isDetailed}/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}