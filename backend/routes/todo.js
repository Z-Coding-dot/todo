const express = require('express');
const router = express.Router();

// Example route
router.get('/tasks', (req, res) => {
  res.send('ToDo endpoint');
});

module.exports = router; // Ensure this line is present
