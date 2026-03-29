const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const FILE = './data/events.json';

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const eventId = req.params.id;
        const dir = `uploads/${eventId}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get events
app.get('/events', (req, res) => {
    const data = fs.readFileSync(FILE);
    res.json(JSON.parse(data));
});

// Create event
app.post('/events', (req, res) => {
    const events = JSON.parse(fs.readFileSync(FILE));
    const newEvent = {
        id: Date.now(),
        images: [],
        ...req.body
    };

    events.push(newEvent);
    fs.writeFileSync(FILE, JSON.stringify(events, null, 2));

    res.json(newEvent);
});

// Upload images
app.post('/upload/:id', upload.array('images', 10), (req, res) => {
    const eventId = parseInt(req.params.id);
    const events = JSON.parse(fs.readFileSync(FILE));

    const event = events.find(e => e.id === eventId);

    const imagePaths = req.files.map(file => `/uploads/${eventId}/${file.filename}`);
    event.images.push(...imagePaths);

    fs.writeFileSync(FILE, JSON.stringify(events, null, 2));

    res.json({ message: "Images uploaded", images: imagePaths });
});

app.listen(3000, () => console.log("Server running on port 3000"));