import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// Token Information
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import { Box, Divider, IconButton, Tab, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SXDetails from "../widgets/wsxDetails";
import SXBorrowDetails from "../widgets/wsxBorrow";
import WithdrawDetails from "../widgets/withdraw/withdrawDetails";
import SupplyDetails from "../widgets/supply/supplyDetails";

// Action Items
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";

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

function WSXSupplyMarketDialog(props: SupplyMarketDialogProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);
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
            <TabPanel value="1">
              <SXDetails />
            </TabPanel>

            <TabPanel value="2">
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
                  <Tab label="Supply" value="1" />
                  <Tab label="Withdraw" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                
                <SupplyDetails type={"sx"} supplyAPY={wsxSupplyAPY} supplyBalance={wsxWalletBalance} />

              </TabPanel>
              <TabPanel value="2">
                
                <WithdrawDetails type={"sx"} supplyAPY={wsxSupplyAPY} borrowAPY={0} supplyBalance={0} />

              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default WSXSupplyMarketDialog;
