"use client";

import Banner from '@/components/Dashboard/Banner';
import NavbarV2 from '@/components/Navbar/NavbarV2';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const page = () => {

    const [birthdays, setBirthdays] = useState(null);

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const fetchBirthdays = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetTotalDues`, {
            headers: { 'tenantName': "ORIGIN_JST" }
        }).then((res) => res.json()).then((data) => { setBirthdays(data) }).catch((error) => { console.error('Error fetching data in crm crm birthdays:', error); })
    }

    const [openStatus, setOpenStatus] = useState(
        new Array(5).fill(true)
    );

    const openAllFaqs = () => {
        setOpenStatus(new Array(6).fill(true));
    };

    const closeAllFaqs = () => {
        setOpenStatus(new Array(6).fill(false));
    };

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    const toggleAccordion = (index) => {
        const newOpenStatus = [...openStatus];

        for (let i = 0; i < newOpenStatus.length; i++) {
            if (i !== index) {
                newOpenStatus[i] = false;
            }
        }

        newOpenStatus[index] = !newOpenStatus[index];
        setOpenStatus(newOpenStatus);
    };

    const totalBalanceAmt = birthdays?.customerLedgers?.reduce((total, Today) => total + (Today?.balanceAmt || 0), 0);


    useEffect(() => {
        fetchBirthdays(date);
    }, []);

    return (
        <div>
            <NavbarV2 />
            <Banner title={"Total Dues"} />
            <div className={`w-full h-full px-[20px] py-[20px]`}>
                <div className='flex items-center justify-center gap-[15px]'>
                    <h1 className='text-[14px] font-normal'>Total Number:</h1>
                    <p className='text-[16px] font-bold'>{birthdays?.customerLedgers?.length}</p>
                </div>
                <div className='flex items-center justify-center gap-[15px] pb-[10px]'>
                    <h1 className='text-[14px] font-normal'>Balance Amount:</h1>
                    <p className='text-[16px] font-bold'>{formatRupees(totalBalanceAmt)}</p>
                </div>
                {
                    ((<div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(2)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Total Dues</span>
                            {openStatus[2] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[2] === true && (
                            <div className='max-h-[950px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]'>
                                {
                                    birthdays?.customerLedgers?.map((total, index) => (
                                        <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                            <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                                <h1 className='text-[16px] text-[#000]'>{total?.custName}</h1>
                                            </div>
                                            <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Due: ₹{formatRupees(total?.balanceAmt)}</p>
                                                {/* <p className='flex-1 text-[14px] font-normal'>Paid: <span className='font-semibold'> ₹{formatRupees(total?.paidAmt)}</span></p>
                                                <p className='flex-1 text-[14px] font-normal'>Total: <span className='font-semibold'> ₹{formatRupees(total?.billAmt)}</span></p> */}
                                            </div>
                                            <div className='basis-[20%] flex justify-start items-center py-[3px] border border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                <p className='text-[14px] font-normal'>Mobile: <span className='font-semibold'>{total?.mobileNum}</span> </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>))
                }
            </div>
        </div>
    )
}

export default page
