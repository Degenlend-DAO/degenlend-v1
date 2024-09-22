import {
  Box,
  Button,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  approveWSX,
  isWSXEnabled,
  supplyWSX,
} from "../../../../features/dashboard/WSXMarketSlice";
import {
  approveUSDC,
  isUSDCEnabled,
  supplyUSDC,
} from "../../../../features/dashboard/USDCMarketSlice";
import { handleTransaction } from "../../../../features/dashboard/transactionSlice";

interface SupplyButtonProps {
  type: String;
  walletBalance: number;
  isEnabled: boolean;
}

function SupplyButton(props: SupplyButtonProps) {
  const { type, walletBalance, isEnabled } = props;

  const dispatch = useDispatch<AppDispatch>();

  const amount = useSelector((state: RootState) => state.account.amount);
  const loading = useSelector((state: RootState) => state.account.loading);

  const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);


  var buttonText: any;
  let SupplyButton: JSX.Element = (
    <Button disabled size="large" variant="contained">
      No Balance to Supply!
    </Button>
  );

  if (amount > 0) {
    buttonText = `Supply ${amount} ${type.toUpperCase()} tokens`;
  }


  if (isEnabled === true  && amount > 0) {
    SupplyButton = (
      <Button size="large" onClick={supplyAssets} variant="contained">{buttonText}</Button>
    );
  }

  if (isEnabled === false && walletBalance > 0) {
    buttonText = `Enable ${type} Token`;
    if (loading === true) {
      buttonText = <CircularProgress />;
    }
    SupplyButton = (
      <Button size="large" variant="contained" onClick={enableAssets}>
        {buttonText}
      </Button>
    );
  }

  // When called, you 'supply'
  function supplyAssets() {
    if (type === "sx") {
      dispatch(handleTransaction(() => supplyWSX(amount)));
    }
    if (type === "usdc") {
      dispatch(handleTransaction(() => supplyUSDC(amount)));
    }

    setConfirmTransactionOpen(true);
  }

  // When called, you 'approve'
  function enableAssets() {
    if (type === "sx") {
      dispatch(handleTransaction(() => approveWSX()));
    }
    if (type === "usdc") {
      dispatch(handleTransaction(() => approveUSDC()));
    }

    setConfirmTransactionOpen(true);
  }

  useEffect(() => {
  });

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        padding: "3%",
      }}
    >
      {SupplyButton}

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography> Wallet Balance </Typography>
        {/* Wallet Balance of that unit of currency */}
        <Typography variant="body2">
          {walletBalance} {type.toUpperCase()}
        </Typography>
      </Stack>

      {/* Confirming The Transaction when its invoked */}
      <ConfirmTransactionDialog
        open={confirmTransactionOpen}
        onClose={() => {
          setConfirmTransactionOpen(false);
        }}
      />
    </Box>
  );
}

export default SupplyButton;
