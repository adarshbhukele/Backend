import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
)

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
)

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
)

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

const App = () => {
  const [notes, setnotes] = useState([])
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [editId, seteditId] = useState(null)
  const [editDesc, seteditDesc] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const API_BASE_URL = "https://backend-2-uola.onrender.com/api"

  function fetchNotes() {
    axios.get(`${API_BASE_URL}/notes`)
      .then((res) => {
        setnotes(res.data.notes || [])
      })
      .catch(err => console.error("Error fetching notes:", err))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function submitHandler(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return;
    setIsSubmitting(true)
    axios.post(`${API_BASE_URL}/note`, {
      title: title.trim(),
      description: description.trim()
    }).then(res => {
      fetchNotes()
      settitle('')
      setdescription('')
    }).catch(err => console.error("Error adding note:", err))
      .finally(() => setIsSubmitting(false))
  }

  function deleteHandler(id) {
    axios.delete(`${API_BASE_URL}/note/${id}`)
      .then(() => {
        fetchNotes()
      })
      .catch(err => console.error("Error deleting note:", err))
  }

  function saveUpdate(id) {
    if (!editDesc.trim()) return;
    axios.patch(`${API_BASE_URL}/note/${id}`, {
      description: editDesc.trim()
    })
      .then(() => {
        fetchNotes()
        seteditId(null)
        seteditDesc('')
      })
      .catch(err => console.error("Error updating note:", err))
  }

  return (
    <div className="app-container">
      <div className="glass-morphism header-container">
        <h1>Minimal Notes</h1>
        <p>Your ideas, beautifully captured</p>
      </div>

      <div className="main-content">
        <div className="form-container glass-morphism">
          <h2>Create Note</h2>
          <form className='note-form' onSubmit={submitHandler}>
            <div className="input-group">
              <input
                type="text"
                name='title'
                placeholder='Enter a Note Title'
                value={title}
                required
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="input-group">
              <textarea
                name='description'
                placeholder='Enter a note description'
                value={description}
                required
                rows={3}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <button type="submit" className='btn-primary' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Note'}
            </button>
          </form>
        </div>

        <div className='notes-grid'>
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Start writing something amazing!</p>
            </div>
          ) : (
            notes.map(note => (
              <div className='card glass-morphism' key={note._id}>
                <h3>{note.title}</h3>

                {editId === note._id ? (
                  <div className="edit-mode">
                    <textarea
                      className="edit-textarea"
                      value={editDesc}
                      rows={4}
                      onChange={(e) => seteditDesc(e.target.value)}
                    />
                    <div className="card-actions">
                      <button className="btn-icon btn-success" onClick={() => saveUpdate(note._id)} title="Save">
                        <SaveIcon />
                      </button>
                      <button className="btn-icon btn-cancel" onClick={() => seteditId(null)} title="Cancel">
                        <CancelIcon />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="note-desc">{note.description}</p>
                    <div className="card-actions">
                      <button className="btn-icon btn-edit" title="Edit"
                        onClick={() => {
                          seteditId(note._id)
                          seteditDesc(note.description)
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button className="btn-icon btn-delete" title="Delete" onClick={() => deleteHandler(note._id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="footer">
        <p>Modern Notes App &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default App