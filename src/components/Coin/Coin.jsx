import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {

    handleClick = (event) => {
        //prevents default action
        event.preventDefault();
        
        this.props.handleRefresh(this.props.tickerId);

    }
    
    render() {

        return (
            <tr>
              <Td>{this.props.name}</Td>
              <Td>{this.props.ticker}</Td>
              <Td>${this.props.price}</Td>
              {this.props.showBalance ? <Td>{this.props.balance}</Td> : null}
              <Td><button onClick={this.handleClick}> Refresh </button> </Td>
            </tr>
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}
