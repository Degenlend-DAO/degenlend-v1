
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
                            <Switch checked={open} onChange={handleChange} />

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
    <div style={{ textAlign: 'center'}}>
    <Box component="a" sx={{ height: 25, width: 30}}> Enable Collateral</Box>
          </div>
          </DialogTitle>
          <DialogContent>

      

          </DialogContent>
        </Dialog>
      </React.Fragment>
    );

}

export default EnableMarketDialog