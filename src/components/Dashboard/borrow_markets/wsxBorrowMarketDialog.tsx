import * as React from "react";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// Token Information
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import SXBorrowDetails from "../widgets/wsxBorrow";
import BorrowDetails from "../widgets/borrow/borrowDetails";

// Action Items
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import RepayDetails from "../widgets/repay/repayDetails";
import EnableWarning from "../widgets/enableWarning";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BorrowMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function WSXBorrowMarketDialog(props: BorrowMarketDialogProps) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const wsxBorrowAPY = useSelector((state: RootState) => state.wsx.borrowRate);
  const wsxWalletBalance = useSelector(
    (state: RootState) => state.wsx.walletBalance
  );

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
            <Box
              component="img"
              src={sxTokenLogo}
              alt={"Wrapped SX Logo"}
              sx={{ height: 25, width: 30 }}
            ></Box>
            <Typography>{props.title}</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <TabContext value={value}>
            {/* Details above the tab list */}
            
            <TabPanel value="0">
              <SXBorrowDetails type={"sx"} />
            </TabPanel>
            
            <TabPanel value="1">
              <EnableWarning type={"sx"} />
            </TabPanel>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ borderBottom: 1, bBorroworderColor: "divider" }}>
                <TabList
                  centered
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Borrow" value="0" />
                  <Tab label="Repay" value="1" />
                </TabList>
              </Box>
              <TabPanel value="0">
                
                <BorrowDetails type={"SX"} borrowAPY={wsxBorrowAPY} borrowBalance={wsxWalletBalance} borrowLimit={0} borrowLimitUsed={0} />

              </TabPanel>
              <TabPanel value="1">
                
                <RepayDetails type={"SX"} borrowAPY={wsxBorrowAPY} borrowBalance={0} />

              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default WSXBorrowMarketDialog;
