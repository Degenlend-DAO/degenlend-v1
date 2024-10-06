import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux"
import { RootState } from "../../../../app/Store";
import EnableWarning from "../enableWarning";
import { useEffect } from "react";
import NumberInput from "../numberinput";

interface BorrowMarketsHeaderProps {
    type: string;
    input?: boolean | undefined;
    isEnabled?: boolean | undefined;
}

function BorrowMarketsHeader(props: BorrowMarketsHeaderProps) {

    const {type, input, isEnabled } = props;
    let BorrowMarkets:JSX.Element = <Box></Box>;
    // useEffect();

    if (input === undefined || input === false) {
        BorrowMarkets = <EnableWarning type={type} />
    }

    if (input === true || isEnabled === true) {
        BorrowMarkets = <NumberInput type={type} />
    }

    return (
        <Box>
            {BorrowMarkets}
        </Box>
    );
}

export default BorrowMarketsHeader;