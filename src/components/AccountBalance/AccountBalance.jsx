import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;

export default class AccountBalance extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
        event.preventDefault();

        this.props.handleBalanceToggle();
        }

    render() {
        const buttonText = this.props.showBalance ? "Hide Balance" : "Show Balance";

        const toggleBalance = this.props.showBalance ? 
        <span><strong>Balance : </strong>$ {this.props.amount}</span> : null;

        return (
            <Section>
                {toggleBalance}
                <button onClick={this.handleClick}> {buttonText} </button>
            </Section>
        );
    }
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}