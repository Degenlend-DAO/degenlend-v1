import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet, disconnectWallet } from '../features/wallet/walletSlice';
import { AppDispatch, RootState } from "../app/Store";
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const ConnectWallet = () => {
    const [anchorElement, setAnchorElement] = useState<EventTarget & HTMLButtonElement | null>(null)
    const isWalletConnected = useSelector((state: RootState) => state.wallet.isConnected);
    const walletAddress = useSelector((state: RootState) => state.wallet.address);

    const filteredWalletAddress = (address: string | undefined) => {
        const size = address!.length;
        const prefix = address!.substring(0, 5);
        const suffix = address!.substring(size - 5);
        return `${prefix}...${suffix}`;
    }
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const onConnectWallet = () => {
        dispatch(connectWallet());
    }

    const onDisconnectWallet = () => {
        dispatch(disconnectWallet());
    }

    return (
        <Box sx={{ maxWidth: '200px' }}>
            {
                isWalletConnected ? (
                    <>
                        <Button
                            variant='contained'
                            onClick={handleClick}
                            size='medium'
                            aria-label="button to open dropdown"
                        >
                            {filteredWalletAddress(walletAddress)}
                        </Button>
                        <Menu
                            anchorEl={anchorElement}
                            open={Boolean(anchorElement)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { handleClose(); onDisconnectWallet(); }}>
                                Disconnect Wallet
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        variant='contained'
                        onClick={onConnectWallet}
                        size='medium'
                        aria-label="button to connect wallet"
                    >
                        Conntect Wallet
                    </Button>
                )
            }
        </Box>
    );
}

export default ConnectWallet;