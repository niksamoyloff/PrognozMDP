import React, { Component } from 'react';
//import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    return (
      <header>
          <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="#home">Прогноз МДП|АДП</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href="#home">Упрощенный анализ</Nav.Link>
                      <Nav.Link href="#link">Подробный анализ</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      </header>
    );
  }
}

//<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//    <Container>
//        <NavbarBrand tag={Link} to="/">Прогноз МДП</NavbarBrand>
//        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//    </Container>
//</Navbar>

//<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//    <ul className="navbar-nav flex-grow">
//        <NavItem>
//            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
//        </NavItem>
//        <NavItem>
//            <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
//        </NavItem>
//        <NavItem>
//            <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
//        </NavItem>
//    </ul>
//</Collapse>