import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";

interface SupplyButtonProps {
    type: String,
    supplyBalance: number,
}

function SupplyButton(props: SupplyButtonProps) {

    const { type, supplyBalance } = props

    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);



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
        setConfirmTransactionOpen(true);
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button size="large" onClick={handleChange} variant="contained">{buttonText}</Button>

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