const mongoose = require('mongoose');
const URI = 'mongodb+srv://najem_gaaloul:987654321@cluster0.o3wkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async()=>{
 await mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>console.log('DB connected'))
.catch((e)=>console.error('faild !' + e));
}


module.exports = connectDB;