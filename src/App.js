import React, {useState, useEffect} from 'react';
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

function App(props) {

  const [balance, setBalance] = useState(10000);

  const [showBalance, setShowBalance] = useState(true);

  const [coinData, setCoinData] = useState([]);

  //cant be used inside of useEffect bc useEffect cannot be async.
  //must be placed above the useEffect function
  const componentDidMount = async () => {
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
    setCoinData(coinPriceData);
    };

    useEffect(function() {
      if(coinData.length === 0) {
        componentDidMount();
      }
    });
  
  const handleBalanceToggle = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = priceFormat( response.data.quotes.USD.price );
    const newPriceData = coinData.map( 
      function( values ) {
      let newValues = {...values};
      if (values.key === valueChangeId) {
        newValues.price = newPrice;
      }
    return newValues;
    });
    setCoinData(newPriceData);
  }

  return (
      <Div className="App">
        <ExchangeHeader />
        <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleBalanceToggle={handleBalanceToggle} />
        <CoinList coinData={coinData} handleRefresh={handleRefresh} showBalance={showBalance}/>
      </Div>
  );
  
}


export default App;
