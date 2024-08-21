import { Box, FormControl, Input, InputAdornment, Stack } from "@mui/material";

interface DetailsProps {
    type: String,
}

function SXBorrowDetails(props:DetailsProps) {

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>

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

export default SXBorrowDetails;