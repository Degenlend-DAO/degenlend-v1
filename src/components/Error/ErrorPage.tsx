import { Box, Typography } from '@mui/material';

const ErrorPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#1A1A1A',
                color: 'white',
                padding: 4
            }}
        >
            <Typography variant="h3" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1">
                Sorry, the page you are looking for does not exist.
            </Typography>
        </Box>
    );
};

export default ErrorPage;