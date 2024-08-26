import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";
import { AppDispatch } from "../../../../app/Store";
import { useDispatch } from "react-redux";
import { repayWSX } from "../../../../features/dashboard/WSXMarketSlice";
import { repayUSDC } from "../../../../features/dashboard/USDCMarketSlice";

interface RepayButtonProps {
    type: String,
    borrowBalance: number,
}

function RepayButton(props: RepayButtonProps) {

    const { type, borrowBalance } = props

    const dispatch = useDispatch<AppDispatch>();


    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);



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

        if (type === "sx")
            {
                dispatch(repayWSX());
            }
        if (type === "usdc")
            {
                dispatch(repayUSDC());
            }

        setConfirmTransactionOpen(true);

    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button disabled size="large" onClick={handleChange} variant="contained">{buttonText}</Button>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> Currently Supplying </Typography>
            {/* Supply Balance in that unit of currency */}
            <Typography>{borrowBalance} {type.toUpperCase()}</Typography>
        </Stack>

        <ConfirmTransactionDialog open={confirmTransactionOpen} onClose={() => { setConfirmTransactionOpen (false)}} />

        
        </Box>
    );
}

export default RepayButton;