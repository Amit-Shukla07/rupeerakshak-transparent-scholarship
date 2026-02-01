const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    needs: { type: Number, required: true }, // Amount needed in ETH/coins
    documentHash: { type: String, required: true },
    isRegistered: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
