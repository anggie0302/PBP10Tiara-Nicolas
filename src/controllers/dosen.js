const express = require('express');
const connection = require('../models/db');

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM dosen', (error, results) => {
        if (error) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(results);
    });
});

router.get('/:nidn', (req, res) => {
    const { nidn } = req.params;
    connection.query('SELECT * FROM dosen WHERE nidn = ?', [nidn], (error, results) => {
        if (error) return res.status(500).json({ message: 'Internal Server Error' });
        if (results.length === 0) return res.status(404).json({ message: 'Dosen not found' });
        res.json(results[0]);
    });
});

router.post('/', (req, res) => {
    const { nidn, nama, gender, prodi, alamat } = req.body;
    if (!nidn || !nama || !gender || !prodi || !alamat) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    connection.query(
        'INSERT INTO dosen (nidn, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nidn, nama, gender, prodi, alamat],
        (error, results) => {
            if (error) {
                console.error('Error creating dosen:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Dosen berhasil ditambahkan', nidn });
        }
    );
});

router.put('/:nidn', (req, res) => {
    const { nidn } = req.params;
    const { nama, gender, prodi, alamat } = req.body;
    connection.query(
        'UPDATE dosen SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nidn = ?',
        [nama, gender, prodi, alamat, nidn],
        (error, results) => {
            if (error) return res.status(500).json({ message: 'Internal Server Error' });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Dosen not found' });
            res.json({ message: 'Dosen berhasil diupdate' });
        }
    );
});

router.delete('/:nidn', (req, res) => {
    const { nidn } = req.params;
    connection.query('DELETE FROM dosen WHERE nidn = ?', [nidn], (error, results) => {
        if (error) {
            console.error('Error deleting dosen:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Dosen not found' });
        res.json({ message: 'Dosen berhasil dihapus' });
    });
});

module.exports = router;