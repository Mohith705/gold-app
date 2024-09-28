"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Storage } from '@capacitor/storage';
import { Http } from '@capacitor-community/http';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import { Autoplay } from "swiper/modules";

const Banner = ({ title }) => {

    const [tenantName, setTenantName] = useState('');
    const [firmDetails, setFirmDetails] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const checkStorage = async () => {
            try {
                const { value: storedTenantName } = await Storage.get({ key: 'tenantName' });
                if (storedTenantName) {
                    setTenantName(storedTenantName);
                }
            } catch (error) {
                console.error('Error retrieving tenantName from storage:', error);
            }
        };
        checkStorage();
    }, []);

    // useEffect(() => {
    //     const fetchFirmDetails = async (tenantName) => {
    //         try {
    //             const response = await Http.request({
    //                 method: 'GET',
    //                 url: `https://www.erpser.timeserasoftware.in/api/Erp/GetUserAddress`,
    //                 headers: { 'tenantName': tenantName }
    //             });

    //             if (response.status !== 200) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = response.data;

    //             // Replace 'http://' with 'https://' in all URLs
    //             const replaceHttpWithHttps = (url) => {
    //                 if (url.startsWith('http://')) {
    //                     return url.replace('http://', 'https://');
    //                 }
    //                 return url;
    //             };

    //             // Apply the replacement to all URLs in epasS2
    //             const urls = data.epasS1.split(',').map(url => replaceHttpWithHttps(url.trim()));

    //             setFirmDetails(data);
    //             setImageUrls(urls);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     if (tenantName) {
    //         fetchFirmDetails(tenantName);
    //     }
    // }, [tenantName]);

    useEffect(() => {
        const fetchFirmDetails = async (tenantName) => {
          try {
            const response = await fetch(
              `https://www.erpser.timeserasoftware.in/api/Erp/GetUserAddress`,
              {
                headers: {
                  tenantName: tenantName,
                },
              }
            );
            const data = await response.json();
            const urls = data.epasS1.split(",").map((url) => url.trim());
            setFirmDetails(data);
            setImageUrls(urls);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        if (tenantName) {
          fetchFirmDetails(tenantName);
        }
      }, [tenantName]);


    // console.log(firmDetails);

    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 1000
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                loopedslides={3}
                centeredSlides={true}
                onSwiper={(swiper) => { }}
                onSlideChange={() => { }}
                className="z-10"
            >
                {imageUrls?.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className='w-full h-[150px] z-10 my-[5px] relative bg-cover bg-no-repeat bg-center'
                            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${url})` }}
                        >
                            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-[24px] font-serif text-white'>
                                {/* <p>{title}</p> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                {/* <SwiperSlide>
                    <div className='w-full h-[150px] z-10 my-[5px] relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(/banner1.png)` }}>
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-[24px] font-serif text-white'>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full h-[150px] z-10 my-[5px] relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(/banner2.png)` }}>
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-[24px] font-serif text-white'>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full h-[150px] z-10 my-[5px] relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(/banner3.png)` }}>
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-[24px] font-serif text-white'>
                        </div>
                    </div>
                </SwiperSlide> */}
            </Swiper>
            {/* <div className='w-full h-[150px] z-10 my-[5px] relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(/banner1.png)` }}>
                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-[24px] font-serif text-white'>
                </div>
            </div> */}

        </div>
    )
}

export default Banner