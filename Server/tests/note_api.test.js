const {test,after,beforeEach,describe}=require('node:test')
const assert=require('node:assert')
const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Note=require('../model/note')
const User=require('../model/user')
const bcrypt=require('bcrypt')
const helper=require('./test_helper')

const  api=supertest(app)

let initialNotes=[
   {
     content:'Niranjan is lazy',
     important:true
   },
   {
    content:'Kapil is Hardworking',
    important:true
   }
]

// describe('when there is initial some notes saved',()=>{

//   beforeEach(async()=>{
//   await Note.deleteMany({})
//   await Note.insertMany(helper.initialNotes)
// })

// test('notes are returned as json', async () => {
//   await api
//     .get('/api/notes')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('all notes are returned',async()=>{
//    const response=await api.get('/api/notes')
//    assert.strictEqual(response.body.length,helper.initialNotes.length)
// })

// test('a specific note is inside returned notes',async()=>{
//   const response=await api.get('/api/notes')
//   const contents=response.body.map(e=>e.content)
//   assert(contents.includes('Kapil is Hardworking'))
// })
// })

// describe('viewing a specific note',()=>{
//   test('a specific note can be viewed',async()=>{
//     const initialNotes= await helper.notesInDb
//     const noteToview=initialNotes[0]

//    const resultNote= await api
//     .get(`/api/notes/${noteToview.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   assert.deepStrictEqual(resultNote.body, noteToView)

// })
// })

// describe('addition of a new note',()=>{
//   test('a valid note can be added',async()=>{
//     const newNote={
//       content:'Niranjan will always be unemployed',
//       important:true
//     }

//     await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const notesAtEnd = await helper.notesInDb()
//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

//   const contents = notesAtEnd.map(n => n.content)
//   assert(contents.includes('Niranjan will always be unemployed'))

//   test('note without content',async()=>{
//     const newNote={
//       important:true
//     }
     
//     await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(400)
  
//     const notesAtEnd = await helper.notesInDb()
//     assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
//   })
// })
// })

// describe('deleting a note',()=>{
//   test('a note can be deleted', async () => {
//   const notesAtStart = await helper.notesInDb()
//   const noteToDelete = notesAtStart[0]

//   await api
//     .delete(`/api/notes/${noteToDelete.id}`)
//     .expect(204)

//   const notesAtEnd = await helper.notesInDb()

//   const contents = notesAtEnd.map(n => n.content)
//   assert(!contents.includes(noteToDelete.content))

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
// })
// })

 describe('adding users',()=>{
   beforeEach(async()=>{
     await User.deleteMany({})
     const passwordHash=await bcrypt.hash('Parmar',10)
     const user=new User({username:'Kuldeep',passwordHash})
     await user.save()
   })
   

   test('creation succeeds with a fresh username',async()=>{
      const usersatStart= await helper.usersIndb()

      const newUser={
        username:'Bamotriya',
        name:'Niranjan Bamotriya',
        password:'unemployed'
      }

      await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type',/application\/json/)

      const usersatEnd= await helper.usersIndb()
      assert.strictEqual(usersatEnd.length,usersatStart.length+1)
      
    const usernames = usersatEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
   })

   test('adding same user throws error',async()=>{
    const usersAtStart = await helper.usersIndb()

    const newUser = {
      username: 'Kuldeep',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersIndb()
    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
   })
  })


after(async () => {
  await mongoose.connection.close()
})