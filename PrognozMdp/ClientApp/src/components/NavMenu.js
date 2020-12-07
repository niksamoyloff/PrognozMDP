import React, { Component } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Navbar, Nav } from 'react-bootstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
      const checkActive = (match, location) => {
          if(!location) return false;
          const {pathname} = location;
          console.log(pathname);
          return pathname === "/" || pathname === "/simplified";
      }

    return (
      <header>
          <Navbar expand="lg" color="dark" fixed="top" dark>
              <Container fluid>
                  <NavbarBrand tag={Link} to="/">Прогноз МДП|АДП</NavbarBrand>
                  <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                  <Collapse isOpen={!this.state.collapsed} navbar>
                      <Nav className="mr-auto" navbar>
                          <NavItem>
                              <NavLink to="/simplified" isActive={checkActive} tag={RRNavLink}>Упрощенный анализ</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/detailed" tag={RRNavLink}>Подробный анализ</NavLink>
                          </NavItem>  
                      </Nav>
                  </Collapse>
              </Container>
          </Navbar>
      </header>
    );
  }
}