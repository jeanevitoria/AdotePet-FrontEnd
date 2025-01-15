import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ChatDialog = ({ alertVisible, setAlertVisible }) => {
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
                    {"Acesso negado"}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    Você precisa de uma conta na AdotePet para acessar o Chat. <br/>
                    Crie uma nova conta ou faça login!
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { navigate(`/auth/cadastro`) }}>Cadastro</Button>
                    <Button onClick={() => { navigate(`/auth/login`) }} autoFocus>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ChatDialog;
