import React, { useEffect, useState } from "react";
import { Search, Loader2, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Transaction {
  donorId: string;
  studentName: string;
  amount: number;
  explorer: string;
  date: string;
}

interface StudentTransaction {
  purpose: string;
  amount: number;
}

interface StudentData {
  name: string;
  studentId: string;
  wallet: string;
  totalReceived: number;
  transactions: StudentTransaction[];
}

const TransparencyPage = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  // 🔹 Fetch global transactions
  useEffect(() => {
    fetchGlobalTransactions();
  }, []);

  const fetchGlobalTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/transparency/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // 🔹 Search student by ID / name / wallet
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/transparency/student?query=${query}`);
      const data = await res.json();
      setStudentData(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">
          Public Transparency Dashboard
        </h1>
        <p className="text-gray-400">
          Every scholarship transaction is public, verifiable, and immutable.
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-3xl mx-auto mb-12 flex gap-3">
        <Input
          placeholder="Search by Student ID / Name / Wallet Address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-900 border-gray-700"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* STUDENT DETAIL */}
      {studentData && (
        <Card className="max-w-5xl mx-auto mb-12 bg-gray-900 border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Student Details</h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Student ID:</strong> {studentData.studentId}</p>
            <p><strong>Wallet:</strong> {studentData.wallet}</p>
            <p><strong>Total Received:</strong> ₹{studentData.totalReceived}</p>
          </div>

          <h3 className="mt-6 mb-3 font-semibold">Wallet Transaction History</h3>
          <div className="space-y-2">
            {studentData.transactions.map((tx: StudentTransaction, i: number) => (
              <div
                key={i}
                className="flex justify-between text-sm bg-black/40 p-3 rounded"
              >
                <span>{tx.purpose}</span>
                <span>₹{tx.amount}</span>
                <span className="text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Verified
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* GLOBAL TRANSACTIONS */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Global Scholarship Transactions
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-3 text-left">Donor</th>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Tx Hash</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-t border-gray-800">
                    <td className="p-3">{tx.donorId}</td>
                    <td className="p-3">{tx.studentName}</td>
                    <td className="p-3 text-center">₹{tx.amount}</td>
                    <td className="p-3 text-blue-400">
                      <a href={tx.explorer} target="_blank">View</a>
                    </td>
                    <td className="p-3">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransparencyPage;