import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { DialogContent } from '@mui/material';

export default function AlertDialog({alertVisible, setAlertVisible, id_animal}) {
  const navigate = useNavigate();
  const handleClose = () => {
    setAlertVisible(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={alertVisible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Animal cadastrado com sucesso."}
        </DialogTitle>
        <DialogContent>
          O animal está disponível para adoção e você já pode visualizar essa postagem.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={() => { navigate(`/animal/${id_animal}`) }} autoFocus>
            Visualizar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
