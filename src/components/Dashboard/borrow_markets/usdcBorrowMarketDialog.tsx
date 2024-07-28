import * as React from 'react';
import Button from '@mui/material/Button';


// Dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// Token Information
import usdcTokenLogo from '../../assets/img/usdc_coin_token.png'
import { Box } from '@mui/material';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



function USDCBorrowMarketDialog() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
    }
    
    function CustomTabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
      );
    }

    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    
  
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
<Box component="img" src={usdcTokenLogo} alt={"USDC Logo"} sx={{ height: 25, width: 30}}></Box>
<a> USDC Token</a>
</div>
            </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}

export default USDCBorrowMarketDialog;