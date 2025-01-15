import { Box } from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Sider = ({ disabled, setDisabled }) => {
    const navigate = useNavigate();


    const items = [
        { icon: <HomeIcon sx={{ color: "#170D1F" }} />, label: "Home", path: "/home" },
        { icon: <AddCircleOutlineIcon sx={{ color: "#170D1F" }} />, label: "Publicar", path: "/cadastrar-animal" },
        { icon: <ChatIcon sx={{ color: "#170D1F" }} />, label: "Chat", path: "/chat" },
        { icon: <AccountBoxIcon sx={{ color: "#170D1F" }} />, label: "Perfil", path: "/perfil" },
        { icon: <LogoutIcon sx={{ color: "#170D1F" }} />, label: "Sair", path: "/" },
    ];

    return (
        <Grid2
            container
            sx={{
                width: {
                    xs: disabled ? '0px' : '200px',
                    sm: disabled ? '50px' : '200px',
                },
                backgroundColor: '#ffffff',
                transition: 'width 0.3s ease',
                flexGrow: 1,
                borderRight: '1px solid #f0f0f0',
                height: '100%',
                display: { xs: disabled ? 'none' : 'flex', sm: 'flex' },
                flexDirection: 'column',
                position: 'fixed',
                alignItems: 'center',
                margin: 0,
                padding: 0,
            }}
        >
            {items && items.map((item, index) => (
                <Box
                    key={index}
                    onClick={() => {
                        {/*caso a tela seja pequena, fecha o sider. Caso contrário, permanece a forma escolhida pelo usuário*/ }
                        setDisabled(prev => { return (window.innerWidth < 768 ? true : prev) })
                        if (item.label === 'Sair') {
                            localStorage.setItem('token', '');
                        }
                        navigate(item.path)
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        paddingY: '10px',
                        color: '#170D1F',
                        ":hover": {
                            backgroundColor: "#e0e0e0"
                        },
                        width: '100%',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <Box sx={{ paddingLeft: '10px' }}>{item.icon}</Box>
                    {!disabled && <Box sx={{ paddingLeft: '10px' }} hov>{item.label}</Box>}
                </Box>
            ))}
        </Grid2>
    );
};

export default Sider;
