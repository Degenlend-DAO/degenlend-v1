import * as React from "react";
import { Box, CircularProgress, Divider, IconButton } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelRounded from "@mui/icons-material/CancelRounded";
import CloseIcon from "@mui/icons-material/Close";
import { pink, red, green } from "@mui/material/colors";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Transition } from "../../../utils/Transition";
import { RootState } from "../../../app/Store"; // RootState from your Redux store

interface ConfirmTransactionProps {
  open: boolean;
  onClose: () => void;
}

function ConfirmTransactionDialog(props: ConfirmTransactionProps) {
  // Fetch transaction state from Redux store
  const transactionState = useSelector((state: RootState) => state.transactions.status);

  let ConfirmTransactionHeaderText = `Confirm Transaction`;
  let ConfirmIcon = <CircularProgress />;
  let ConfirmTransactionDialogText = `Please confirm the transaction.`;

  // Update the dialog based on transaction state from Redux
  switch (transactionState) {
    case "pending":
      ConfirmTransactionHeaderText = `Processing Transaction`;
      ConfirmIcon = <CircularProgress sx={{ color: green[500], fontSize: 40 }} />;
      ConfirmTransactionDialogText = `Your transaction is being processed...`;
      break;

      case "rejected":  // New state for rejected transactions
      ConfirmTransactionHeaderText = `Transaction Rejected`;
      ConfirmIcon = <CancelRounded fontSize="large" sx={{ color: pink[500], fontSize: 60 }} />;
      ConfirmTransactionDialogText = `You have rejected the transaction.`;
      break;

    case "failed":
      ConfirmTransactionHeaderText = `Transaction Failed`;
      ConfirmIcon = (
        <NotInterestedIcon fontSize="large" sx={{ color: red[500], fontSize: 60 }} />
      );
      ConfirmTransactionDialogText = `The transaction failed. Please try again.`;
      break;

    case "success":
      ConfirmTransactionHeaderText = `Transaction Successful`;
      ConfirmIcon = (
        <CheckCircleOutlineIcon fontSize="large" sx={{ color: green[500], fontSize: 60 }} />
      );
      ConfirmTransactionDialogText = `Your transaction was successful!`;
      break;

    default:
      ConfirmTransactionHeaderText = `Confirm Transaction`;
      ConfirmIcon = <CircularProgress />;
      ConfirmTransactionDialogText = `Please confirm the transaction.`;
      break;
  }

  return (
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
            {ConfirmTransactionHeaderText}
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
        <Box sx={{ textAlign: "center", alignContent: "center", mt: 2 }}>
          {ConfirmIcon}
          <DialogContentText sx={{ color: "text.secondary", mt: 2 }}>
            {ConfirmTransactionDialogText}
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmTransactionDialog;
