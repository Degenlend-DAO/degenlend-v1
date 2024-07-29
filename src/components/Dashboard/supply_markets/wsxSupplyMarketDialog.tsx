import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// Dialogs
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// Token Information
import sxTokenLogo from '../../../assets/img/sx_coin_token.png'
import { Box, Button, Tab } from '@mui/material';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  interface SupplyMarketDialogProps {
    onClickOpen: Function,
  }

function WSXSupplyMarketDialog(props: SupplyMarketDialogProps) {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    
  
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
        Supply/Borrow
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
    <div style={{ textAlign: 'center'}}>
    <Box component="img" src={sxTokenLogo} alt={"Wrapped SX Logo"} sx={{ height: 25, width: 30}}></Box>
          <a> WSX Token</a></div>
          </DialogTitle>
          <DialogContent>
          <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Supply" value="1" />
            <Tab label="Withdraw" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Supply</TabPanel>
        <TabPanel value="2">Withdraw</TabPanel>
      </TabContext>
    </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}

export default WSXSupplyMarketDialog;