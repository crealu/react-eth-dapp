import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useEffect } from 'react';

const gridStyle = {
  display: 'block',
  margin: '0 auto',
  position: 'relative',
  width: '90vw',
  marginBottom: '150px',
  height: '100px',
};

function GetLatestButton({ text, color, toggleRequest }) {
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

function LatestBlockView({ isUpdating, getBlockData, blockData }) {
  const blockDataColumns = [
    { id: 'id', headerName: 'ID', width: 70 },
    {
      field: 'blockNumber',
      headerName: 'Block #',
      width: 150,
      editable: false
    },
    {
      field: 'txCount',
      headerName: 'Transaction Count',
      width: 180,
      editable: false
    },
    {
      field: 'miner',
      headerName: 'Miner',
      width: 400,
      editable: false
    },
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      width: 200,
      editable: false
    }
  ];

  const blockDataRows = [{
    id: 1,
    blockNumber: blockData.blockNumber,
    txCount: blockData.txCount,
    miner: blockData.minerAddress,
    difficulty: blockData.difficulty,
  }];

  return (
    <div>
      <GetLatestButton
        color={isUpdating ? 'red' : '#77e879'}
        text={isUpdating ? 'Pause Requests' : 'Request Latest Block'}
        toggleRequest={getBlockData}
      />
      <DataGrid
        style={gridStyle}
        rows={blockDataRows}
        columns={blockDataColumns}
        pageSize={1}
        autoHeight
      />
    </div>
  )
}

export default LatestBlockView;
