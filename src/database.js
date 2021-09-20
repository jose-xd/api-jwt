import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost/api-jwt-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));