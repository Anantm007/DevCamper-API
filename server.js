const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const mongoose = require("mongoose"); 

require('dotenv').config()

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Body Parser
app.use(express.json())

// Connect to MognoDB
mongoose.promise = global.Promise;
mongoose.connect(process.env.MongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true}, (err,db)=> {
    if(err)
    console.log(err);

    else
    console.log('Database Connected'.cyan.bold.underline);
});

// Dev logging middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

// Mount Routes
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

// Listen to the PORt
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.cyan.bold.underline)
})