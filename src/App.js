import React from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import axios from 'axios';

//import { v4 as uuidv4 } from 'uuid';

const Div = styled.div`
  text-align: center;
  background-color: darkblue;
  color: #cccccc;
`;

const COIN_COUNT = 10;

const priceFormat = price => parseFloat(Number( price ).toFixed(3));

class App extends React.Component {
  state = {
      balance: 10000,
      showBalance: true,
      coinData: [
        /*
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
      */
      ]
    }

  componentDidMount = async () => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/coins`);
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: priceFormat(coin.quotes.USD.price),
      };
    });
     //retrieve the prices here
    this.setState({ coinData: coinPriceData });
    };

  handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = priceFormat( response.data.quotes.USD.price );
    const newPriceData = this.state.coinData.map( 
      function( values ) {
      let newValues = {...values};
      if (values.key === valueChangeId) {
        newValues.price = newPrice;
      };
    return newValues;
    });
    this.setState({ coinData: newPriceData });
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
