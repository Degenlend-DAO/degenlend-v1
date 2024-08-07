import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';

const Vote = () => {
    return (
        <Container maxWidth="lg"             sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
        }} >
            <Box mt={4}>
                <Grid container spacing={4} direction={'column'}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} style={{ padding: '20px', textAlign: 'left' }}>
                            <Typography variant="h5">Votes</Typography>
                            <Typography variant="h3" color="primary">0.0000</Typography>
                        </Paper>
                    </Grid>
                    <Container maxWidth="lg">
                        <Box mt={4}>
                            <Grid container spacing={4} direction="row">
                                <Grid item xs={12} sm={6}>
                                    <Paper elevation={3} style={{ padding: '20px' }}>
                                        <Typography variant="h6">Active Proposals</Typography>
                                        <Box my={2}>
                                            <Typography variant="subtitle1">[Gauntlet] Optimism USDC Risk Recommendations - 06-17-24</Typography>
                                            <Typography variant="body2" color="textSecondary">Review • 1 day, 6 hrs until voting</Typography>
                                            <Box display="flex" justifyContent="space-between" mt={1}>
                                                <Typography variant="body2">For 100%</Typography>
                                                <Typography variant="body2">Against 0%</Typography>
                                                <Typography variant="body2">Abstain 0%</Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                                        <Typography variant="h6">COMP Balance</Typography>
                                        <Typography variant="h4" color="primary">0.00</Typography>
                                        <Typography variant="body2" style={{ margin: '20px 0' }}>
                                            You can either vote on each proposal yourself or delegate your votes to a third party. Compound Governance puts you in charge of the future of Compound. Learn more.
                                        </Typography>
                                        <Button variant="contained" color="primary" aria-label="button to connect wallet">Connect Wallet to Get Started</Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Grid>
            </Box>
        </Container>
    );
}

export default Vote;