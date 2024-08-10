import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// Token Information
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import { Box, Divider, IconButton, Tab, Typography } from "@mui/material";
import USDCBorrowDetails from "../widgets/usdcBorrow";
import BorrowDetails from "../widgets/borrow/borrowDetails";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import RepayDetails from "../widgets/repay/repayDetails";
import EnableWarning from "../widgets/enableWarning";

// Action Items
import {
  updateUSDCBalance,
  updateBorrowBalance,
  borrowUSDC,
  repayUSDC,
  updateUSDCBorrowRate,
} from "../../../features/dashboard/USDCMarketSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../../app/Store";
import { updateBorrowLimit } from "../../../features/dashboard/AccountSlice";

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

function USDCBorrowMarketDialog(props: BorrowMarketDialogProps) {
  const [value, setValue] = React.useState("0");
  const dispatch = useDispatch<AppDispatch>();

  const usdcBorrowAPY = useSelector(
    (state: RootState) => state.usdc.borrowRate
  );

  const usdcBorrowBalance = useSelector(
    (state: RootState) => state.usdc.borrowBalance
  );

  const borrowLimit = useSelector(
    (state: RootState) => state.account.borrowLimit
  );

  const borrowLimitUsed = useSelector(
    (state: RootState) => state.account.borrowLimitUsed
  );

  // When the dialog is opened, update information
  useEffect(() => {
    dispatch(updateBorrowBalance());
    dispatch(updateUSDCBorrowRate());
    dispatch(updateBorrowLimit());
    dispatch(updateBorrowLimit());
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
            {/* Details above the tab list */}

            <TabPanel value="0">
              <USDCBorrowDetails type={"USDC"} />
            </TabPanel>
            <TabPanel value="1">
              <EnableWarning type={"usdc"} />
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
                  borrowLimit={borrowLimit}
                  borrowLimitUsed={borrowLimitUsed}
                />
              </TabPanel>
              <TabPanel value="1">
                <RepayDetails
                  type={"usdc"}
                  borrowAPY={usdcBorrowAPY}
                  borrowBalance={usdcBorrowBalance}
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
