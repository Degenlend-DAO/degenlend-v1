import { Box, Button, Stack, Typography } from "@mui/material";


interface WithdrawButtonProps {
    type: String,
    supplyBalance: number,
}

function WithdrawButton(props: WithdrawButtonProps) {

    const { type, supplyBalance } = props


    let buttonText = ""

    if (supplyBalance === 0 || supplyBalance === undefined )
    {
        buttonText = "No Balance to Withdraw!"
    }

    if (supplyBalance > 0)
    {
        buttonText = `Withdraw ${supplyBalance} ${type.toUpperCase()} tokens`
    }

    function handleChange() {
        alert('You pressed the withdraw button!');
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button onClick={handleChange} variant="contained">{buttonText}</Button>

        <Stack direction={"row"} alignContent={"flex-start"}>
            <Typography> Currently Supplying </Typography>
            {/* Supply Balance in that unit of currency */}
            <Typography>{supplyBalance} {type.toUpperCase()}</Typography>
        </Stack>
        
        </Box>
    );
}

export default WithdrawButton;