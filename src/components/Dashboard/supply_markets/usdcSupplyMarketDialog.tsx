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

import USDCDetails from "./widgets/usdcDetails";

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
            <TabPanel value="1">
              <USDCDetails />
            </TabPanel>

            <TabPanel value="2"></TabPanel>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  centered
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="lab API tabs"
                >
                  <Tab label="Supply" value="1" />
                  <Tab label="Withdraw" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box width={"100%"}>
                  {/* Suply APY */}

                  {/* Enable Button */}
                  <Button></Button>
                  {/* Wallet Balance */}
                  <Typography></Typography>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                {/* Market Details / Activities  */}
              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default USDCSupplyMarketDialog;
