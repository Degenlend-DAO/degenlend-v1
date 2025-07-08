import * as React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Container, 
  Link,
  Box,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: '8px 0',
  borderRadius: '8px',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: '8px 0',
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(66, 165, 245, 0.05)' 
      : 'rgba(255, 255, 255, 0.03)',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '0 16px',
  minHeight: '56px',
  '& .MuiAccordionSummary-content': {
    margin: '12px 0',
    '&.Mui-expanded': {
      margin: '12px 0',
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(66, 165, 245, 0.08)' 
      : 'rgba(255, 255, 255, 0.04)',
  },
}));

const FrequentlyAskedQuestions = () => {
  const theme = useTheme();
  
  const faqItems = [
    {
      question: "What is DegenLend?",
      answer: "Degenlend is a decentralized lending protocol hosted on SX Network. You deposit your Wrapped SX & USDC tokens to take out loans against them.",
    },
    {
      question: "How Does DegenLend Work?",
      answer: (
        <>
          Degenlend is built using smart contract technology, relying on a system of money markets and price oracles to accurately determine loan prices & liquidation thresholds.
          Learn more in our docs <Link href="https://docs.degenlend.xyz/" target='_blank' sx={{ 
            color: theme.palette.mode === 'light' ? 'primary.main' : 'secondary.main',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            }
          }}>here</Link>.
        </>
      ),
    },
    {
      question: "Is it Safe to Work With DegenLend?",
      answer: "All blockchain-based lending protocols face inherent risks associated with their uses. Use this product at your own risk, don't put in more than you're willing to lose.",
    },
    {
      question: "How Can I contribute to Degenlend?",
      answer: (
        <>
          You can suggest new markets, and other improvements to the Degenlend protocol on the Improvements Proposal Repository.
          Check it out on our Github <Link href="https://github.com/Degenlend-DAO/DIPs" target='_blank' sx={{ 
            color: theme.palette.mode === 'light' ? 'primary.main' : 'secondary.main',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            }
          }}>here.</Link>
        </>
      ),
    }
  ];

  return (
    <Container 
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 12, sm: 16 },
        pb: { xs: 6, sm: 10 },
        px: { xs: 3, sm: 4 },
      }}
    >
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        maxWidth: '800px',
      }}>
        <Typography 
          variant='h3' 
          sx={{ 
            fontWeight: 700,
            mb: 2,
            color: theme.palette.mode === 'light' ? 'primary.main' : 'text.primary',
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography 
          variant='subtitle1' 
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Get answers to the most common questions about DegenLend
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        {faqItems.map((item, index) => (
          <StyledAccordion key={index} disableGutters>
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.mode === 'light' ? 'primary.main' : 'secondary.main' }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.question}
              </Typography>
            </StyledAccordionSummary>
            <AccordionDetails sx={{ 
              padding: '8px 24px 24px',
              borderTop: `1px solid ${theme.palette.divider}`,
            }}>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </Container>
  );
}

export default FrequentlyAskedQuestions;