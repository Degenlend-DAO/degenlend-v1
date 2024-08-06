import * as React from "react";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

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

import USDCBorrowDetails from "../widgets/usdcBorrow";
import SupplyDetails from "../widgets/supply/supplyDetails";
import WithdrawDetails from "../widgets/withdraw/withdrawDetails";

// Action Items
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import EnableWarning from "../widgets/enableWarning";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SupplyMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function USDCSupplyMarketDialog(props: SupplyMarketDialogProps) {
  const [value, setValue] = React.useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const usdcSupplyAPY = useSelector(
    (state: RootState) => state.usdc.supplyRate
  );
  const usdcWalletBalance = useSelector(
    (state: RootState) => state.usdc.walletBalance
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
            <EnableWarning type={"usdc"} />
            </TabPanel>

            <TabPanel value="1">
              <USDCBorrowDetails type={"USDC"} />
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

              <SupplyDetails type={"usdc"} supplyAPY={usdcSupplyAPY} supplyBalance={usdcWalletBalance} />

              </TabPanel>
              <TabPanel value="1">

              <WithdrawDetails type={"usdc"} supplyAPY={usdcSupplyAPY} borrowAPY={0} supplyBalance={0} />


              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default USDCSupplyMarketDialog;