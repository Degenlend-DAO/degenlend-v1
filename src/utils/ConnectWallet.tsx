import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet, disconnectWallet } from '../features/wallet/walletSlice';
import { AppDispatch, RootState } from "../app/Store";

const ConnectWallet = () => {

    const isWalletConnected = useSelector((state: RootState) => state.wallet.isConnected);
    const walletAddress = useSelector((state: RootState) => state.wallet.address);

    const filteredWalletAddress = (address: string | undefined) => {
        const size = address!.length;
        const prefix = address!.substring(0, 5);
        const suffix = address!.substring(size - 5);
        return `${prefix}...${suffix}`;
    }
        // action items 

    const dispatch = useDispatch<AppDispatch>();

    const onConnectWallet = () => {
        dispatch( connectWallet() );
    }

    const onDisconnectWallet = () => {
        dispatch( disconnectWallet() );
    }

    return (
        <Box sx={{ maxWidth: '200px' }}>
        {
            isWalletConnected ? 
            <Button
                variant='contained'
                onClick={onDisconnectWallet}
                size='medium'>
                {filteredWalletAddress(walletAddress)}
            </Button>
            :
            <Button
                variant='contained'
                onClick={onConnectWallet}
                size="medium">
                Connect Wallet
            </Button>
        }
            </Box>
        );
}

export default ConnectWallet;