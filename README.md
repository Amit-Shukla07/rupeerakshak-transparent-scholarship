# RupeeRakshak - Transparent Scholarship Platform

A decentralized scholarship platform that brings transparency and accountability to educational funding using blockchain technology.

## 🚀 Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Ethers.js** - Ethereum interactions
- **Aptos SDK** - Aptos blockchain integration
- **React Router** - Navigation
- **Framer Motion** - Animations

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** - Database
- **CORS** - Cross-origin resource sharing

### Blockchain
- **Hardhat** - Ethereum development environment
- **Solidity 0.8.28** - Smart contract language
- **Sepolia Testnet** - Ethereum test network

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Amit-Shukla07/rupeerakshak-transparent-scholarship.git
cd rupeerakshak-transparent-scholarship
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scholarship-platform
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/scholarship-platform
```

Start the backend server:

```bash
node server.js
```

The API will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create environment variables if needed (e.g., API endpoints in `.env`):

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

### 4. Blockchain Setup

```bash
cd blockchain
npm install
```

Create a `.env` file in the `blockchain/` directory:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

Compile the smart contracts:

```bash
npx hardhat compile
```

Deploy to Sepolia testnet:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 📁 Project Structure

```
rupeerakshak-transparent-scholarship/
├── frontend/          # React + Vite frontend application
├── backend/           # Express.js API server
├── blockchain/        # Hardhat + Solidity smart contracts
└── README.md
```

## 🔧 Available Scripts

### Frontend (`frontend/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (`backend/`)
- `node server.js` - Start the server

### Blockchain (`blockchain/`)
- `npx hardhat compile` - Compile contracts
- `npx hardhat test` - Run tests
- `npx hardhat run scripts/deploy.js --network sepolia` - Deploy to Sepolia

## 🌐 Environment Variables

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |

### Blockchain
| Variable | Description | Required |
|----------|-------------|----------|
| `SEPOLIA_RPC_URL` | Sepolia RPC endpoint | Yes |
| `PRIVATE_KEY` | Wallet private key for deployment | Yes |
| `ETHERSCAN_API_KEY` | Etherscan API key for verification | No |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

Created by the RupeeRakshak Team

---

**Note**: Make sure to never commit your `.env` files or expose your private keys. Keep them secure and use environment variables for sensitive information.
