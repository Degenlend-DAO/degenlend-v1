import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";
import { AppDispatch } from "../../../../app/Store";
import { useDispatch } from "react-redux";
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


    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

    let buttonText = "No Balance to Borrow!"

    if (BorrowBalance > 0)
    {
        buttonText = `Borrow ${BorrowBalance} ${type.toUpperCase()} tokens`
    }

    function borrowAssets() {
        switch (type) {
            case "sx":
                dispatch(borrowWSX());
                break;

            case "usdc":
                dispatch(borrowUSDC());
                break;
        }
        setConfirmTransactionOpen(true);
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button disabled size="large" onClick={borrowAssets} variant="contained">{buttonText}</Button>

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