import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';


const Input = React.forwardRef(function CustomInput(props, ref) {
   return (
      <BaseInput
         slots={{
            root: RootDiv,
            input: 'input',
            textarea: TextareaElement,
         }}
         {...props}
         ref={ref}
      />
   );
});

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled('textarea', {
   shouldForwardProp: (prop) =>
      !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
   ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
      };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
const blue = {
   100: '#DAECFF',
   200: '#80BFFF',
   400: '#3399FF',
   500: '#007FFF',
   600: '#0072E5',
   700: '#0059B2',
};

const grey = {
   50: '#F3F6F9',
   100: '#E5EAF2',
   200: '#DAE2ED',
   300: '#C7D0DD',
   400: '#B0B8C4',
   500: '#9DA8B7',
   600: '#6B7A90',
   700: '#434D5B',
   800: '#303740',
   900: '#1C2025',
}
function CreateArea(props) {
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [titleError, setTitleError] = useState('');

   function submitNote(event) {
      event.preventDefault();

      if (!title.trim()) {
         setTitleError('Title cannot be empty');
         return;
      }

      const note = {
         title,
         content
      };
      props.onAdd(note);
      setTitle('');
      setContent('');
      setTitleError('');
   }

   return (
      <div className='formDiv'>
         <form>
            <TextField
               required
               id="outlined-basic"
               label="Title"
               variant="outlined"
               onChange={(event) => {
                  setTitle(event.target.value);
                  if (event.target.value.trim()) {
                     setTitleError('');
                  }
               }}
               value={title}
               error={Boolean(titleError)}
               helperText={titleError}
               InputProps={{
                  style: {
                     backgroundColor: 'white'
                  }
               }}
            />
            <Input aria-label="Demo input"
               multiline
               placeholder="Type something…"
               value={content}
               onChange={(event) => setContent(event.target.value)}
            />
            <Button variant="contained" onClick={submitNote}>Add</Button>
         </form>
      </div>
   );
}

export default CreateArea;
