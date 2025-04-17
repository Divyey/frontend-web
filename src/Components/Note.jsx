import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
//import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedContent, setUpdatedContent] = useState(props.content);

  // Handle delete
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  // Handle edit
  function handleEditClick() {
    setIsEditing(true);
  }

  // Handle content change during edit
  function handleContentChange(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setUpdatedTitle(value);
    } else {
      setUpdatedContent(value);
    }
  }

  // Submit the updated note
  function handleUpdateClick() {
    const updatedNote = {
      title: updatedTitle,
      description: updatedContent,
    };
    props.onUpdate(props.id, updatedNote); // Trigger update from the parent
    setIsEditing(false); // Exit editing mode
  }

  // Cancel editing
  function handleCancelEdit() {
    setUpdatedTitle(props.title);
    setUpdatedContent(props.content);
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={updatedTitle}
            onChange={handleContentChange}
            placeholder="Update title"
          />
          <textarea
            name="content"
            value={updatedContent}
            onChange={handleContentChange}
            placeholder="Update content"
          />
          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
