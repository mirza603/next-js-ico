'use client'; // Required for using hooks like useState and useEffect

import { useState } from 'react';
import { ethers } from 'ethers';

export default function Presale() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [tokenPrice] = useState<number>(0.01); // Example price per token in ETH.

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask not detected!');
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handlePurchase = async () => {
    try {
      if (!walletAddress) {
        alert('Connect your wallet first!');
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const transaction = await signer.sendTransaction({
        to: '[SmartContractAddress]', // Replace with your smart contract address
        value: ethers.utils.parseEther(purchaseAmount),
      });

      alert(`Transaction sent! TX: ${transaction.hash}`);
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Failed to process the transaction. Please check your input or try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Presale Dashboard</h1>
      {walletAddress ? (
        <div>
          <p>Wallet: {walletAddress}</p>
          <input
            type="number"
            placeholder="Enter ETH Amount"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
          />
          <button onClick={handlePurchase} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Buy Tokens
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
