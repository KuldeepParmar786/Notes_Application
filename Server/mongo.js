const config=require('./utils/config')
const Note=require('./model/note')
const mongoose = require('mongoose')


mongoose.set('strictQuery',false)

const url="mongodb+srv://Kuldeep:123654@cluster0.1eun9yi.mongodb.net/TestNoteApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)


const note = new Note({
  content: 'Kapil is Hardworking',
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})