import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const logoStyle = {
  width: '140px',
  height: 'auto',
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://degelend.xyz/" color="inherit" underline="hover">
        Degenlend&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(248, 249, 250, 0.9)' 
          : 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${theme.palette.divider}`,
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 4, md: 6 }}
          sx={{
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                textDecoration: 'none',
                '&:hover': {
                  '& img': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <Box
                component="img"
                src="/path-to-your-logo.png" // Replace with your logo path
                alt="Degenlend Logo"
                sx={{
                  ...logoStyle,
                  transition: 'transform 0.3s ease',
                }}
              />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 500,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              The decentralized lending protocol for degens. Earn interest, borrow assets, and
              leverage your crypto positions.
            </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={4}
              sx={{
                '& .MuiLink-root': {
                  position: 'relative',
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: 0,
                    height: 2,
                    backgroundColor: theme.palette.primary.main,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover:after': {
                    width: '100%',
                  },
                },
              }}
            >
              <Link href="/markets" underline="none">
                Markets
              </Link>
              <Link href="/faq" underline="none">
                FAQ
              </Link>
              <Link href="/docs" underline="none">
                Documentation
              </Link>
              <Link href="/contact" underline="none">
                Contact
              </Link>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >

          </Box>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: { xs: 4, md: 6 },
            borderTop: `1px solid ${theme.palette.divider}`,
            gap: 2,
          }}
        >
          <Box>
            <Stack direction="row" spacing={2}>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Typography color="text.secondary" sx={{ opacity: 0.5 }}>
                •
              </Typography>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                Terms of Service
              </Link>
            </Stack>
            <Copyright />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              '& .MuiIconButton-root': {
                backgroundColor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.05)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: theme.palette.text.secondary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 8px ${theme.palette.primary.main}30`,
                },
              },
            }}
          >
            <IconButton
              href="https://github.com/Degenlend-DAO/"
              target="_blank"
              aria-label="GitHub"
              size="large"
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              href="https://x.com/degenlend_dao"
              target="_blank"
              aria-label="X"
              size="large"
            >
              <TwitterIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/company/AthleteX/"
              target="_blank"
              aria-label="LinkedIn"
              size="large"
            >
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}