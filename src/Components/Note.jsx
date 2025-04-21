import React, { useState, useRef, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedContent, setUpdatedContent] = useState(props.content);
  const textareaRef = useRef(null);

  // Adjust the height of textarea based on content
  useEffect(() => {
    autoResize();
  }, [updatedContent]);

  function autoResize() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset
      textarea.style.height = textarea.scrollHeight + "px"; // Set to scroll height
    }
  }

  function handleTitleChange(event) {
    setUpdatedTitle(event.target.value);
  }

  function handleContentChange(event) {
    setUpdatedContent(event.target.value);
  }

  function handleBlur() {
    const updatedNote = {
      title: updatedTitle,
      description: updatedContent,
    };
    props.onUpdate(props.id, updatedNote);
  }

  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <input
        type="text"
        className="editable-title"
        value={updatedTitle}
        onChange={handleTitleChange}
        onBlur={handleBlur}
        placeholder="Title"
      />
      <textarea
        ref={textareaRef}
        className="editable-content"
        value={updatedContent}
        onChange={handleContentChange}
        onBlur={handleBlur}
        placeholder="Take a note..."
        rows={1}
      />
      <button onClick={handleDeleteClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
