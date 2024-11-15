import { Alert, Box, Button } from "@mui/material";

export function ActionAlerts({alert, setAlert}) {
    return (
        <Box spacing={2}>
            <Alert
                severity={alert.type}>
                {alert.message}
            </Alert>
        </Box>
    );
}