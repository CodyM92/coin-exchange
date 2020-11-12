import React from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';

//import { v4 as uuidv4 } from 'uuid';

const Div = styled.div`
  text-align: center;
  background-color: darkblue;
  color: #cccccc;
`;

class App extends React.Component {
  state = {
      balance: 10000,
      showBalance: true,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 0.5,
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          balance: 0,
          price: 1.00
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          balance: 1000,
          price: 0.20
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          balance: 0.25,
          price: 298.99
        }
      ]
    }

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map(function( {ticker, name, balance, price} ) {
      let newPrice = price;
      if (valueChangeTicker === ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage;
      }
      return {
        //these are maps - same as name: name and ticker: ticker
        ticker,
        name,
        balance,
        price: newPrice
      }
    });
    this.setState({ coinData: newCoinData });
  }

  handleBalanceToggle = () => {
    this.setState({ showBalance: !this.state.showBalance});
  }

  render() {
    return (
      <Div className="App">
        <ExchangeHeader />
        <AccountBalance amount={this.state.balance} showBalance={this.state.showBalance} handleBalanceToggle={this.handleBalanceToggle} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} showBalance={this.state.showBalance}/>
      </Div>
    );
  }
  
}

export default App;
