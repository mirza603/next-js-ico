import { useEffect, useState } from 'react';

const WalletConnect = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected!');
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setWalletAddress(accounts[0]);
    onConnect(accounts[0]);
  };

  return walletAddress ? (
    <p>Connected: {walletAddress}</p>
  ) : (
    <button onClick={connectWallet}>Connect Wallet</button>
  );
};

export default WalletConnect;
