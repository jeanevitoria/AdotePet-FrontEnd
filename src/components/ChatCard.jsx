import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Grid2, Paper, Stack, Typography } from "@mui/material";

const chatCard = ({ nome, mensagem, selected, onClick }) => {

    return (
        <Paper onClick={onClick} sx={{ width: '80%', cursor: 'pointer', padding: '4%', backgroundColor: selected ? '#6c5f76' : '#ffffff', color: selected ? '#ffffff' : '#000000' }}>
            <Stack direction="row" spacing={2}>
                <Box sx={{ justifyContent: 'center' }}>
                    <Avatar>{nome[0]}</Avatar>
                </Box>
                <Stack spacing={1} overflow={'hidden'}>
                    <Typography sx={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>{nome}</Typography>
                    <Typography sx={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>{mensagem}</Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}
export default chatCard;