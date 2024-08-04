
import { Box, FormControl, FormHelperText, Input, InputAdornment, OutlinedInput, Stack } from "@mui/material";

interface DetailsProps {
    type: String,
}


function USDCBorrowDetails(props: DetailsProps) {

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        <Stack direction="column" alignItems={"center"} justifyContent={"space-between"}>

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Input
            id="standard-adornment-amount"
            endAdornment={<InputAdornment position="end">{props.type}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>

        </Stack>
      </Box>
    );
}

export default USDCBorrowDetails;