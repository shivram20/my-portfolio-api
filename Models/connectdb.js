const mongoose = require('mongoose');

const connectdb = (url) =>{
    if(url == ""){
        return 0;
    }
    mongoose.connect(url);
}

module.exports = {
    connectdb,
}