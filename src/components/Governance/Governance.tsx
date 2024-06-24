import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Governance = () => {
    const data = [
        { title: 'COMP Remaining', value: '0', linkText: 'VIEW' },
        { title: 'Votes Delegated', value: '0' },
        { title: 'Voting Addresses', value: '0' }
    ];

    const proposals = [
        { title: '[Gauntlet] Optimism USDC Risk Recommendations - 06-17-24', status: 'Review', time: '1 day, 6 hrs until voting' },
        { title: 'Initialize cWETHv3 on Arbitrum', status: 'Active', time: '11 hrs, 24 mins left' },
        { title: 'Initialize cUSDTv3 on Optimism', status: 'Passed', time: 'Queued June 19th, 2024' }
    ];

    return (
        <>
            <Container maxWidth="lg"             sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }}>
                <Box mt={4}>
                    <Grid container spacing={4} direction={'column'}>
                        <Typography align="left">Governance Overview</Typography>
                        <Grid container spacing={2}>
                            {data.map((item, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1E1E1E', color: '#FFF' }}>
                                        <Typography variant="h6" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h4" gutterBottom>
                                            {item.value}
                                        </Typography>
                                        {item.linkText && (
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="body2" style={{ color: '#66BB6A' }}>
                                                    <Link to='/governance/comp'>{item.linkText}</Link>
                                                </Typography>
                                                <Box width="100%" ml={1}>
                                                    <Box
                                                        bgcolor="#66BB6A"
                                                        height={4}
                                                        width="50%"
                                                        borderRadius={2}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h6">Recent Proposals</Typography>
                                {proposals.map((proposal, index) => (
                                    <Link to={`/governance/proposals/${index}`} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
                                        <Box my={2}>
                                            <Typography variant="subtitle1">{proposal.title}</Typography>
                                            <Typography variant="body2" color="textSecondary">{proposal.status} • {proposal.time}</Typography>
                                            <Box display="flex" justifyContent="space-between" mt={1}>
                                                <Typography variant="body2">For 100%</Typography>
                                                <Typography variant="body2">Against 0%</Typography>
                                                <Typography variant="body2">Abstain 0%</Typography>
                                            </Box>
                                        </Box>
                                    </Link>
                                ))}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default Governance;