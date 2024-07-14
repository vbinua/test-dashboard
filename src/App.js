import React, {useEffect, useState} from 'react';
import HeaderBox from './components/header/header';
import StatisticsBox from './components/statistics/statistics';
import TableContainerBox from './components/tableContainer/tableContainer';
import dayjs from 'dayjs';

import {ResponsiveChartContainer} from '@mui/x-charts/ResponsiveChartContainer';
import {LinePlot, MarkPlot} from '@mui/x-charts/LineChart';
import {BarPlot} from '@mui/x-charts/BarChart';
import {ChartsXAxis} from '@mui/x-charts/ChartsXAxis';
import {ChartsYAxis} from '@mui/x-charts/ChartsYAxis';
import {ChartsGrid} from '@mui/x-charts/ChartsGrid';
import {ChartsTooltip} from '@mui/x-charts/ChartsTooltip';
import {Box, Checkbox, FormControlLabel, Stack} from "@mui/material";

export default function ContainedButtons() {
    const [newRequests, setNewRequests] = useState(0);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [reverseX, setReverseX] = useState(false);
    const [reverseLeft, setReverseLeft] = useState(false);
    const [reverseRight, setReverseRight] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('https://intex.agency/wp-json/custom/v1/request');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const groupDataByMonth = () => {
        const grouped = data.reduce((acc, item) => {
            const month = dayjs(item.post_date).format('MMM');
            if (!acc[month]) {
                acc[month] = {month, count: 0};
            }
            acc[month].count++;
            return acc;
        }, {});

        // Convert object to array
        const groupedArray = Object.values(grouped);
        return groupedArray;
    };

    const handleDateChange = (date) => {
        if (date) {
            const selectedDate = date.format('YYYY-MM-DD');
            const filtered = data.filter(item =>
                dayjs(item.post_date).format('YYYY-MM-DD') === selectedDate
            );
            setFilteredData(filtered);
            setNewRequests(filtered.length);
        } else {
            setFilteredData(data);
            setNewRequests(data.length);
        }
    };

    const groupedData = groupDataByMonth();

    const series = [
        {type: 'bar', dataKey: 'count', color: '#bfdbf7'},
    ];

    return (
        <>
            <HeaderBox onDateChange={handleDateChange}/>
            <StatisticsBox data={filteredData}/>
            <TableContainerBox data={filteredData}/>
            <Stack sx={{width: '100%'}}>
                <Stack direction="row">
                    <FormControlLabel
                        checked={reverseX}
                        control={<Checkbox onChange={(event) => setReverseX(event.target.checked)}/>}
                        label="reverse x-axis"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        checked={reverseLeft}
                        control={<Checkbox onChange={(event) => setReverseLeft(event.target.checked)}/>}
                        label="reverse left axis"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        checked={reverseRight}
                        control={<Checkbox onChange={(event) => setReverseRight(event.target.checked)}/>}
                        label="reverse right axis"
                        labelPlacement="end"
                    />
                </Stack>
                <Box sx={{width: '100%'}}>
                    <ResponsiveChartContainer
                        series={series}
                        xAxis={[
                            {
                                scaleType: 'band',
                                dataKey: 'month',
                                label: 'Month',
                                reverse: reverseX,
                            },
                        ]}
                        yAxis={[
                            {id: 'leftAxis', reverse: reverseLeft},
                            {id: 'rightAxis', reverse: reverseRight},
                        ]}
                        dataset={groupedData}
                        height={400}
                    >
                        <ChartsGrid horizontal/>
                        <BarPlot/>
                        <LinePlot/>
                        <MarkPlot/>

                        <ChartsXAxis/>
                        <ChartsYAxis axisId="leftAxis" label="Number of Requests"/>
                        <ChartsTooltip/>
                    </ResponsiveChartContainer>
                </Box>
            </Stack>
        </>
    );
}
