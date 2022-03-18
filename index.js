const express=require('express')
const app=express()
const cors=require('cors')
app.use(express.json());
app.use(cors())
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]


app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')


})

app.get('/api/notes',(req,res)=>{
    res.send(notes);
})

app.get('/api/notes/:id',(req,res)=>{
    const id=( req.params.id)
 // const id=2
    const note=notes.find(note=>note.id==id)
    console.log(note);
    if(note)
    {
        res.json(note);
    }
    else
    {
        res.status(404).end('Not Found')
    }
})

app.delete('/api/notes/:id',(req,res)=>{
    const id=Number(req.params.id)
    notes=notes.filter(note=>note.id!==id)
    res.send(notes)
})

const generateId=()=>
{
    const maxId=notes.length===0?0:
    Math.max(...notes.map(note=>note.id))
    return maxId+1
}
app.post('/api/notes/',(req,res)=>{
    const body=req.body
    console.log("Is there any request")
    if(!body.content)
    {
        console.log('gadbad')
        const x=res.status(400).end('Content Missing')
        return x
    }
    console.log('gadbad nhi pkdi')
    const noteObj={
        "id":generateId(),
        "content":body.content,
        "date":new Date,
        "important":body.important || false
    }

    console.log(noteObj)
    notes=notes.concat(noteObj)
   // res.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.listen(PORT,()=>{
    console.log(`Greatest website is running on  port ${PORT}`)
})