// Middleware to handle Basic Authentication
export const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      error: 'Unauthorized access. Please provide valid credentials.'
    });
  }

  try {
    // Decode Base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Validate credentials against hardcoded username and password
    if (username === 'admin' && password === 'password123') {
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({
        error: 'Unauthorized access. Please provide valid credentials.'
      });
    }
  } catch (error) {
    // Handle decoding errors or malformed headers
    return res.status(401).json({
      error: 'Unauthorized access. Please provide valid credentials.'
    });
  }
};
