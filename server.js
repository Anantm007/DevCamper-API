const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose"); 

require('dotenv').config()

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Connect to MognoDB
mongoose.promise = global.Promise;
mongoose.connect(process.env.MongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, (err,db)=> {
    if(err)
    console.log(err);

    else
    console.log('Database Connected');
});
mongoose.set('useFindAndModify', false);



// Dev logging middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

// Routes
app.use("/api/v1/bootcamps", bootcamps);


// Listen to the PORt
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})