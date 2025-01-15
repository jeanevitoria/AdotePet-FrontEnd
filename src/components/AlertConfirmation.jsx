import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { DialogContent } from '@mui/material';
import { deletarPublicacao } from '../services/userService';
import { Alert } from '@mui/material';

export default function AlertConfirmation({alertVisible, setAlertVisible, idAnimal}) {
  const navigate = useNavigate();
  const [resultAlert, setResultAlert] = useState({status: false, title: "", message: ""})
  const [confirmationAlert, setConfirmationAlert] = useState(alertVisible)

  const handleClose = () => {
    setAlertVisible(false);
  };

  const handleDelete = async () => {
    console.log(idAnimal)
    const response = await deletarPublicacao(idAnimal); 
    if (response.status == 200){
        setConfirmationAlert(false)
        setResultAlert({status: true, title: "Sucesso", message: "A publicação foi deletada corretamente."})
    } else {
        setConfirmationAlert(false)
        setResultAlert({status: true, title: "Falha", message: "Não foi possível excluir a publicação. Tente novamente."})
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={confirmationAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Excluir publicação"}
        </DialogTitle>
        <DialogContent>
          Você deseja excluir essa publicação? <br/> Ao confirmar, a exclusão não poderá ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={resultAlert.status}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {resultAlert.title}
        </DialogTitle>
        <DialogContent>
            {resultAlert.message}
        </DialogContent>
        <DialogActions>
        <Button onClick={() => navigate('/home')}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
