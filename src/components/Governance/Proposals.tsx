import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { time } from "console";
import { useParams } from "react-router-dom";
import ProposalDetails from "./ProposalDetails";
import ProposalHistory from "./ProposalHistory";

const Proposals = () => {
    const { index } = useParams();
    return (
        <>
            <Container maxWidth="lg" sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Button variant="outlined" size="small" disabled aria-label="button to review proposals">Review</Button>
                    <Typography variant="body2" color="textPrimary">
                        {index}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        • Time Left Remaining: 1 Hour 31 Minutes
                    </Typography>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <ProposalDetails />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ProposalHistory />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default Proposals;