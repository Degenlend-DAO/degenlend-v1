import { Container, Box, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

// Market Items
import BorrowMarkets from "./borrow_markets/borrowMarketsTable";
import SupplyMarkets from "./supply_markets/supplyMarketsTable";
import MarketHeader from "./marketHeader";

function Markets() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 14, sm: 16 },
        pb: { xs: 6, sm: 10 },
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <MarketHeader />
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid 
            xs={12} 
            md={6}
            sx={{
              position: 'relative',
              '&:after': !isSmallScreen ? {
                content: '""',
                position: 'absolute',
                right: 0,
                top: '5%',
                height: '90%',
                width: '1px',
                backgroundColor: theme.palette.divider,
              } : {}
            }}
          >
            <SupplyMarkets />
          </Grid>
          
          <Grid xs={12} md={6}>
            <BorrowMarkets />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Markets;