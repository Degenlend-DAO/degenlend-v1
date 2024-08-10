import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";
import { AppDispatch } from "../../../../app/Store";
import { useDispatch } from "react-redux";
import { withdrawWSX } from "../../../../features/dashboard/WSXMarketSlice";
import { withdrawUSDC } from "../../../../features/dashboard/USDCMarketSlice";

interface WithdrawButtonProps {
    type: String,
    supplyBalance: number,
}

function WithdrawButton(props: WithdrawButtonProps) {

    const { type, supplyBalance } = props

    const dispatch = useDispatch<AppDispatch>();

    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);


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

        if (type === "sx")
            {
                dispatch(withdrawWSX());
            }
        if (type === "usdc")
            {
                dispatch(withdrawUSDC());
            }

        setConfirmTransactionOpen(true);

    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button size="large" onClick={handleChange} variant="contained">{buttonText}</Button>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> Currently Supplying </Typography>
            {/* Supply Balance in that unit of currency */}
            <Typography>{supplyBalance} {type.toUpperCase()}</Typography>
        </Stack>
        
        <ConfirmTransactionDialog open={confirmTransactionOpen} onClose={() => { setConfirmTransactionOpen (false)}} />


        </Box>
    );
}

export default WithdrawButton;