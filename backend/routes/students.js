const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST register a new student
router.post('/', async (req, res) => {
    const { name, bio, walletAddress, email, needs, documentHash } = req.body;

    try {
        const newStudent = new Student({
            name,
            bio,
            walletAddress,
            email,
            needs,
            documentHash
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
