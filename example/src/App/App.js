import React, { Component } from 'react';
import './App.css';
import withQueryToggler from 'toggle-query';

class App extends Component {
  addToQuery = () => {
    const query = this.props.createQueryValues({
      areas: [['rotterdam', true], ['zierikzee', true]],
      radius: '5',
    });
    this.props.handleQueryValues(query);
  };

  resetSingleValue = () => {
    const q = this.props.createQueryValues({ radius: '' });
    this.props.handleQueryValues(q);
  };

  resetSingleArrayValue = () => {
    const q = this.props.createQueryValues({ areas: [['rotterdam', false]] });
    this.props.handleQueryValues(q);
  }

  render() {
    return (
      <div className="app">
        <button type="button" onClick={this.addToQuery}>
          Add values to url
        </button>
        <button type="button" onClick={this.props.clearQueryValues}>
          Clear all values from url
        </button>
        <button type={'button'} onClick={this.resetSingleValue}>
          Reset single value 'radius'
        </button>
        <button type={'button'} onClick={this.resetSingleArrayValue}>Remove 'rotterdam' from array</button>
      </div>
    );
  }
}

export default withQueryToggler(App);
