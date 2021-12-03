import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const txGridStyle = {
  display: 'block',
  margin: '0 auto',
  position: 'relative',
  width: '90vw',
  marginBottom: '40px',
};

function GetTxButton({ text, color, toggleRequest }) {
  return (
    <Button
      style={{backgroundColor: color, marginBottom: '20px', color: 'black'}}
      variant="contained"
      onClick={toggleRequest}
    >
      {text}
    </Button>
  )
}

function TransactionsView({ gotTx, getTransactions, txDataRows }) {
  const txDataColumns = [
    { id: 'id', headerName: 'ID', width: 70 },
    {
      field: 'value',
      headerName: 'Value (WEI)',
      width: 400
    },
    {
      field: 'transaction',
      headerName: 'Transaction',
      width: 550
    }
  ];

  return (
    <div>
      <GetTxButton
        color={gotTx ? '#77e879' : 'gray'}
        text={gotTx ? 'Update Transactions': 'Getting Transactions'}
        toggleRequest={getTransactions}
      />
      <DataGrid
        key={4}
        style={txGridStyle}
        rows={txDataRows}
        columns={txDataColumns}
        pageSize={100}
        autoHeight
      />
    </div>
  )
}

export default TransactionsView;
