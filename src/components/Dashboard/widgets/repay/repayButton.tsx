import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmTransactionDialog from "../confirmTransactionDialog";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import {
    approveWSX,
    isWSXEnabled,
    repayWSX,
  } from "../../../../features/dashboard/WSXMarketSlice";
  import {
    approveUSDC,
    isUSDCEnabled,
    repayUSDC,
  } from "../../../../features/dashboard/USDCMarketSlice";
import { resetTx } from "../../../../features/dashboard/transactionSlice";

interface RepayButtonProps {
    type: String,
    borrowBalance: number,
    isRepayingEnabled: boolean,
}

function RepayButton(props: RepayButtonProps) {

    const { type, borrowBalance, isRepayingEnabled } = props

    const dispatch = useDispatch<AppDispatch>();

    const amount = useSelector((state: RootState) => state.account.amount);
    
    let buttonText = "No Balance to Repay!" 

    let RepayButton = <Button disabled size="large" onClick={enableAssets} variant="contained">{buttonText}</Button>;

    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

    if (amount > 0  )
    {
        RepayButton = <Button size="large" onClick={repayAssets} variant="contained">{buttonText}</Button>;
    }

    if (borrowBalance > 0)
    {
        buttonText = `Repay ${borrowBalance} ${type.toUpperCase()} tokens`
    }


    // Button Effects

    function repayAssets() {
      setConfirmTransactionOpen(true);

    switch (type) {
      case "sx":
        dispatch(resetTx());
        dispatch(repayWSX(amount));
        break;

      case "usdc":
        dispatch(resetTx());
        dispatch(repayUSDC(amount));
        break;
    }
        
    }

// When called, you 'approve'
  function enableAssets() {
    setConfirmTransactionOpen(true);
    if (type === "sx") {
      dispatch(resetTx());
      dispatch(approveWSX());
    }
    if (type === "usdc") {
      dispatch(resetTx());
      dispatch(approveUSDC());
    }

  }


    useEffect(
        () => {
        dispatch(isWSXEnabled());
        dispatch(isUSDCEnabled());
        }
    );

    return (
        <Box sx={{ width: "100%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        
        {RepayButton}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography> Currently Supplying </Typography>
            {/* Supply Balance in that unit of currency */}
            <Typography>{borrowBalance} {type.toUpperCase()}</Typography>
        </Stack>

        <ConfirmTransactionDialog open={confirmTransactionOpen} onClose={() => { setConfirmTransactionOpen (false)}} />

        
        </Box>
    );
}

export default RepayButton;