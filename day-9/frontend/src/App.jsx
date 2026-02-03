import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setnotes] = useState([])

  function fetchNotes() {
    axios.get("https://backend-2-uola.onrender.com/api/notes")
      .then((res) => {
        setnotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [editId, seteditId] = useState(null)
  const [editDesc, seteditDesc] = useState('')


  function submitHandler(e) {
    e.preventDefault()

    const { title, description } = e.target.elements


    axios.post("https://backend-2-uola.onrender.com/api/note",
      {
        title: title.value,
        description: description.value
      }
    ).then(res => {
      console.log(res.data);
      fetchNotes()
    })

    settitle('')
    setdescription('')
  }

  function deleteHandler(id) {

    axios.delete(`https://backend-2-uola.onrender.com/api/note/${id}`)
      .then(res => {
        console.log(res.data);
        fetchNotes()
      })

  }

  function saveUpdate(id) {

    axios.patch(`https://backend-2-uola.onrender.com/api/note/${id}`,{
      description:editDesc
    })
      .then(() => {
        fetchNotes()
        seteditId(null)
        seteditDesc('')
      })
  }

  return (
    <div>
      <div className="notes">
        <span className='create-note'>
          <h1>Note</h1>
          <form className='note-form' onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input type="text" name='title' placeholder='enter a title' value={title} required
              onChange={(e) => {
                settitle(e.target.value)
              }} />
            <input type="text" name='description' placeholder='enter a description' value={description} required
              onChange={(e) => {
                setdescription(e.target.value)
              }}
            />
            <input type="submit" value="Submit" className='button' />
          </form>
        </span>
        <div className='note-section'>
  {notes.map(note => (
    <div className='note' key={note._id}>
      <h1>{note.title}</h1>

      {editId === note._id ? (
        <>
          <input
            type="text"
            value={editDesc}
            onChange={(e) => seteditDesc(e.target.value)}
          />

          <button onClick={() => saveUpdate(note._id)}>save</button>
          <button onClick={() => seteditId(null)}>cancel</button>
        </>
      ) : (
        <>
          <p>{note.description}</p>
          <button
            onClick={() => {
              seteditId(note._id)
              seteditDesc(note.description)
            }}
          >
            edit
          </button>
          <button onClick={() => deleteHandler(note._id)}>delete</button>
        </>
      )}
    </div>
  ))}
</div>

      </div>
    </div>
  )
}

export default App