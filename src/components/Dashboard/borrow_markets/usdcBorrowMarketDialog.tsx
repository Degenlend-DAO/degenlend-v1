import * as React from 'react';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// Token Information
import usdcTokenLogo from '../../../assets/img/usdc_coin_token.png'
import { Box, Tab } from '@mui/material';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  interface BorrowMarketDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
  }


function USDCBorrowMarketDialog(props: BorrowMarketDialogProps) {

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
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
<Box component="img" src={usdcTokenLogo} alt={"USDC Logo"} sx={{ height: 25, width: 30}}></Box>
<a> {props.title} </a>
</div>
            </DialogTitle>
          <DialogContent>
          <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
            centered
            variant="fullWidth"
            onChange={handleChange} aria-label="lab API tabs example">            <Tab label="Borrow" value="1" />
            <Tab label="Repay" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Borrow</TabPanel>
        <TabPanel value="2">Repay</TabPanel>
      </TabContext>
    </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}

export default USDCBorrowMarketDialog;