import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';


function Note(props) {
   const [isEditOpen, setIsEditOpen] = useState(false);
   const [editedTitle, setEditedTitle] = useState(props.title);
   const [editedContent, setEditedContent] = useState(props.content);

   function handleClick() {
      props.onDelete(props.id);
   }

   function handlePinClick() {
      props.onPin(props.id);
   }

   function handleEditClick() {
      setIsEditOpen(true);
   }

   function handleEditSave() {
      props.onEdit(props.id, editedTitle, editedContent);
      setIsEditOpen(false); 
   }

   function handleEditCancel() {
      setEditedTitle(props.title);
      setEditedContent(props.content);
      setIsEditOpen(false);
   }

   const pinTitle = props.isPinned ? 'Unpin' : 'Pin';

   return (
      <div className="note" style={{ backgroundColor: props.isPinned ? 'yellow' : 'white' }}>
         <h1>{props.title}</h1>
         <p>{props.content}</p>
         <Tooltip title={pinTitle}>
            <IconButton aria-label="pin" color='primary' onClick={(e) => { e.stopPropagation(); handlePinClick(); }}>
               <PushPinIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Delete">
            <IconButton aria-label="delete" color='error' onClick={(e) => { e.stopPropagation(); handleClick(); }}>
               <DeleteIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title="Edit">
            <IconButton aria-label="edit" color="secondary" onClick={(e) => { e.stopPropagation(); handleEditClick(); }}>
               <EditIcon />
            </IconButton>
         </Tooltip>
         <Dialog open={isEditOpen} onClose={handleEditCancel}>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Edit the title and content of your note.
               </DialogContentText>
               <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  fullWidth
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
               />
               <TextField
                  margin="dense"
                  label="Content"
                  fullWidth
                  multiline
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleEditCancel} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleEditSave} color="primary">
                  Save
               </Button>
            </DialogActions>
            </Dialog>
      </div>
   );
}

export default Note;
