import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export function Layout(props) {
    return (
      <div>
        <NavMenu />
        {props.children}
      </div>
    );
}
