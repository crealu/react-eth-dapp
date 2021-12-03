import './App.css';
import * as React from 'react';
import Web3 from 'web3';
import LatestBlockView from './components/LatestBlockView';
import TransactionsView from './components/TransactionsView';
import { useState, useEffect } from 'react';

const mainStyle = {
  textAlign: 'center',
  height: '100vh',
};

const apiKey = 'your key';
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/' + apiKey))

function Header({ isUpdating, progress }) {
  return (
    <div style={{marginTop: '30px'}}>
      <h1>Energi Full Stack Challenge App</h1>
      <h4>{progress == 0 && !isUpdating ? 'Updated': 'Updating in ' + progress}</h4>
    </div>
  )
}

function App() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [blockData, setblockData] = useState({
    blockNumber: 0,
    txCount: 0,
    transactions: [0],
    minerAddress: 0,
    difficulty: 0
  });

  const [txValues, setTxValues] = useState([])
  const [gotTx, setGotTx] = useState(false)
  const [txDataRows, setTxDataRows] = useState([
    { id: 1, value: 0, transaction: blockData.transactions[0] }
  ])

  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(12)

  const getBlockData = async () => {
    setGotTx(false)
    let bNumber = await web3.eth.getBlockNumber()
    let bData = await web3.eth.getBlock(bNumber)

    setblockData({...blockData,
      blockNumber: bNumber,
      txCount: bData.transactions.length,
      transactions: bData.transactions,
      minerAddress: bData.miner,
      difficulty: bData.difficulty
    });

    let vals = [];
    for (let v = 0; v < bData.transactions.length; v++) {
      await( web3.eth.getTransaction(bData.transactions[v]) )
        .then(res => vals.push(res.value))
    }
    setGotTx(!gotTx)
    setTxValues(vals)
  }

  const getTransactionData = async () => {
    let idNumber = 0;
    let newTxs = txValues.map(val => (
       {id: idNumber++, value: val, transaction: blockData.transactions[idNumber]}
    ));
    setTxDataRows(newTxs)
  }

  const toggleRequests = () => {
    setIsUpdating(!isUpdating)
    setIsActive(!isActive)
    if (!isUpdating) { getBlockData() }
  }

  const step = 1000;

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setProgress(progress => progress - 1)
        if (progress == 0) {
          setProgress(12)
          getBlockData()
        }
      }, step);
    } else if (!isActive && progress !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, progress]);

  return (
    <div style={mainStyle}>
      <Header progress={progress} />
      <LatestBlockView
        isUpdating={isUpdating}
        getBlockData={toggleRequests}
        blockData={blockData}
      />
      {
        isUpdating &&
        <TransactionsView
          gotTx={gotTx}
          getTransactions={getTransactionData}
          txDataRows={txDataRows}
        />
      }
    </div>
  );
}

export default App;
