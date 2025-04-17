import React, { useState } from 'react';
import { Fab, Zoom } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = async (event) => {
    console.log(event)
    event.preventDefault();
    // if (!event.target.value) {
    //   alert('Please enter a note title')
    // }
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Access token not found.');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/notes/note/',
        {
          title: note.title,
          description: note.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setNote({ title: '', content: '' }); // Clear fields
      props.onNoteCreated(); // Refresh notes
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div>
      <form className="create-note" onSubmit={(e) => submitNote(e)}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />

        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
