import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import { borrowUSDC } from "../../../../features/dashboard/USDCMarketSlice";
import { borrowWSX } from "../../../../features/dashboard/WSXMarketSlice";

interface BorrowButtonProps {
    type: String,
    BorrowBalance: number,
}

function BorrowButton(props: BorrowButtonProps) {

    const { type, BorrowBalance } = props

    // const [isDisabled, setIsDisabled] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const amount = useSelector((state: RootState) => state.account.amount);


    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

    let buttonText = "No Balance to Borrow!"

    let BorrowButton = <Button disabled size="large" onClick={borrowAssets} variant="contained">{buttonText}</Button>


    if (BorrowBalance > 0)
    {
        buttonText = `Borrow ${BorrowBalance} ${type.toUpperCase()} tokens`
    }

    if (amount > 0 ) 
    {
        BorrowButton = (
            <Button size="large" onClick={borrowAssets} variant="contained">{buttonText}</Button>
        );
    }

    function borrowAssets() {
        switch (type) {
            case "sx":
                dispatch(borrowWSX(amount));
                break;

            case "usdc":
                dispatch(borrowUSDC());
                break;
        }
        setConfirmTransactionOpen(true);
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        {BorrowButton}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> Currently Borrowing </Typography>
            {/* Borrow Balance in that unit of currency */}
            <Typography>{BorrowBalance} {type.toUpperCase()}</Typography>
        </Stack>

        <ConfirmTransactionDialog open={confirmTransactionOpen} onClose={() => { setConfirmTransactionOpen (false)}} />
        
        </Box>
    );
}

export default BorrowButton;