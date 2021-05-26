const mongoose = require('mongoose');

const personShema = new mongoose.Schema({
    name: {type :String , required:true},
    age: {type: Number},
    favoriteFoods: [String]
});

module.exports = Person = mongoose.model('person', personShema)