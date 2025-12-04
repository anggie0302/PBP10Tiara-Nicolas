const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/', (req, res) => {
    connection.query('SELECT * FROM mahasiswa', (error, results) => {
        if (error) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(results);
    });
});

router.get('/:nim', (req, res) => {
    const { nim } = req.params;
    connection.query('SELECT * FROM mahasiswa WHERE nim = ?', [nim], (error, results) => {
        if (error) return res.status(500).json({ message: 'Internal Server Error' });
        if (results.length === 0) return res.status(404).json({ message: 'Mahasiswa not found' });
        res.json(results[0]);
    });
});

router.post('/', (req, res) => {
    const { nim, nama, gender, prodi, alamat } = req.body;
    if (!nim || !nama || !gender || !prodi || !alamat) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    connection.query(
        'INSERT INTO mahasiswa (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nim, nama, gender, prodi, alamat],
        (error, results) => {
            if (error) {
                console.error('Error creating mahasiswa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Mahasiswa created successfully', nim });
            }
        }
    );
});

router.put('/:nim', (req, res) => {
    const { nim } = req.params;
    const { nama, gender, prodi, alamat } = req.body;
    connection.query('UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?', 
        [nama, gender, prodi, alamat, nim], (error, results) => {
            if (error) return res.status(500).json({ message: 'Internal Server Error' });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Mahasiswa not found' });
            res.json({ message: 'Updating mahasiswa Successful' });
        });
});

router.delete('/:nim', (req, res) => {
    const { nim } = req.params;
    connection.query('DELETE FROM mahasiswa WHERE nim = ?', [nim], (error, results) => {
        if (error) {
            console.error('Error deleting mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.affectedRows > 0) {
            res.json({ message: 'Mahasiswa deleted successfully' });
        } else {
            res.status(404).json({ message: 'Mahasiswa not found' });
        }
    });
});

module.exports = router;