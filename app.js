const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const schedule = require('node-schedule');
const path = require('path');
const app = express();

// API and database setup
const apiKey = '14b44a16b24cabac323e32b2d7072e3e'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

// Set up SQLite database
let db = new sqlite3.Database('./weather.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQLite database.');
});

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS weather_data (
    city TEXT,
    temperature REAL,
    humidity INTEGER,
    wind_speed REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Set up static files and middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the weather.html file on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

// Route to fetch weather data
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const response = await axios.get(apiUrl + city + `&appid=${apiKey}`);
        const data = response.data;

        // Save data to the database
        db.run(`INSERT INTO weather_data (city, temperature, humidity, wind_speed) VALUES (?, ?, ?, ?)`,
            [data.name, data.main.temp, data.main.humidity, data.wind.speed], function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Weather data for ${data.name} stored in the database.`);
        });

        // Send weather data to the frontend
        res.json({
            city: data.name,
            temperature: Math.round(data.main.temp) + '°C',
            humidity: data.main.humidity + '%',
            wind_speed: data.wind.speed + ' km/h',
            weather: data.weather[0].main
        });
    } catch (error) {
        res.status(404).json({ error: 'City not found' });
    }
});

// Schedule weather updates (run every hour)
schedule.scheduleJob('0 * * * *', async () => {
    // Fetch and update weather data for a predefined city or cities
    const cities = ['New York', 'London', 'Tokyo'];  // Add your cities here
    cities.forEach(async (city) => {
        try {
            const response = await axios.get(apiUrl + city + `&appid=${apiKey}`);
            const data = response.data;

            db.run(`INSERT INTO weather_data (city, temperature, humidity, wind_speed) VALUES (?, ?, ?, ?)`,
                [data.name, data.main.temp, data.main.humidity, data.wind.speed], function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`Weather data for ${data.name} updated.`);
            });
        } catch (error) {
            console.error(`Failed to fetch weather data for ${city}: `, error.message);
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
