import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import { approveWSX, isWSXEnabled, supplyWSX } from "../../../../features/dashboard/WSXMarketSlice";
import { approveUSDC, isUSDCEnabled, supplyUSDC } from "../../../../features/dashboard/USDCMarketSlice";

interface SupplyButtonProps {
    type: String,
    supplyBalance: number,
    isEnabled: boolean,
}

function SupplyButton(props: SupplyButtonProps) {

    const { type, supplyBalance, isEnabled } = props

    const dispatch = useDispatch<AppDispatch>();

    const amount = useSelector(
        (state: RootState) => state.account.amount
    );


    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

    switch(type) {
        case "sx" : 

        break;

        case "usdc": 

        break;
    }

    let buttonText = ""

    if (amount === 0 || supplyBalance === undefined )
        {
            buttonText = "No Balance to Supply!"
        }
    
        if (amount > 0)
        {
            buttonText = `Supply ${amount} ${type.toUpperCase()} tokens`
        }

    let SupplyButton: JSX.Element = <Button disabled size="large" variant="contained">{buttonText}</Button>;

    if (isEnabled === true )
    {
        SupplyButton = <Button size="large" onClick={supplyAssets} variant="contained"></Button>
    }

    if (isEnabled === false && supplyBalance > 0 )
    {
        buttonText = `Enable ${type} Token`
        SupplyButton = <Button size="large" variant="contained" onClick={enableAssets}>{buttonText}</Button>
    }


    function supplyAssets() {
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

    function enableAssets() {
        if (type === "sx" )
            {
                dispatch(approveWSX());
                
            }
        if (type === "usdc" )
            {
                dispatch(approveUSDC());
            }

            setConfirmTransactionOpen(true);

    }

    useEffect(() => {
        dispatch(isWSXEnabled());
        dispatch(isUSDCEnabled());
    });


    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        {SupplyButton}

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
