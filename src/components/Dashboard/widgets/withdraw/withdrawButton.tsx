import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import { withdrawWSX } from "../../../../features/dashboard/WSXMarketSlice";
import { withdrawUSDC } from "../../../../features/dashboard/USDCMarketSlice";
import { handleTransaction } from "../../../../features/dashboard/transactionSlice";

interface WithdrawButtonProps {
    type: String,
    supplyBalance: number,
}

function WithdrawButton(props: WithdrawButtonProps) {

    const { type, supplyBalance } = props

    const dispatch = useDispatch<AppDispatch>();

    const amount = useSelector((state: RootState) => state.account.amount);

    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);


    let buttonText = "No Balance to Withdraw!"

    let WithdrawButton = <Button disabled size="large" onClick={withdrawAssets} variant="contained">{buttonText}</Button>;

    if (supplyBalance > 0)
    {
        buttonText = `Withdraw ${amount} ${type.toUpperCase()} tokens`
    }

    if (amount > 0)
    {
        WithdrawButton = (
            <Button size="large" onClick={withdrawAssets} variant="contained">{buttonText}</Button>
          );
    }

    function withdrawAssets() {
        switch (type) {
        case "sx":
            dispatch(handleTransaction(() => withdrawWSX()));
            break;

        case "usdc":
            dispatch(handleTransaction(() => withdrawUSDC()));
            break;                                              
        }

        setConfirmTransactionOpen(true);
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        {WithdrawButton}

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