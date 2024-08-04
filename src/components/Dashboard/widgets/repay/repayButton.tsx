import { Box, Button, Stack, Typography } from "@mui/material";


interface RepayButtonProps {
    type: String,
    borrowBalance: number,
}

function RepayButton(props: RepayButtonProps) {

    const { type, borrowBalance } = props


    let buttonText = ""

    if (borrowBalance === 0 || borrowBalance === undefined )
    {
        buttonText = "No Balance to Repay!"
    }

    if (borrowBalance > 0)
    {
        buttonText = `Repay ${borrowBalance} ${type.toUpperCase()} tokens`
    }

    function handleChange() {
        alert('You pressed the Repay button!');
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button onClick={handleChange} variant="contained">{buttonText}</Button>

        <Stack direction={"row"} alignContent={"flex-start"}>
            <Typography> Currently Supplying </Typography>
            {/* Supply Balance in that unit of currency */}
            <Typography>{borrowBalance} {type.toUpperCase()}</Typography>
        </Stack>
        
        </Box>
    );
}

export default RepayButton;