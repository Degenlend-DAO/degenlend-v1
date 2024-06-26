import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ConnectWalletProps {
    address: string;
    connectWallet: () => void;
}


const ConnectWallet = ({ address, connectWallet }: ConnectWalletProps) => {
    return (
        <Box sx={{ maxWidth: '200px' }}>
            <Button
                variant='contained'
                onClick={connectWallet}
                size="medium">
                Connect Wallet
            </Button>
        </Box>
    );
}

export default ConnectWallet;