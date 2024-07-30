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
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import { Box, Tab, Typography } from "@mui/material";
import USDCDetails from "../supply_markets/widgets/usdcDetails";
import USDCBorrowDetails from "../supply_markets/widgets/usdcBorrow";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        </DialogTitle>
        <DialogContent>
          <TabContext value={value}>
            {/* Details above the tab list */}

            <TabPanel value="1">
              <USDCBorrowDetails type={"USDC"} />
            </TabPanel>
            <TabPanel value="2">
              <USDCDetails />
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
                  <Tab label="Borrow" value="1" />
                  <Tab label="Repay" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">Borrow</TabPanel>
              <TabPanel value="2">Repay</TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default USDCBorrowMarketDialog;
