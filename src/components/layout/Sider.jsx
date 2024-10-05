import { Box, Grid2 } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const Sider = ({disabled}) => {
    const items = [
        {icon: <AddCircleOutlineIcon sx={{color:"#170D1F"}}/>, label: "Publicar", path: "/"},
        {icon: <ChatIcon sx={{color:"#170D1F"}}/>, label: "Publicar", path: "/"},
        {icon: <AccountBoxIcon sx={{color:"#170D1F"}}/>, label: "Publicar", path: "/"},
        {icon: <LogoutIcon sx={{color:"#170D1F"}}/>, label: "Publicar", path: "/"},

    ]
    return (
        <Grid2>
            <Box>

            </Box>
        </Grid2>
    )
}
export default Sider;