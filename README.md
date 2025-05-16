# ☕ Buy Me a Coffee – Web3 dApp

A simple, open-source "Buy Me a Coffee" dApp on Ethereum. Built with Solidity, React, ethers.js, and MetaMask.

**🚧 This project is in development and open to collaboration! PRs welcome.**

---

## Features

- Anyone can send ETH and a message (buy you a coffee) via MetaMask
- View messages (“memos”) on the front end
- Owner can withdraw all tips
- Open source (MIT License)

---

## Stack

- Solidity (Ethereum smart contract)
- React + ethers.js (front end)
- MetaMask for Web3 interaction

---

## Quick Start

1. **Clone the repo**

    ```bash
    git clone https://github.com/YOUR-USERNAME/buy-me-a-coffee-dapp.git
    cd buy-me-a-coffee-dapp
    ```

2. **Deploy the contract**  
   - Use [Remix IDE](https://remix.ethereum.org/) or Hardhat to deploy `/contracts/BuyMeACoffee.sol` to Ethereum (testnet recommended).
   - Copy the deployed contract address.

3. **Set the contract address in `/frontend/src/App.js`:**

    ```js
    const contractAddress = "YOUR_CONTRACT_ADDRESS";
    ```

4. **Install front end dependencies & run:**

    ```bash
    cd frontend
    npm install
    npm start
    ```

5. **Open [http://localhost:3000](http://localhost:3000) and connect MetaMask!**

---

## Contributing

This project is in development and open to collaboration!  
Issues, suggestions, and PRs are welcome.

---

## License

MIT License (see LICENSE file)
