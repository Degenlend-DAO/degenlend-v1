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
import SXBorrowDetails from "../widgets/wsxBorrow";
import WithdrawDetails from "../widgets/withdraw/withdrawDetails";
import SupplyDetails from "../widgets/supply/supplyDetails";

// Action Items
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import EnableWarning from "../widgets/enableWarning";
import { useEffect } from "react";
import { updateSupplyBalance, updateWSXSupplyRate, updateWSXBalance } from "../../../features/dashboard/WSXMarketSlice";
import { updateBorrowLimit } from "../../../features/dashboard/AccountSlice";
import { Transition } from "../../../utils/Transition";

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
  
  const wsxWalletBalance = useSelector((state: RootState) => state.wsx.balance);
  const wsxSupplyBalance = useSelector(
    (state: RootState) => state.wsx.supplyBalance
  );
  const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);

  const borrowLimit = useSelector(
    (state: RootState) => state.account.borrowLimit
  );

  const borrowLimitUsed = useSelector(
    (state: RootState) => state.account.borrowLimitUsed
  );

  useEffect( () => {
    dispatch(updateWSXBalance());
    dispatch(updateSupplyBalance());
    dispatch(updateWSXSupplyRate());
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
              <EnableWarning type={"sx"} />
            </TabPanel>

            <TabPanel value="1">
              <SXBorrowDetails type={"SX"} />
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
                  supplyBalance={wsxSupplyBalance}
                />
              </TabPanel>
              <TabPanel value="1">
                <WithdrawDetails
                  type={"sx"}
                  supplyAPY={wsxSupplyAPY}
                  supplyBalance={wsxSupplyBalance}
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

export default WSXSupplyMarketDialog;
