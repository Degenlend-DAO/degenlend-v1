import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Container } from '@mui/material';

const FrequentlyAskedQuestions = () => {
    return (
        <Container             sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
        }}>
        <div>
            <Typography textAlign={'center'}>Frequently Asked Questions</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>What is DegenLend?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Degenlend is a decentralized lending protocol hosted on SX Network.  You deposit your Wrapped SX & USDC tokens to take out loans against them.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>How Does DegenLend Work?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Degenlend is built using smart contract technology, relying on a system of money makets and price oracles to accurately determine loan prices & liquidation thresholds.
                        Learn more in our docs <a href="https://docs.degenlend.xyz/">here.</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>Is it Safe to Work With DegenLend?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        All blockchain-based lending protocols face inherent risks associated with their uses.  Use this product at your own risk,  don't put in more than you're willing to lose.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls='panel2-content'
                    id='panel2-header'>
                        <Typography>How Can I contribute to Degenlend?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    You can suggest new markets, and other improvements to the Degenlend protocol on the Improvements Proposal Repository.
                    Check it out on our Github <a href="https://github.com/Degenlend-DAO/DIPs">here.</a>
                </Typography>
            </AccordionDetails>
            </Accordion>
        </div>
        </Container>
    );
}

export default FrequentlyAskedQuestions;