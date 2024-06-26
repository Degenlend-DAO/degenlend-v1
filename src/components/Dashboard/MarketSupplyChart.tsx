import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// todo(anyone): replace with real data
const data = [
    { name: 'May 28', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jun 2', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jun 7', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jun 12', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jun 17', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jun 22', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jun 26', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 1', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 6', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 11', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 16', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 21', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 26', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Jul 31', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Aug 5', earning: 0, borrowing: 0, amt: 0 },
    { name: 'Aug 10', earning: 0, borrowing: 0, amt: 0 }
];

const CustomBarChart = () => {
    const [totalAmount, setTotalAmount] = useState<number>(data[0].earning + data[0].borrowing);
    const [earning, setEarning] = useState<number>(data[0].earning);
    const [borrowing, setBorrowing] = useState<number>(data[0].borrowing);

    const handleMouseOver = (data: any) => {
        setTotalAmount(data.earning + data.borrowing);
        setEarning(data.earning);
        setBorrowing(data.borrowing);
    };

    return (
        <>
            <Box width={1000} display={'flex'} alignItems={'center'}>
                <Grid container spacing={6}>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom>
                            Total Supply
                        </Typography>
                        <Typography variant="body1">
                            {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom>
                            Earning
                        </Typography>
                        <Typography variant="body2">
                            {earning.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom>
                            Borrowing
                        </Typography>
                        <Typography variant="body2">
                            {borrowing.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis hide />
                    <Bar
                        dataKey="borrowing"
                        fill="#8884d8"
                        barSize={10}
                        onMouseOver={(data) => handleMouseOver(data)}
                    />
                    <Bar
                        dataKey="earning"
                        fill="#82ca9d"
                        barSize={10}
                        onMouseOver={(data) => handleMouseOver(data)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default CustomBarChart;