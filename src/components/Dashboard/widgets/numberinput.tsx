import * as React from "react";
import { Box, Stack, TextField } from "@mui/material";
import { NumericFormatCustom } from "../../../utils/NumberFormatCustom";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../app/Store'
import { updateAmount } from "../../../features/dashboard/AccountSlice";

interface NumberInputProps {
  type: string;
}

function NumberInput(props: NumberInputProps) {

  const { type } = props;

  const dispatch = useDispatch<AppDispatch>();


  const [values, setValues] = React.useState({
    numberformat: '00.0000',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    // Update the 'numeric amount' basiced
    console.log(`[Console] updateAmount is going to be updated with this value: ${event.target.value as unknown as number}`);
    dispatch(updateAmount(event.target.value as unknown as number));

    
  };


  return (
    <Box
      sx={{
        width: "100%",
        height: "40%",
        alignItems: "center",
        textAlign: "center",
        padding: "3%",
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
      <TextField
        sx={{
          width: "100%",
          heigh: "40%",
        }}
        label={`Enter an amount of ${type} tokens`}
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="numberic-value-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
      </Stack>
    </Box>
  );
}

export default NumberInput;