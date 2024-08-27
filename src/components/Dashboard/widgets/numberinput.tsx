import * as React from "react";
import { Box, Stack, TextField } from "@mui/material";
import { NumericFormatCustom } from "../../../utils/NumberFormatCustom";


interface NumberInputProps {
  type: string;
}

function NumberInput(props: NumberInputProps) {

  const { type } = props;

  const [values, setValues] = React.useState({
    numberformat: '1320',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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
        label={`This is the ${type} input text field`}
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