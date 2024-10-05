import { Box } from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Sider = ({ disabled }) => {
    const navigate = useNavigate();
 

    const items = [
        { icon: <AddCircleOutlineIcon sx={{ color: "#170D1F" }} />, label: "Publicar", path: "/" },
        { icon: <ChatIcon sx={{ color: "#170D1F" }} />, label: "Chat", path: "/chat" },
        { icon: <AccountBoxIcon sx={{ color: "#170D1F" }} />, label: "Conta", path: "/account" },
        { icon: <LogoutIcon sx={{ color: "#170D1F" }} />, label: "Logout", path: "/logout" },
    ];

    return (
        <Grid2
            container
            sx={{
                width: {
                    xs: disabled ? '0' : '100%',
                    md: disabled ? '125px' : '650px',
                },
                transition: 'width 0.3s ease',
                flexGrow: 1,
                borderRight: '1px solid #f0f0f0',
                height: 'screen', 
                display: {xs: disabled ? 'none' : 'flex', md: 'flex'},
                flexDirection: 'column',
                alignItems: 'flex-start',
                        margin: 0, // Adicione isso para remover margens
        padding: 0 // Adicione isso para remover paddings
            }}
        >
            {items && items.map((item, index) => (
                <Box
                    key={index}
                    onClick={() => navigate(item.path)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        paddingY:'10px',
                        color: '#170D1F',
                        ":hover": {
                            backgroundColor: "#e0e0e0"
                        },
                        width: '100%',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <Box sx={{paddingLeft:'10px'}}>{item.icon}</Box>
                    {!disabled && <Box sx={{ marginLeft: '10px' }}>{item.label}</Box>}
                </Box>
            ))}
        </Grid2>
    );
};

export default Sider;
