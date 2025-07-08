import * as React from "react";
import { 
  Box, 
  CircularProgress, 
  Divider, 
  IconButton, 
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
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
import { useSelector } from "react-redux";
import { Transition } from "../../../utils/Transition";
import { RootState } from "../../../app/Store";

interface ConfirmTransactionProps {
  open: boolean;
  onClose: () => void;
}

function ConfirmTransactionDialog(props: ConfirmTransactionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Fetch transaction state from Redux store
  const transactionState = useSelector((state: RootState) => state.transactions.phase);

  let headerText = "Confirm Transaction";
  let IconComponent = <CircularProgress size={60} />;
  let dialogText = "Please confirm the transaction.";
  let iconColor = theme.palette.primary.main;

  // Update the dialog based on transaction state from Redux
  switch (transactionState) {
    case "pending":
      headerText = "Processing Transaction";
      IconComponent = <CircularProgress size={60} sx={{ color: green[500] }} />;
      dialogText = "Your transaction is being processed...";
      break;

    case "rejected":
      headerText = "Transaction Rejected";
      IconComponent = <CancelRounded sx={{ fontSize: 60, color: pink[500] }} />;
      dialogText = "You have rejected the transaction.";
      break;

    case "error":
      headerText = "Transaction Failed";
      IconComponent = <NotInterestedIcon sx={{ fontSize: 60, color: red[500] }} />;
      dialogText = "The transaction failed. Please try again.";
      break;

    case "success":
      headerText = "Transaction Successful";
      IconComponent = <CheckCircleOutlineIcon sx={{ fontSize: 60, color: green[500] }} />;
      dialogText = "Your transaction was successful!";
      break;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.96), rgba(245, 245, 245, 0.96))'
            : 'linear-gradient(to bottom, rgba(30, 30, 30, 0.98), rgba(20, 20, 20, 0.98))',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${theme.palette.divider}`,
        }
      }}
    >
      <DialogTitle sx={{ 
        position: 'relative',
        textAlign: 'center',
        pt: 4,
        pb: 2,
      }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {headerText}
        </Typography>
        
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ 
        px: isMobile ? 2 : 4,
        pt: 3,
        pb: isMobile ? 3 : 4,
        textAlign: 'center'
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          py: 2
        }}>
          {IconComponent}
          <DialogContentText 
            sx={{ 
              color: 'text.secondary',
              fontSize: isMobile ? '1rem' : '1.125rem',
              maxWidth: '80%',
              mx: 'auto'
            }}
          >
            {dialogText}
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmTransactionDialog;