import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";
import { AppDispatch } from "../../../../app/Store";
import { useDispatch } from "react-redux";
import { supplyWSX } from "../../../../features/dashboard/WSXMarketSlice";
import { supplyUSDC } from "../../../../features/dashboard/USDCMarketSlice";

interface SupplyButtonProps {
    type: String,
    supplyBalance: number,
}

function SupplyButton(props: SupplyButtonProps) {

    const { type, supplyBalance } = props

    const dispatch = useDispatch<AppDispatch>();


    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

    let SupplyButton: JSX.Element = <Button disabled ></Button>;

    switch(type) {
        case "sx" : 

        break;

        case "usdc": 
        
        
        break;
    }

    let buttonText = ""

    if (supplyBalance === 0 || supplyBalance === undefined )
    {
        buttonText = "No Balance to Supply!"
    }

    if (supplyBalance > 0)
    {
        buttonText = `Supply ${supplyBalance} ${type.toUpperCase()} tokens`
    }

    function handleChange() {
        alert('You pressed the Supply button!');

        if (type === "sx")
            {
                dispatch(supplyWSX());
            }
        if (type === "usdc")
            {
                dispatch(supplyUSDC());
            }

        setConfirmTransactionOpen(true);
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button disabled size="large" onClick={handleChange} variant="contained">{buttonText}</Button>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> Wallet Balance </Typography>
            {/* Supply Balance in that unit of currency */}
            <Typography variant="body2">{supplyBalance} {type.toUpperCase()}</Typography>
        </Stack>
        
        <ConfirmTransactionDialog open={confirmTransactionOpen} onClose={() => { setConfirmTransactionOpen (false)}} />

        </Box>
    );
}

export default SupplyButton;