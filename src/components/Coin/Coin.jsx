import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CoinRow = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        //prevents default action
        event.preventDefault();
        
        this.props.handleRefresh(this.props.ticker);

    }
    
    render() {
        return (
            <tr>
              <CoinRow>{this.props.name}</CoinRow>
              <CoinRow>{this.props.ticker}</CoinRow>
              <CoinRow>${this.props.price}</CoinRow>
              <CoinRow><button onClick={this.handleClick}> Refresh </button> </CoinRow>
            </tr>
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}
