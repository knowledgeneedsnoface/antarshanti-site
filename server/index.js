// server/index.js
// Local development server for Digital Soul Twin feature
// Runs on http://localhost:4000

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const DATA_DIR = path.join(__dirname, 'data');
const TWINS_FILE = path.join(DATA_DIR, 'twins.json');

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure twins.json exists
if (!fs.existsSync(TWINS_FILE)) {
  fs.writeFileSync(TWINS_FILE, JSON.stringify({}));
}

// Helper: Read twins from file
function readTwins() {
  try {
    const data = fs.readFileSync(TWINS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading twins file:', error);
    return {};
  }
}

// Helper: Write twins to file
function writeTwins(twins) {
  try {
    fs.writeFileSync(TWINS_FILE, JSON.stringify(twins, null, 2));
  } catch (error) {
    console.error('Error writing twins file:', error);
  }
}

// Helper: Apply event logic (server-side validation)
function applyEventToTwin(twin, event) {
  const updatedTwin = { ...twin };
  
  // Path multipliers
  const multipliers = {
    Peace: { calmness: 1.5, discipline: 1.0, emotionalStrength: 1.2, energy: 0.8 },
    Strength: { calmness: 0.8, discipline: 1.5, emotionalStrength: 1.5, energy: 1.2 },
    Devotion: { calmness: 1.2, discipline: 1.5, emotionalStrength: 1.0, energy: 1.3 },
    Light: { calmness: 1.3, discipline: 1.0, emotionalStrength: 1.0, energy: 1.5 },
  };
  
  const pathMultiplier = multipliers[twin.path];
  
  // Add XP
  updatedTwin.xp += event.xp;
  
  // Apply attribute changes with multipliers
  Object.entries(event.changes).forEach(([attr, change]) => {
    if (change !== undefined) {
      const multiplier = pathMultiplier[attr];
      const gain = change * multiplier;
      const fraction = updatedTwin.attributesFraction[attr] || 0;
      const total = gain + fraction;
      const intPart = Math.floor(total);
      const fracPart = total - intPart;
      
      updatedTwin.attributes[attr] += intPart;
      updatedTwin.attributesFraction[attr] = fracPart;
    }
  });
  
  // Check level ups
  let leveledUp = false;
  while (true) {
    const xpNeeded = 200 + 100 * (updatedTwin.level - 1);
    if (updatedTwin.xp >= xpNeeded) {
      updatedTwin.xp -= xpNeeded;
      updatedTwin.level += 1;
      leveledUp = true;
    } else {
      break;
    }
  }
  
  updatedTwin.history.push(event);
  updatedTwin.lastActive = event.date;
  
  return { twin: updatedTwin, leveledUp };
}

// GET /api/twin/:userId
app.get('/api/twin/:userId', (req, res) => {
  const { userId } = req.params;
  const twins = readTwins();
  
  if (twins[userId]) {
    res.json(twins[userId]);
  } else {
    res.status(404).json({ message: 'Twin not found' });
  }
});

// POST /api/twin/:userId - Create twin
app.post('/api/twin/:userId', (req, res) => {
  const { userId } = req.params;
  const twin = req.body;
  
  const twins = readTwins();
  twins[userId] = twin;
  writeTwins(twins);
  
  res.json(twin);
});

// POST /api/twin/:userId/event - Submit event
app.post('/api/twin/:userId/event', (req, res) => {
  const { userId } = req.params;
  const event = req.body;
  
  const twins = readTwins();
  
  if (!twins[userId]) {
    return res.status(404).json({ message: 'Twin not found' });
  }
  
  const { twin: updatedTwin } = applyEventToTwin(twins[userId], event);
  twins[userId] = updatedTwin;
  writeTwins(twins);
  
  res.json(updatedTwin);
});

// POST /api/twin/:userId/sync - Sync queued events
app.post('/api/twin/:userId/sync', (req, res) => {
  const { userId } = req.params;
  const { events } = req.body;
  
  const twins = readTwins();
  
  if (!twins[userId]) {
    return res.status(404).json({ message: 'Twin not found' });
  }
  
  let twin = twins[userId];
  events.forEach(event => {
    const result = applyEventToTwin(twin, event);
    twin = result.twin;
  });
  
  twins[userId] = twin;
  writeTwins(twins);
  
  res.json(twin);
});

// PATCH /api/twin/:userId - Update settings
app.patch('/api/twin/:userId', (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  
  const twins = readTwins();
  
  if (!twins[userId]) {
    return res.status(404).json({ message: 'Twin not found' });
  }
  
  twins[userId] = { ...twins[userId], ...updates };
  writeTwins(twins);
  
  res.json(twins[userId]);
});

app.listen(PORT, () => {
  console.log(`🌟 Soul Twin Server running on http://localhost:${PORT}`);
  console.log(`📁 Data file: ${TWINS_FILE}`);
});
