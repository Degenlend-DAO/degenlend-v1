import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import { borrowUSDC } from "../../../../features/dashboard/USDCMarketSlice";
import { borrowWSX } from "../../../../features/dashboard/WSXMarketSlice";
import { handleTransaction } from "../../../../features/dashboard/transactionSlice";
import { formatNumber } from "../../../../utils/constant";

interface BorrowButtonProps {
  type: String;
  BorrowBalance: number;
}

function BorrowButton(props: BorrowButtonProps) {
  const { type, BorrowBalance } = props;

  // const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const amount = useSelector((state: RootState) => state.account.amount);

  const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

  let buttonText = "No Balance to Borrow!";

  let BorrowButton = (
    <Button disabled size="large" variant="contained">
      {buttonText}
    </Button>
  );

  if (amount > 0) {
    buttonText = `Borrow ${amount} ${type.toUpperCase()} tokens`;
  }

  if (amount > 0) {
    BorrowButton = (
      <Button size="large" onClick={borrowAssets} variant="contained">
        {buttonText}
      </Button>
    );
  }

  function borrowAssets() {
    setConfirmTransactionOpen(true);

    switch (type) {
      case "sx":
        dispatch(handleTransaction(() => dispatch(borrowWSX(amount)).unwrap()));
        break;

      case "usdc":
        dispatch(handleTransaction(() => dispatch(borrowUSDC(amount)).unwrap()));
        break;
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        padding: "3%",
      }}
    >
      {BorrowButton}

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography> Currently Borrowing </Typography>
        {/* Borrow Balance in that unit of currency */}
        <Typography>
          {formatNumber(BorrowBalance)} {type.toUpperCase()}
        </Typography>
      </Stack>

      <ConfirmTransactionDialog
        open={confirmTransactionOpen}
        onClose={() => {
          setConfirmTransactionOpen(false);
        }}
      />
    </Box>
  );
}

export default BorrowButton;
