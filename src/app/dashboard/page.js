"use client"
import Banner from '@/components/Dashboard/Banner'
import CheckBox from '@/components/Dashboard/CheckBox'
import Invoices from '@/components/Dashboard/Invoices'
import Others from '@/components/Dashboard/Others'
import TodayRates from '@/components/Dashboard/TodayRates'
import TotalSales from '@/components/Dashboard/TotalSales'
import VerticalBar from '@/components/Graphs/VerticalBar'
import Navbar from '@/components/Navbar/Navbar'
import NavbarBottom from '@/components/Navbar/NavbarBottom'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [tenantName, setTenantName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userName = 'VJ';
                const password = 'VJ';

                const response = await axios.get(`https://www.erpser.timeserasoftware.in/api/Tenant/CheckValidTenant?userName=${userName}&password=${password}`);
                setTenantName(response.data);

            } catch (error) {
                console.error("Error in dashboard tenant fetching: ", error);
            }
        };

        fetchData();
    })

    return (
        <div>
            <NavbarV2 title={"home"} />
            <NavbarBottom />
            <TodayRates tenantName={tenantName.tenantName} />
            <Banner title={"Swastik"} />
            <TotalSales tenantName={tenantName.tenantName} />
            <CheckBox />
            <VerticalBar />
            <Others tenantName={tenantName.tenantName} />
            <Invoices tenantName={tenantName.tenantName} />
        </div>
    )
}

export default page
