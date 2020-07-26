import React, { Component } from 'react';
const Navigation = React.lazy(() => import('components/Navigation'))
export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
      </React.Fragment>
    )
  }
}