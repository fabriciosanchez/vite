// server.js - Example Backend Service
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for your frontend to connect

// Configure your PostgreSQL connection details
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // or private IP for VPC
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.post('/save-interview', async (req, res) => {
  const {
    candidate_name,
    candidate_email,
    candidate_current_role,
    applied_for_position,
    question_types,
    interview_duration_minutes,
    transcript,
    feedback,
  } = req.body;

  const query = `
    INSERT INTO interviews (
      candidate_name, candidate_email, candidate_current_role, applied_for_position, 
      question_types, interview_duration_minutes, transcript, feedback
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const values = [
    candidate_name,
    candidate_email,
    candidate_current_role,
    applied_for_position,
    JSON.stringify(question_types), // Storing array as JSON string
    interview_duration_minutes,
    JSON.stringify(transcript),     // Storing transcript object as JSON string
    feedback,
  ];

  try {
    await pool.query(query, values);
    res.status(201).send({ message: 'Interview saved successfully.' });
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).send({ message: 'Failed to save interview.' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});