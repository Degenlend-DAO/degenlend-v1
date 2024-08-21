import {Box, Divider, Stack, Typography} from "@mui/material"


interface BorrowLimitProps {
    type: String,
    borrowLimit: number,
    borrowLimitUsed: number,
}

function BorrowLimit(props: BorrowLimitProps) {

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center", textAlign: "center", padding: "3%"}}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="body1" sx={{fontWeight: 'bold'}}>Borrow Limit</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">Borrow Limit</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${props.borrowLimit.toFixed(2)}</Typography>

            </Stack>
            <Divider sx={{}} />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">Borrow Limit Used</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{props.borrowLimitUsed.toFixed(2)}%</Typography>

            </Stack>

        </Box>
    );
}

export default BorrowLimit