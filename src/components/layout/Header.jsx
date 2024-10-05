import { Grid2 } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.png';

const Header = ({ items }) => {
    return (
        <Grid2>
            <Box sx={{ height: '50px', backgroundColor: '#170D1F', display: 'flex', alignItems: 'center', position: 'relative' }}>
                {/* Box centralizado para a logo */}
                <Box sx={{ 
                    position: 'absolute', 
                    left: '50%', 
                    transform: 'translateX(-50%)',  // Centraliza horizontalmente
                    height: '100px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    <img src={logo} alt="Logo do AdotePet" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </Box>

                {/* Box para os itens à direita */}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingX: '10px', flexGrow: 1, position: 'relative'}}>
                    {items.map((item, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'row', paddingRight:'5px', alignItems: 'center' }}>
                                {item}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Grid2>
    );
}

export default Header;
