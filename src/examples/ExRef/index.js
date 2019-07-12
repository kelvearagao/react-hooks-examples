/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react';
import './styles.css';
import quotes from './ws';

const updateStatus = (prev, data) => Object.keys(data).reduce((acc, key) => {
  if (prev[key] && data[key]) {
    if (data[key].value === prev[key].value) {
      data[key].status = 'equal';
    } else if (data[key].value > prev[key].value) {
      data[key].status = 'up';
    } else {
      data[key].status = 'down';
    }
  }

  acc[key] = { ...data[key] };

  return acc;
}, {});

const Stocks = () => {
  const [symbol, setSymbol] = useState('');
  const [symbols, setSymbols] = useState(['PETR3', 'PETR4']);

  const subscription = useRef(null);
  const [stocks, setStocks] = useState({});
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (isStopped || !symbols.length) {
      return;
    }

    subscription.current = quotes.subscribe(symbols, (data) => {
      setStocks(prev => updateStatus(prev, data));
    });

    return () => {
      clearInterval(subscription.current);
    };
  }, [isStopped, symbols]);

  function addSymbol() {
    if (!symbol) {
      return;
    }

    setSymbols(prev => [...prev, symbol]);
  }

  return (
    <div className="content">
      <input type="text" onChange={e => setSymbol(e.target.value)} />
      {' '}
      <button type="button" onClick={addSymbol}>Add</button>
      <br />
      <br />
      <button type="button" onClick={() => setIsStopped(false)}>Start</button>
      {' '}
      <button type="button" onClick={() => setIsStopped(true)}>Stop</button>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th width="50%">Symbol</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stocks).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <span className={(stocks[key] || {}).status}>
                  {(stocks[key] || {}).status === 'up' && '\u2191'}
                  {(stocks[key] || {}).status === 'down' && '\u2193'}
                </span>
                {' '}
                <span>
R$
                  {' '}
                  {(stocks[key] || {}).value}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
