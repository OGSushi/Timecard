import express from 'express';
import bodyParser from 'body-parser';
import ngrok from 'ngrok';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

const users = [
    { username: 'admin', password: 'Password123', role: 'admin' },
    { username: 'user', password: 'Password', role: 'user' }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
	if (err) {
		console.log(err);
        res.status(500).send("Error serving the file.");
        
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Adjusted to ensure the response is correct for redirection in client-side handling
    if (user.role === 'admin') {
        res.json({ redirect: '/admin/dashboard' });
    } else {
        res.json({ redirect: '/timesheet' });
    }
});

const PORT = 1227;
app.listen(PORT, async () => { // Make this function async 
    console.log(`Server is running on http://localhost:1227/login.html`);
	try {
		const url = await ngrok.connect ({
			addr: PORT,
		});
		console.log(`ngrok tunnel established at https://touching-fitting-rodent.ngrok-free.app`);
	}   catch (error) {
		console.error('Failed to establish ngrok tunnel:', error);
	}	
});

