"use client";

import React, { useEffect, useState } from 'react';
import VerticalBarChart from '@/components/Charts/VerticalBar';
import { Storage } from '@capacitor/storage';

const VerticalBar = () => {
    // Sales data for Gold, Silver, Diamond
    const [goldSales, setGoldSales] = useState(0);
    const [silverSales, setSilverSales] = useState(0);
    const [diamondSales, setDiamondSales] = useState(0);
    const [totalsales, setTotalSales] = useState([]);

    const [tenantName, setTenantName] = useState("");

    useEffect(() => {
        // Retrieve tenantName from storage
        const getStoredTenantName = async () => {
            try {
                const { value } = await Storage.get({ key: 'tenantName' });
                if (value) {
                    setTenantName(value);
                }
            } catch (error) {
                console.error('Error getting tenantName:', error);
            }
        };
        getStoredTenantName();
    }, []);

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const fetchSales = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetTotalSaleValue?billDate=${date}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTotalSales(data) }).catch((error) => { console.error('Error fetching data in dashboard todayRates:', error); })
    }

    useEffect(() => {
        fetchSales(date);
    }, [date, totalsales, tenantName]);


    // console.log(goldSales);

    useEffect(() => {
        totalsales.map((each) => {
            if (each?.jewelType === "GOLD SALES") {
                setGoldSales(each?.netAmt)
            }
            else if (each?.jewelType === "SILVER SALES") {
                setSilverSales(each?.netAmt);
            }
            else if (each?.jewelType === "DIAMOND SALES") {
                setDiamondSales(each?.netAmt);
            }
        })
    }, [totalsales, goldSales, silverSales, diamondSales]);

    // console.log(totalsales);

    // Calculate the sum of all sales
    const totalSales = goldSales + silverSales + diamondSales;

    // Data for the chart
    const data = {
        labels: ['Gold', 'Silver', 'Diamond'],
        datasets: [
            {
                label: 'Amount Of Sales',
                data: [goldSales, silverSales, diamondSales],
                backgroundColor: [
                    'rgba(255, 206, 86, 1)', // Gold
                    'rgba(192, 192, 192, 1)', // Silver
                    'rgba(54, 162, 235, 1)', // Diamond
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)', // Gold
                    'rgba(192, 192, 192, 1)', // Silver
                    'rgba(54, 162, 235, 1)', // Diamond
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const stepSize = Math.ceil(totalSales / 5); // Divide the total sales range into 5 equal parts
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                // Set the maximum value of y-axis to the sum of all sales
                stepSize: stepSize // Set the step size for y-axis ticks
            }
        }
    };

    // Changing label color to dark blue
    const labelColor = 'rgba(0, 0, 139, 1)'; // Dark blue color

    return (
        <div className='p-[20px]'>
            <h1 className='font-semibold'>Total Sales</h1>
            <VerticalBarChart data={data} options={options} labelColor={labelColor} />
        </div>
    );
};

export default VerticalBar;
