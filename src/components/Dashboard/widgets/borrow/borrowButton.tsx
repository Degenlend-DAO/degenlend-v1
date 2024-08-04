import { Box, Button, Stack, Typography } from "@mui/material";


interface BorrowButtonProps {
    type: String,
    BorrowBalance: number,
}

function BorrowButton(props: BorrowButtonProps) {

    const { type, BorrowBalance } = props


    let buttonText = ""

    if (BorrowBalance === 0 || BorrowBalance === undefined )
    {
        buttonText = "No Balance to Borrow!"
    }

    if (BorrowBalance > 0)
    {
        buttonText = `Borrow ${BorrowBalance} ${type.toUpperCase()} tokens`
    }

    function handleChange() {
        alert('You pressed the Borrow button!');
    }

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        <Button size="large" onClick={handleChange} variant="contained">{buttonText}</Button>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> Currently Borrowing </Typography>
            {/* Borrow Balance in that unit of currency */}
            <Typography>{BorrowBalance} {type.toUpperCase()}</Typography>
        </Stack>
        
        </Box>
    );
}

export default BorrowButton;