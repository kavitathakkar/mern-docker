//package imports
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');  // ✅ CommonJS style

// local imports
const reqLogger = require('./utilities/reqLogger');
const errorLogger = require('./utilities/errorLogger');
const indexRouter = require('./routes/indexRoutes');

// connection to local mongoDB server
// mongoose.connect('mongodb://localhost:27017/Pharma', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

const mongoURI = 'mongodb://localhost:27017/Pharma';
mongoose
	.connect(mongoURI, {
		useNewUrlParser:true,
		useUnifiedTopology:true,
})
.then(() => {
	console.log('connected to mongoDB successfully');
})
.catch((error) => {
	console.error('Error connecting to mongoDB', error);
});


const app = express();

//middlewares
app.use(express.json()); // this is for parsing json from req.body
app.use(express.urlencoded({extended: true })); // this is for something idk
app.use(cookieParser()); // this is for cookie session management
app.use(cors());

// routing middlewares and router
app.use(reqLogger);
app.use('/', indexRouter);
app.use(errorLogger);

app.listen(6000, () => {
    console.log('Server listening on Port 5000 -  http://localhost:6000.....');
});