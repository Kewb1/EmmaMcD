import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const MaterialModal = ({ isOpen, onClose, title, children }) => {
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Delay showing the modal by 1 second
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 800 );
      
      return () => clearTimeout(timer);
    } else {
      // Immediately hide when isOpen becomes false
      setShouldShow(false);
    }
  }, [isOpen]);
  
  return (
    <Dialog
      open={shouldShow}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={false}
      PaperProps={{
        sx: {
          width: 'auto',
          maxWidth: 'calc(100vw - 30vh)', // Ensure modal doesn't exceed viewport with padding
          maxHeight: 'calc(100vh - 20vh)', // Ensure modal doesn't exceed viewport with padding
          borderRadius: '4vh',
          bgcolor: "rgb(27, 27, 27)",
          boxShadow: 'inset 0 0 0 1vh transparent',
          background: `
            linear-gradient(rgb(27, 27, 27), rgb(27, 27, 27)) padding-box,
            linear-gradient(45deg, rgb(33, 243, 208) 30%, #22ff47 90%) border-box
          `,
          border: '1vh solid transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }
      }}
    >
      <div style={{ padding: '5vh' }}>
        <DialogTitle id="alert-dialog-title" sx={{ padding: 0, marginBottom: '5vh' }}>
          <h1 style={{ 
            fontSize: "9vh", 
            margin: "0px", 
            background: 'linear-gradient(45deg,rgb(33, 243, 208) 30%,#22ff47 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
          }}>
            {title}
          </h1>
        </DialogTitle>
        
        <DialogContent sx={{ padding: 0 }}>
          <DialogContentText id="alert-dialog-description" sx={{ margin: 0 }}>
            {children}
          </DialogContentText>
        </DialogContent>
        <div style={{ marginTop : "4vh" , textAlign : "center", color: " #555555"}}>Click off the modal to exit</div>
        {/*<DialogActions>
          <Button onClick={onClose} color="primary">
            <h1 style={{
              margin: "0px", 
              background: 'linear-gradient(45deg,rgb(33, 243, 208) 30%,#22ff47 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              x
            </h1>
          </Button>
        </DialogActions>*/}
      </div>
    </Dialog>
  );
};

export default MaterialModal;