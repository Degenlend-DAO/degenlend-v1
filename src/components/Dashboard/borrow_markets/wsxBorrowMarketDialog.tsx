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
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import { Box, Divider, IconButton, Tab, Typography } from "@mui/material";
import BorrowDetails from "../widgets/borrow/borrowDetails";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import RepayDetails from "../widgets/repay/repayDetails";
import {
  updateWSXBorrowBalance,
  updateWSXBorrowRate,
} from "../../../features/dashboard/WSXMarketSlice";
import { useEffect } from "react";
import { Transition } from "../../../utils/Transition";
import BorrowMarketsHeader from "../widgets/borrow/borrowMarketsHeader";
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from "../../../features/dashboard/BorrowLimitSlice";

interface BorrowMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function WSXBorrowMarketDialog(props: BorrowMarketDialogProps) {
  const [value, setValue] = React.useState("0");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Views

  const isWSXEnabled = useSelector((state: RootState) => state.wsx.isEnabled);

  const wsxBorrowBalance = useSelector(
    (state: RootState) => state.wsx.borrowBalance
  );
  const wsxBorrowAPY = useSelector(
    (state: RootState) => state.wsx.borrowRate
  );
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil     = useSelector(selectBorrowUtil);   // 0‑1
  const riskColour     = useSelector(selectRiskColour);   // 'safe' | 'warning' | 'danger'

  // Action Items

  useEffect(() => {
    // On load of market dialog, refresh the values of all the 'views' variables

  });

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
              <BorrowMarketsHeader type={"sx"} input={true} />
            </TabPanel>

            <TabPanel value="1">
              <BorrowMarketsHeader type={"sx"} input={false} />
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
                <BorrowDetails
                  type={"sx"}
                  borrowAPY={wsxBorrowAPY}
                  borrowBalance={wsxBorrowBalance}
                  borrowLimit={borrowLimitUsd}
                  borrowLimitUsed={borrowUtil}
                />
              </TabPanel>
              <TabPanel value="1">
                <RepayDetails
                  type={"sx"}
                  borrowAPY={wsxBorrowAPY}
                  borrowBalance={wsxBorrowBalance}
                  isRepayingEnabled={isWSXEnabled}
                />
              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default WSXBorrowMarketDialog;
