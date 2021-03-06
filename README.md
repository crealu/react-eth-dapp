# A React Ethereum App

This project is a full stack dapp created using React, Ethereum, Web3, and MaterialUI.

&nbsp;
## Usage

Navigate to this directory and run `yarn start` in the terminal.

Open your browser and go to url localhost:3000.

This app can be used to retrieve the latest Ethereum block and its data:
- block number
- number of transactions
- miner who mined the blocked
- difficulty

There is a button that allows you to obtain and display all the transactions on the retrieved block. The data is displayed in a DataGrid MaterialUI component.

&nbsp;
## Required Changes

In App.js, the apiKey constant is set to a string, 'your key'. Replace 'your key' with the public API key provided by Infura (https://infura.io/).

