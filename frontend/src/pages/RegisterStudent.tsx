import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const RegisterStudent: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        walletAddress: '',
        needs: '',
        bio: '',
        documentHash: 'QmPlaceholderHash' // Default placeholder or user input
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    needs: Number(formData.needs)
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            toast({
                title: "Registration Successful",
                description: "Your application has been submitted!",
            });

            // Redirect to find students page or dashboard
            navigate('/find-students');

        } catch (error: any) {
            console.error('Registration failed:', error);
            toast({
                title: "Registration Failed",
                description: error.message || "Please check your inputs and try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 pt-24">
            <div className="container mx-auto max-w-2xl">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">Apply for Scholarship</CardTitle>
                        <CardDescription className="text-center">
                            Tell us your story and why you need support. Donors are waiting to help!
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="walletAddress">Wallet Address (Ethereum/Polygon)</Label>
                                <Input
                                    id="walletAddress"
                                    name="walletAddress"
                                    placeholder="0x..."
                                    required
                                    value={formData.walletAddress}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="needs">Amount Needed (ETH/POL)</Label>
                                <Input
                                    id="needs"
                                    name="needs"
                                    type="number"
                                    step="0.0001"
                                    placeholder="0.5"
                                    required
                                    value={formData.needs}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Statement of Purpose / Why do you need this scholarship?</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="I am a final year computer science student..."
                                    className="min-h-[150px] bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="documentHash">Document Link (Proof of Enrollment/Grades)</Label>
                                <Input
                                    id="documentHash"
                                    name="documentHash"
                                    placeholder="Link to Google Drive / IPFS Hash"
                                    value={formData.documentHash}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit Application"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterStudent;
