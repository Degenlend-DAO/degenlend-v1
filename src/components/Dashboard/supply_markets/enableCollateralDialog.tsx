
import * as React from 'react';
import { Box, Button, Divider, IconButton, Switch, Tab, Tabs, Typography } from '@mui/material';


// Dialogs
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from "@mui/icons-material/Close";

import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../../app/Store';

import { enterUSDCMarket, enterWSXMarket, exitWSXMarket, exitUSDCMarket } from '../../../features/dashboard/AccountSlice';
import { useState } from 'react';
import ConfirmTransactionDialog from '../widgets/confirmTransactionDialog';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  interface EnableMarketsProps {
    open: boolean;
    onClose: () => void;
    title: string;
    type: 'sx' | 'usdc';
  }

function EnableMarketDialog(props: EnableMarketsProps) {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const { onClose, type, open } = props;

    
    const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);


    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //   setValue(newValue);
    // };
  
    const handleClick = () => {
      if (type === "sx")
      {
        dispatch(enterWSXMarket());
      }

      if (type === "usdc")
      {
        dispatch(enterUSDCMarket());
      }
      setConfirmTransactionOpen(true);

      onClose();
    }
  
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
    <div style={{ textAlign: 'center'}}>
    <Box component="span" sx={{ fontSize: 20, fontWeight: 'bold' }}> Enable {props.title} as Collateral</Box>
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
            <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            Each asset used as collateral increases your borrowing limit. Be careful, this can subject the asset to being seized in liquidation.{' '}
            <a href="#learn-more" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Learn more
            </a>.
          </DialogContentText>
        </Box>

          {/* Borrow Limit Content */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, marginBottom: 2 }}>
          <Typography variant="body2">Borrow Limit</Typography>
          <Typography variant="body2">$0.00 → $0</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="body2">Borrow Limit Used</Typography>
          <Typography variant="body2">0% → 0%</Typography>
        </Box>
          {/* Enable Button */}

          <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, fontWeight: 'bold', paddingY: 1.5 }}
          onClick={handleClick} // Clicking the button 
          aria-label="button to toggle collateral"
        >
          Use {props.title} as Collateral
        </Button>

          </DialogContent>
        </Dialog>

        <ConfirmTransactionDialog open={confirmTransactionOpen} onClose={() => { setConfirmTransactionOpen (false)}} />

      </React.Fragment>
    );

}

export default EnableMarketDialog