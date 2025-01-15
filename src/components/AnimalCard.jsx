import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import cachorro1 from '../assets/cachorro1.png';
import cachorro2 from '../assets/cachorro2.jpg';

// import cachorro3 from '../assets/cachorro3.png';
// import cachorro4 from '../assets/cachorro4.png';
// import cachorro5 from '../assets/cachorro5.png';
// import cachorro6 from '../assets/cachorro6.png';



function ActionAreaCard({descricao, onClick}) {
    const { nome, raca, sexo, foto, localizacao } = descricao;
    const [fotoBase64, setFotoBase64] = React.useState('');

    React.useEffect(() => {
        setFotoBase64(foto.toString('base64'))
    }, [foto])

    const cidade = localizacao?.cidade
    const estado = localizacao?.estado

    return (
        <Card onClick={onClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    src={`data:image/jpeg;base64,${fotoBase64}`}
                    height="140"
                    alt="Foto do animal"
                />
                <CardContent>
                    <div className='flex flex-row'>
                        <Typography gutterBottom variant="h5" component="div">
                            {nome}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {raca}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {sexo}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {cidade}, {estado}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ActionAreaCard;