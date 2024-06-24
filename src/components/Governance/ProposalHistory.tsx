import { Box, Button, Typography } from '@mui/material';

const ProposalHistory = () => {
    return (
        <Box sx={{ padding: 2, borderRadius: 1 }}>
            <Button variant="contained" color="success" size="small">Review</Button>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                June 22nd, 2024 – 3:27pm
            </Typography>
        </Box>
    );
};

export default ProposalHistory;