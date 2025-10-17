const Note=require('../model/note')
const User=require('../model/user')

const initialNotes=[
    {
        content:'HTML is easy',
        important:false
    },
    {
        content:'Kapil is Hardworking',
        important:true
    }
   
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersIndb = async()=>{
   const users = await User.find({})
   return users.map(e=>e.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb,usersIndb
}