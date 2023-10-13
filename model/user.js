// Sample user data for demonstration purposes
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];


// Secret key for JWT
const secretKey = 'your_secret_key'; // Replace with your secret key


// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match a user
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route that requires authentication
app.get('/protected', (req, res) => {
  // Check if a token is provided in the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid, you can now handle the protected route logic here
    res.json({ message: 'Protected route accessed successfully', user: decoded });
  });
});