import app from "./app.mjs"

const port = 3500;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/* Registration endpoint
app.post('/register', (req, res) => {
  // Registration logic...
});

// Login endpoint
app.post('/login', (req, res) => {
  // Login logic...
});

// Create a new quest
app.post('/quest', (req, res) => {
  // Quest creation logic...
});

// View 'my fetcher' (could be a user profile or specific fetcher information)
app.get('/fetcher', (req, res) => {
  // Fetcher retrieval logic...
});
*/
