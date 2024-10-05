import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { AppDispatch } from "../../../app/Store";
import { Transition } from "../../../utils/Transition";

interface confirmTransactionProps {
  open: boolean;
  onClose: () => void;
}

let ConfirmTransactionHeaderText = `Confirm Transaction`;
let ConfirmTransactionDialogText = `Confirm the Transaction.`;

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
              {" "}
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
            <CircularProgress />
            
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