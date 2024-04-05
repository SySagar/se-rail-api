import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());

app.use(express.json());

// Function to search for train availability
function searchTrainAvailability(from, to, date) {
    const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    const availableTrains = data.trains.filter(train => 
        train.from === from && 
        train.to === to &&
        train.date === date
    );
    return availableTrains;
}


app.post('/searchTrain', (req, res) => {

    const { from, to, date } = req.body;
    const trainList = searchTrainAvailability(from, to, date);
    res.json({ trainList : trainList });

});

app.listen(5000, () => {
  console.log('🚀 Server is up and running');
});