
import * as React from 'react';
import { Box, Button, Checkbox, Switch, Tab, Tabs } from '@mui/material';


// Dialogs
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
    type: String,
  }

function EnableMarketDialog(props: EnableMarketsProps) {


    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(false);
    const handleClickOpen = (event: React.ChangeEvent) => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (newValue: boolean) => {
      setValue(newValue);
    };

    // Activites to update based on the market type

    switch(props.type) {
      case "sx": 
        //  update the 
        break;
      case "usdc":
        
      break;
    }

    
  
    return (
      <React.Fragment>

        <Switch color='primary' checked={value} onChange={(event) => {handleClickOpen(event)}} /> 

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

            <p>
                Enable your {props.type} market here
            </p>
            
            <Button>
              Enable Markets
            </Button>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );

}

export default EnableMarketDialog