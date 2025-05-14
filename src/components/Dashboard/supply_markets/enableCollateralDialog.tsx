import * as React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";

import DialogTitle from "@mui/material/DialogTitle";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";

import {
  enterUSDCMarket,
  enterWSXMarket,
  exitWSXMarket,
  exitUSDCMarket,
} from "../../../features/dashboard/AccountSlice";
import { useState, useEffect } from "react";
import ConfirmTransactionDialog from "../widgets/confirmTransactionDialog";
import { Transition } from "../../../utils/Transition";
import { resetTx } from "../../../features/dashboard/transactionSlice";

interface EnableMarketsProps {
  open: boolean;
  onClose: () => void;
  title: string;
  type: "sx" | "usdc";
  borrowLimit: number;
  borrowLimitUsed: number;
}

function EnableMarketDialog(props: EnableMarketsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { onClose, type, open } = props;

  const [isCollateralTextHeader, setIsCollateralTextHeader] = React.useState(`Enable ${props.title} as Collateral`);
  const [isCollateralTextButtonTitle, setIsCollateralTextButtonTitle] = React.useState(`Add ${props.title} as Collateral`);

  const isUSDCCollateral = useSelector(
    (state: RootState) => state.usdc.isCollateral
  );

  const isWSXCollateral = useSelector(
    (state: RootState) => state.wsx.isCollateral
  );

  const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

  const handleClick = () => {
    setConfirmTransactionOpen(true);
    
    if (type === "sx") {
      // If wsx is already listed as collateral, exit the market
      if (isWSXCollateral) {
        dispatch(resetTx());
        dispatch(exitWSXMarket());
      } else {
        dispatch(resetTx());
        dispatch(enterWSXMarket());
      }
    }

    if (type === "usdc") {
      // If USDC is already listed as collateral, exit the market
      if (isUSDCCollateral) {
        dispatch(resetTx());
        dispatch(exitUSDCMarket());
      } else {
        dispatch(resetTx());
        dispatch(enterUSDCMarket());
      }
    }

    onClose();
  };

  useEffect(() => {
    if (type === "usdc") {
      // If USDC is already listed as collateral, exit the market
      if (isUSDCCollateral) {
        setIsCollateralTextHeader(`Remove ${props.title} as Collateral`);
        setIsCollateralTextButtonTitle(`Remove ${props.title} as Collateral`);
      }
    }

    if (type === "sx") {
      // If wsx is already listed as collateral, exit the market
      if (isWSXCollateral) {
        setIsCollateralTextHeader(`Remove ${props.title} as Collateral`);
        setIsCollateralTextButtonTitle(`Remove ${props.title} as Collateral`);
      }
    }
  });

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div style={{ textAlign: "center" }}>
            <Box component="span" sx={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              {isCollateralTextHeader}{" "}
            </Box>
          </div>
          <IconButton
            aria-label="close"
            onClick={props.onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Divider></Divider>
        </DialogTitle>
        <DialogContent>
          {/* Warning Label */}
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <DialogContentText sx={{ color: "text.secondary" }}>
              Each asset used as collateral increases your borrowing limit. Be
              careful, this can subject the asset to being seized in
              liquidation.{" "}
              <a
                href="#learn-more"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Learn more
              </a>
              .
            </DialogContentText>
          </Box>

          {/* Borrow Limit Content */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="body2">Borrow Limit</Typography>
            <Typography variant="body2">$0.00 → $0</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="body2">Borrow Limit Used</Typography>
            <Typography variant="body2">0% → 0%</Typography>
          </Box>
          {/* Enable Button */}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, fontWeight: "bold", paddingY: 1.5 }}
            onClick={handleClick} // Clicking the button
            aria-label="button to toggle collateral"
          >
            {isCollateralTextButtonTitle}
          </Button>
        </DialogContent>
      </Dialog>

      <ConfirmTransactionDialog
        open={confirmTransactionOpen}
        onClose={() => {
          setConfirmTransactionOpen(false);
        }}
      />
    </React.Fragment>
  );
}

export default EnableMarketDialog;

// TODO:
