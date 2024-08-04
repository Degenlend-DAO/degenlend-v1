import {Box, Divider, Stack, Typography} from "@mui/material"


interface BorrowLimitProps {
    type: String,
    borrowLimit: String,
    borrowLimitUsed: String,
}

function BorrowLimit(props: BorrowLimitProps) {

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center", textAlign: "center", padding: "3%"}}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="body1" sx={{fontWeight: 'bold'}}>Borrow Limit</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems="center" justifyContent="space-between">

                <Stack direction="row" alignItems="center" spacing={1}>
                    
                </Stack>

            </Stack>

        </Box>
    );
}

export default BorrowLimit