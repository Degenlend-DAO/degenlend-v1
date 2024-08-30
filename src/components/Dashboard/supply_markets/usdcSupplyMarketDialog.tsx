import * as React from "react";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// Token Information
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SupplyDetails from "../widgets/supply/supplyDetails";
import WithdrawDetails from "../widgets/withdraw/withdrawDetails";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import EnableWarning from "../widgets/enableWarning";
import {
  updateSupplyBalance,
  updateUSDCSupplyRate,
  updateUSDCBalance,
} from "../../../features/dashboard/USDCMarketSlice";
import { useEffect } from "react";
import { updateBorrowLimit } from "../../../features/dashboard/AccountSlice";
import { Transition } from "../../../utils/Transition";
import SupplyMarketsHeader from "../widgets/supply/supplyMarketsHeader";

interface SupplyMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function USDCSupplyMarketDialog(props: SupplyMarketDialogProps) {
  const [value, setValue] = React.useState("0");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const usdcSupplyAPY = useSelector(
    (state: RootState) => state.usdc.supplyRate
  );

  const usdcSupplyBalance = useSelector(
    (state: RootState) => state.usdc.supplyBalance
  );
  const usdcWalletBalance = useSelector(
    (state: RootState) => state.usdc.balance
  );

  const borrowLimit = useSelector(
    (state: RootState) => state.account.borrowLimit
  );

  const borrowLimitUsed = useSelector(
    (state: RootState) => state.account.borrowLimitUsed
  );

  useEffect(() => {
    dispatch(updateUSDCBalance());
    dispatch(updateSupplyBalance());
    dispatch(updateUSDCSupplyRate());
    dispatch(updateBorrowLimit());
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
        {/* Top half of the modal */}
        <DialogTitle style={{ padding: "5%" }}>
          <div style={{ textAlign: "center" }}>
            <Box
              component="img"
              src={usdcTokenLogo}
              alt={"USDC Logo"}
              sx={{ height: 25, width: 25, marginRight: 1 }}
            ></Box>
            <Typography> {props.title} Token</Typography>
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

        {/* Bottom Half of the Modal */}
        <DialogContent>
          <TabContext value={value}>
            <TabPanel value="0">
              <SupplyMarketsHeader type={"usdc"} input={false} />
            </TabPanel>

            <TabPanel value="1">
              <SupplyMarketsHeader type={"usdc"} input={true} />
            </TabPanel>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  centered
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="lab API tabs"
                >
                  <Tab label="Supply" value="0" />
                  <Tab label="Withdraw" value="1" />
                </TabList>
              </Box>
              <TabPanel value="0">
                <SupplyDetails
                  type={"usdc"}
                  supplyAPY={usdcSupplyAPY}
                  supplyBalance={usdcWalletBalance}
                  isSupplyingEnabled={undefined}
                />
              </TabPanel>
              <TabPanel value="1">
                <WithdrawDetails
                  type={"usdc"}
                  supplyAPY={usdcSupplyAPY}
                  supplyBalance={usdcSupplyBalance}
                  borrowLimit={borrowLimit}
                  borrowLimitUsed={borrowLimitUsed}
                />
              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default USDCSupplyMarketDialog;
