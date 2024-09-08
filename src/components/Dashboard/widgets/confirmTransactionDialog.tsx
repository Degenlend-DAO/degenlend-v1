import * as React from "react";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";

import NotInterestedIcon from '@mui/icons-material/NotInterested';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/Store";
import { Transition } from "../../../utils/Transition";
import { pink, red } from "@mui/material/colors";

interface confirmTransactionProps {
  open: boolean;
  onClose: () => void;
}

let state = 'success'; // State can be 'pendng' | 'rejected' | 'success'
let ConfirmTransactionHeaderText = `Confirm Transaction`;
let ConfirmIcon = <CircularProgress />;
let ConfirmTransactionDialogText = `Confirm the Transaction.`;

switch (state) {
  case 'pending':
    ConfirmTransactionHeaderText = `Confirm Transaction`;
    ConfirmIcon = <CircularProgress />;
    ConfirmTransactionDialogText = `Confirming the Transaction.`;
    break;
  
    case 'rejected':
      ConfirmTransactionHeaderText = `Transaction Rejected!`;
      ConfirmIcon = <NotInterestedIcon fontSize="large" sx={{ color: pink[500] }} />
      ConfirmTransactionDialogText = `The action not completed, transaction was rejected.`;
    break;

    case 'success':
      ConfirmTransactionHeaderText = `Transaction Confirmed!`;
      ConfirmIcon = <CheckCircleOutlineIcon fontSize="large" color="success" />
      ConfirmTransactionDialogText = `You have successfully completed the transaction`;
    break;

  default:
     ConfirmTransactionHeaderText = `Confirm Transaction`;
     ConfirmIcon = <CircularProgress />;
     ConfirmTransactionDialogText = `Confirming the Transaction.`;
    break;
}

function ConfirmTransactionDialog(props: confirmTransactionProps) {
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
          <Box sx={{ textAlign: "center", alignContent: "center" }}>
            {ConfirmIcon}
            
            <DialogContentText sx={{ color: "text.secondary" }}>
              {ConfirmTransactionDialogText}
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ConfirmTransactionDialog;