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

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/Store";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface confirmTransactionProps {
  open: boolean;
  onClose: () => void;
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
              {" "}
              Confirm Transaction{" "}
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
              Confirm the Transaction.
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ConfirmTransactionDialog;