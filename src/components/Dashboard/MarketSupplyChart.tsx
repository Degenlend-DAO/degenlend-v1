import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const CustomBarChart = () => (
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
            <Bar dataKey="borrowing" fill="#8884d8" barSize={10} />
            <Bar dataKey="earning" fill="#82ca9d" barSize={10} />
        </BarChart>
    </ResponsiveContainer>
);

export default CustomBarChart;