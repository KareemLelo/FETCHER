import express from 'express';

const app = express()
const port = 5000

app.get('/api/hello', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
