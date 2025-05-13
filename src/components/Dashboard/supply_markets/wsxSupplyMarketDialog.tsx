import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// Token Information
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import { Box, Divider, IconButton, Tab, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WithdrawDetails from "../widgets/withdraw/withdrawDetails";
import SupplyDetails from "../widgets/supply/supplyDetails";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import { useEffect } from "react";
import { Transition } from "../../../utils/Transition";
import SupplyMarketsHeader from "../widgets/supply/supplyMarketsHeader";
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from "../../../features/dashboard/BorrowLimitSlice";

interface SupplyMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function WSXSupplyMarketDialog(props: SupplyMarketDialogProps) {
  const [value, setValue] = React.useState("0");
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  // Views

  const isWSXTokenEnabled: boolean = useSelector((state: RootState) => state.wsx.isEnabled);

  const wsxWalletBalance = useSelector((state: RootState) => state.wsx.balance);
  const wsxSupplyBalance = useSelector(
    (state: RootState) => state.wsx.supplyBalance
  );
  const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);


  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil     = useSelector(selectBorrowUtil) * 100;   // 0‑1
  const riskColour     = useSelector(selectRiskColour);   // 'safe' | 'warning' | 'danger'

  useEffect( () => {
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
        <DialogTitle style={{ padding: "5%" }}>
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
            <TabPanel value="0">
              {/* Supply Tab */}
              <SupplyMarketsHeader type={"sx"} isInput={isWSXTokenEnabled} />
            </TabPanel>

            <TabPanel value="1">
              {/* Withdraw Tab */}
            <SupplyMarketsHeader type={"sx"} isInput={true} />
            </TabPanel>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  centered
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Supply" value="0" />
                  <Tab label="Withdraw" value="1" />
                </TabList>
              </Box>
              <TabPanel value="0">
                <SupplyDetails
                  type={"sx"}
                  supplyAPY={wsxSupplyAPY}
                  supplyBalance={wsxWalletBalance}
                  isSupplyingEnabled={isWSXTokenEnabled}
                />
              </TabPanel>
              <TabPanel value="1">
                <WithdrawDetails
                  type={"sx"}
                  supplyAPY={wsxSupplyAPY}
                  supplyBalance={wsxSupplyBalance}
                  borrowLimit={borrowLimitUsd}
                  borrowLimitUsed={borrowUtil}
                />
              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default WSXSupplyMarketDialog;
