import { ethers } from 'ethers';
import ContractConfig from '../contracts/config.json';
import ContractArtifact from '../contracts/ScholarshipPlatform.json';

// Local Hardhat Node URL
const PROVIDER_URL = 'http://127.0.0.1:8545';

// Initialize Provider
export const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

// Contract Details
export const CONTRACT_ADDRESS = ContractConfig.address;
export const CONTRACT_ABI = ContractArtifact.abi;

export interface WalletData {
    address: string;
    mnemonic: string;
    privateKey: string;
    publicKey?: string; // Not commonly used in EVM context essentially same as address derived
}

export const createWallet = (): WalletData => {
    const wallet = ethers.Wallet.createRandom();
    return {
        address: wallet.address,
        mnemonic: wallet.mnemonic?.phrase || "",
        privateKey: wallet.privateKey
    };
};

export const importWalletFromMnemonic = (mnemonic: string): WalletData => {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    return {
        address: wallet.address,
        mnemonic: wallet.mnemonic?.phrase || "",
        privateKey: wallet.privateKey
    };
};

export const importWalletFromPrivateKey = (privateKey: string): WalletData => {
    const wallet = new ethers.Wallet(privateKey);
    return {
        address: wallet.address,
        mnemonic: "", // Cannot derive mnemonic from private key
        privateKey: wallet.privateKey
    };
};

export const getBalance = async (address: string): Promise<string> => {
    try {
        const balance = await provider.getBalance(address);
        return ethers.formatEther(balance);
    } catch (error) {
        console.error("Error fetching balance:", error);
        return "0.0";
    }
};

export const getContract = (signer?: ethers.Signer) => {
    try {
        // If signer is provided, return read-write contract, else read-only
        if (signer) {
            return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        }
        return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    } catch (error) {
        console.error("Error getting contract:", error);
        return null;
    }
};

// Fund wallet from hardhat's first account (faucet for local dev)
export const fundWallet = async (recipientAddress: string, amount: string = "10.0") => {
    try {
        // Hardhat's default first account (usually has 10000 ETH)
        // Private key for Account #0: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        const items = await provider.listAccounts();
        const faucetSigner = await provider.getSigner(0); // Use the first account

        const tx = await faucetSigner.sendTransaction({
            to: recipientAddress,
            value: ethers.parseEther(amount)
        });

        await tx.wait();
        return true;
    } catch (error) {
        console.error("Faucet error:", error);
        return false;
    }
};
