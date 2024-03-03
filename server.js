const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432, // Default PostgreSQL port
});

app.get('/customers', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM customers');
        res.json(result.rows);
        client.release();
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1', [`%${query}%`]);
        res.json(result.rows);
        client.release();
    } catch (error) {
        console.error('Error searching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/sort/:sortBy', async (req, res) => {
    const { sortBy } = req.params;
    let orderBy;
    if (sortBy === 'date') {
        orderBy = 'created_at';
    } else if (sortBy === 'time') {
        orderBy = 'created_at::time';
    } else {
        return res.status(400).json({ error: 'Invalid sort parameter' });
    }
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM customers ORDER BY ${orderBy}`);
        res.json(result.rows);
        client.release();
    } catch (error) {
        console.error('Error sorting customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
