const express = require('express') ;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const courseRoutes = express.Router();


app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/courseweb', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB connection successful");
});




app.use('/courseweb', courseRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port : " + PORT);
});