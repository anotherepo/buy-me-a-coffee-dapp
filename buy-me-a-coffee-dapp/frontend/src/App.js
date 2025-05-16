import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Replace with your deployed contract address after deploying
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  {
    "inputs": [],
    "name": "getMemos",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "from", "type": "address" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "message", "type": "string" }
        ],
        "internalType": "struct BuyMeACoffee.Memo[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "message", "type": "string" }
    ],
    "name": "buyCoffee",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(false);

  const isDev = true; // Display dev message

  // Check if wallet is connected
  const checkWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) setCurrentAccount(accounts[0]);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    }
  };

  // Send buy coffee transaction
  const buyCoffee = async (e) => {
    e.preventDefault();
    if (!name || !message) {
      alert("Please enter both name and message");
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coffeeContract = new ethers.Contract(contractAddress, abi, signer);

      const txn = await coffeeContract.buyCoffee(
        name,
        message,
        { value: ethers.utils.parseEther("0.001") }
      );
      await txn.wait();

      setName("");
      setMessage("");
      getMemos();
    } catch (err) {
      alert("Transaction failed or rejected");
    }
    setLoading(false);
  };

  // Get memos
  const getMemos = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const coffeeContract = new ethers.Contract(contractAddress, abi, provider);
      const memos = await coffeeContract.getMemos();
      setMemos(memos);
    } catch (err) {
      setMemos([]);
    }
  };

  useEffect(() => {
    checkWallet();
    getMemos();
    // Listen for events (not required for MVP)
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>☕ Buy Me a Coffee DApp</h2>
      {isDev && (
        <div style={{
          background: "#f9dede",
          border: "1px solid #eeaaaa",
          padding: "0.75rem",
          borderRadius: "8px",
          marginBottom: "1rem"
        }}>
          <b>⚠️ This dApp is in development!</b><br/>
          Open to collaboration — check the <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>!<br/>
          MIT Licensed.
        </div>
      )}
      {currentAccount ? (
        <form onSubmit={buyCoffee} style={{ marginBottom: "1.5rem" }}>
          <input
            style={{ width: "47%", marginRight: "6%" }}
            type="text" placeholder="Your name" value={name}
            onChange={e => setName(e.target.value)} required
          />
          <input
            style={{ width: "47%" }}
            type="text" placeholder="Say something nice..." value={message}
            onChange={e => setMessage(e.target.value)} required
          />
          <button
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "1rem",
              background: "#6f4e37",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            type="submit" disabled={loading}
          >
            {loading ? "Sending..." : "☕ Buy Coffee (0.001 ETH)"}
          </button>
        </form>
      ) : (
        <button
          style={{
            background: "#f3d250",
            color: "#2d2d2d",
            border: "none",
            borderRadius: "6px",
            padding: "0.7rem 1.4rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
          onClick={connectWallet}
        >
          Connect MetaMask
        </button>
      )}
      <h3>Recent Coffees:</h3>
      <div>
        {memos.slice().reverse().map((memo, i) => (
          <div key={i} style={{
            background: "#f5f5f5",
            marginBottom: "1rem",
            padding: "0.8rem",
            borderRadius: "8px"
          }}>
            <div><b>{memo.name}</b> <small style={{ color: "#777" }}>({memo.from.slice(0,6)}...{memo.from.slice(-4)})</small></div>
            <div style={{ fontStyle: "italic" }}>{memo.message}</div>
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>{new Date(memo.timestamp * 1000).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
