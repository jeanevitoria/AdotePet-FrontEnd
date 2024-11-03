import { Alert, Stack, Button } from "@mui/material";

export function ActionAlerts(alert, setAlert) {
    return (
        <Stack sx={{ width: { xs: '80%', md: '60%', lg: '50%' }, margin: 'auto', alignItems:'center' }} spacing={2}>
            <Alert
                severity={alert.type}
                action={
                    alert.type == 'success' && (
                        <Button color="inherit" size="small" onClick={() => navigate('/auth/login')}>
                            Fazer login
                        </Button>)
                }
                onClose={() => { setAlert({ type: 'none' }) }}>
                {alert.message}
            </Alert>
        </Stack>
    );
}