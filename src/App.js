import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [inverted, setInverted] = useState(false);
  const selectCoin = (event) => setSelectedCoin(event.target.value);
  const converter = (event) => setInput(event.target.value);
  const onInvert = () => {
    reset();
    setInverted((current) => !current);
  };
  const reset = () => setInput("");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Coin List {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectCoin}>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <h3>USD & Selected Coin Inverter</h3>
      <label htmlFor="myUsd">My USD</label>
      <input
        id="myUsd"
        type="number"
        value={inverted ? selectedCoin * input : input}
        onChange={converter}
        disabled={inverted}
      />
      <label htmlFor="btc"> Selected Coins</label>
      <input
        id="btc"
        type="number"
        value={inverted ? input : input / selectedCoin}
        onChange={converter}
        disabled={!inverted}
      />
      <button onClick={onInvert}>Invert</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
