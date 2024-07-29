
import * as React from 'react';
import { Box, Switch, Tab, Tabs } from '@mui/material';


// Dialogs
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

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

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: boolean) => {
      setValue(newValue);
    };

    
  
    return (
      <React.Fragment>
        <Dialog
          open={props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.onClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
    <div style={{ textAlign: 'center'}}>
    <Box component="a" sx={{ height: 25, width: 30}}> Enable {props.title} Collateral</Box>
          </div>
          </DialogTitle>
          <DialogContent>

          {props.type === 'sx' ? 'SX Market Details' : 'USDC Market Details'}

          </DialogContent>
        </Dialog>
      </React.Fragment>
    );

}

export default EnableMarketDialog