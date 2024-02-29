const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Dummy database (replace with actual database)
let confessions = [];

app.post('/confessions', (req, res) => {
    const { confession, identity } = req.body;
    const newConfession = { confession, identity, approved: false };
    confessions.push(newConfession);
    res.status(201).json(newConfession);
});

app.get('/confessions', (req, res) => {
      const approvedConfessions = confessions.filter(confession => confession.approved);
      res.json(approvedConfessions);
});

app.put('/confessions/:id/approve', (req, res) => {
    const { id } = req.params;
    const confession = confessions.find(confession => confession.id === id);
    if (!confession) return res.status(404).json({ message: 'Confession not found' });
    confession.approved = true;
    res.json(confession);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
