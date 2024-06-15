import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Note from './components/Note';
import CreateArea from './components/CreateArea';

function App() {
  const [notes, setNotes] = useState([]);


  function addNote(newNote) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      const firstUnpinnedNoteIndex = updatedNotes.findIndex(note => !note.isPinned);
      if (firstUnpinnedNoteIndex === -1) {
        return [...updatedNotes, newNote];
      } else {
        return [
          ...updatedNotes.slice(0, firstUnpinnedNoteIndex),
          newNote,
          ...updatedNotes.slice(firstUnpinnedNoteIndex)
        ];
      }
    });
  }


  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function pinNote(id) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      const noteToPin = updatedNotes.splice(id, 1)[0];
      noteToPin.isPinned = !noteToPin.isPinned;
      if (noteToPin.isPinned) {
        return [noteToPin, ...updatedNotes];
      } else {
        const firstUnpinnedNoteIndex = updatedNotes.findIndex(note => !note.isPinned);
        if (firstUnpinnedNoteIndex === -1) {
          return [...updatedNotes, noteToPin];
        } else {
          return [
            ...updatedNotes.slice(0, firstUnpinnedNoteIndex),
            noteToPin,
            ...updatedNotes.slice(firstUnpinnedNoteIndex)
          ];
        }
      }
    });
  }

  function editNote(id, newTitle, newContent) {
    setNotes(prevNotes => {
      return prevNotes.map((note, index) => {
        if (index === id) {
          return { ...note, title: newTitle, content: newContent };
        }
        return note;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className='body-div'>
      {notes.map((noteItem, index) => (

        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          isPinned={noteItem.isPinned}
          onDelete={deleteNote}
          onPin={pinNote}
          onEdit={editNote}
          />
          ))}
        </div>
    </div>
  );
}

export default App;
