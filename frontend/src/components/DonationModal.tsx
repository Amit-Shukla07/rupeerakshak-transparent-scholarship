import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle, Wallet, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ethers } from "ethers";

interface Student {
    _id: string;
    name: string;
    walletAddress: string;
    needs: number;
}

interface DonationModalProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ student, isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Unlock states
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);

    const { signer, hasWallet, unlockWallet } = useAuth();
    const { toast } = useToast();

    // Reset state when modal opens/closes
    React.useEffect(() => {
        if (!isOpen) {
            setShowUnlock(false);
            setPassword('');
            setAmount('');
            setIsSuccess(false);
        }
    }, [isOpen]);

    if (!student) return null;

    const handleUnlock = async () => {
        if (!password) {
            toast({
                title: "Password Required",
                description: "Please enter your wallet password.",
                variant: "destructive"
            });
            return;
        }

        setIsUnlocking(true);
        try {
            const success = await unlockWallet(password);
            if (success) {
                toast({
                    title: "Wallet Unlocked",
                    description: "You can now proceed with the donation.",
                });
                setShowUnlock(false);
            } else {
                toast({
                    title: "Unlock Failed",
                    description: "Incorrect password. Please try again.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Unlock error:", error);
            toast({
                title: "Error",
                description: "Failed to unlock wallet.",
                variant: "destructive"
            });
        } finally {
            setIsUnlocking(false);
        }
    };

    const handleDonate = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid donation amount.",
                variant: "destructive"
            });
            return;
        }

        if (!signer) {
            console.log("No signer found, showing unlock screen");
            setShowUnlock(true);
            return;
        }

        setIsProcessing(true);

        try {
            // Convert amount to wei
            const ethAmount = ethers.parseEther(amount);

            // Send transaction directly to student wallet
            const tx = await signer.sendTransaction({
                to: student.walletAddress,
                value: ethAmount
            });

            console.log("Transaction sent:", tx.hash);

            // Wait for confirmation
            await tx.wait();

            setIsProcessing(false);
            setIsSuccess(true);

            toast({
                title: "Donation Successful",
                description: `You have successfully donated ${amount} ETH to ${student.name}.`,
            });

            // Reset after success
            setTimeout(() => {
                setIsSuccess(false);
                setAmount('');
                onClose();
            }, 3000);

        } catch (error: any) {
            console.error("Donation failed:", error);
            setIsProcessing(false);
            toast({
                title: "Donation Failed",
                description: error.message || "Transaction failed. Please try again.",
                variant: "destructive"
            });
        }
    };

    // If wallet is locked and we need to show unlock screen
    if (showUnlock) {
        return (
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl flex items-center gap-2">
                            <Lock className="h-5 w-5 text-session" />
                            Unlock Wallet
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Please enter your password to unlock your wallet and proceed with the donation.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-zinc-300">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter wallet password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUnlock();
                                        }
                                    }}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-end gap-2">
                        <Button variant="ghost" onClick={() => setShowUnlock(false)} className="text-zinc-400 hover:text-white">
                            Cancel
                        </Button>
                        <Button onClick={handleUnlock} disabled={isUnlocking} className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {isUnlocking ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Unlocking...
                                </>
                            ) : (
                                "Unlock Wallet"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        Donate to {student.name}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Enter the amount you wish to donate. This transaction will be recorded on the blockchain.
                    </DialogDescription>
                </DialogHeader>

                {!isSuccess ? (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="wallet" className="text-zinc-300">Recipient Wallet</Label>
                            <Input
                                id="wallet"
                                value={student.walletAddress}
                                disabled
                                className="bg-zinc-800 border-zinc-700 text-zinc-400 font-mono text-xs"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount" className="text-zinc-300">Amount (ETH)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.05"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                autoFocus
                            />
                        </div>
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Payment Successful!</h3>
                        <p className="text-zinc-400">Thank you for supporting {student.name}.</p>
                    </div>
                )}

                <DialogFooter className="sm:justify-end">
                    {!isSuccess && !showUnlock && (
                        <>
                            <Button variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                Cancel
                            </Button>
                            <Button onClick={handleDonate} disabled={isProcessing} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm Payment"
                                )}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DonationModal;
