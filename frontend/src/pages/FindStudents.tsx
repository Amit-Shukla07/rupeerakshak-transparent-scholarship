import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Student {
    _id: string;
    name: string;
    bio: string;
    walletAddress: string;
    needs: number;
}

import DonationModal from '@/components/DonationModal';

const FindStudents: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/students');
            if (!response.ok) throw new Error('Failed to fetch students');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast({
                title: "Error",
                description: "Could not load student data.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDonate = (student: Student) => {
        setSelectedStudent(student);
        setIsDonationModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 pt-24">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Find Deserving Students
            </h1>

            {loading ? (
                <div className="flex justify-center">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map((student) => (
                        <Card key={student._id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-zinc-900 border-zinc-800 text-white">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{student.name}</CardTitle>
                                    <Badge variant="outline">Needs: {student.needs} ETH</Badge>
                                </div>
                                <CardDescription className="truncate text-xs font-mono bg-zinc-800 text-zinc-400 p-1 rounded mt-2">
                                    {student.walletAddress}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-zinc-300">{student.bio}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleDonate(student)}>
                                    Donate Now
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {!loading && students.length === 0 && (
                <div className="text-center text-muted-foreground">
                    No students found
                </div>
            )}

            <DonationModal
                student={selectedStudent}
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
            />
        </div>
    );
};

export default FindStudents;
