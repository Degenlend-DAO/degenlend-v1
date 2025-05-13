import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

// Token Information
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import { Box, Divider, IconButton, Tab, Typography } from "@mui/material";
import BorrowDetails from "../widgets/borrow/borrowDetails";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import RepayDetails from "../widgets/repay/repayDetails";
import EnableWarning from "../widgets/enableWarning";

// Action Items
import {
  updateUSDCBalance,
  updateUSDCBorrowBalance,

  updateUSDCBorrowRate,
} from "../../../features/dashboard/USDCMarketSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../../app/Store";
import { Transition } from "../../../utils/Transition";
import BorrowMarketsHeader from "../widgets/borrow/borrowMarketsHeader";
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from "../../../features/dashboard/BorrowLimitSlice";

interface BorrowMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function USDCBorrowMarketDialog(props: BorrowMarketDialogProps) {
  const [value, setValue] = React.useState("0");
  const dispatch = useDispatch<AppDispatch>();

  const isUSDCEnabled = useSelector(
    (state: RootState) => state.usdc.isEnabled
  );

  const usdcBorrowAPY = useSelector(
    (state: RootState) => state.usdc.borrowRate
  );

  const usdcBorrowBalance = useSelector(
    (state: RootState) => state.usdc.borrowBalance
  );

  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil     = useSelector(selectBorrowUtil) * 100;   // 0‑1
  const riskColour     = useSelector(selectRiskColour);   // 'safe' | 'warning' | 'danger'

  // When the dialog is opened, update information
  useEffect(() => {
    dispatch(updateUSDCBorrowBalance());
    dispatch(updateUSDCBorrowRate());

  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
          <div style={{ textAlign: "center" }}>
            <Box
              component="img"
              src={usdcTokenLogo}
              alt={"USDC Logo"}
              sx={{ height: 25, width: 30 }}
            ></Box>
            <Typography>{props.title}</Typography>
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
          <TabContext value={value}>
            {/* Header Details above the tab list */}

            <TabPanel value="0">
              <BorrowMarketsHeader type={"usdc"} input={true}/>
            </TabPanel>
            <TabPanel value="1">
              <BorrowMarketsHeader type={"usdc"} />
            </TabPanel>

            <Box sx={{ width: "100%", typography: "body1" }}>

              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  centered
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {" "}
                  <Tab label="Borrow" value="0" />
                  <Tab label="Repay" value="1" />
                </TabList>
              </Box>

              <TabPanel value="0">
                <BorrowDetails
                  type={"usdc"}
                  borrowAPY={usdcBorrowAPY}
                  borrowBalance={usdcBorrowBalance}
                  borrowLimit={borrowLimitUsd}
                  borrowLimitUsed={borrowUtil}
                />
              </TabPanel>
              <TabPanel value="1">
                <RepayDetails
                  type={"usdc"}
                  borrowAPY={usdcBorrowAPY}
                  borrowBalance={usdcBorrowBalance}
                  isRepayingEnabled={isUSDCEnabled}
                />
              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default USDCBorrowMarketDialog;
