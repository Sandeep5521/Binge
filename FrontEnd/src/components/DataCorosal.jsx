// import { Canvas } from '@react-three/fiber'
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { Suspense } from 'react'
// import Bvideo from '../videos/187985-881517510_medium.mp4'
// import Bsound from '../audios/wind-blowing-sfx-12809.mp3'

import { useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay } from 'swiper/modules';
import Label from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingCard from './LoadingCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle'
import { useEffect } from 'react';

const DataCorosal = () => {
    const [Corosal, setCorosal] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCorosal = async ({tag}) => {
        let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query ExampleQuery($page: Int, $limit: Int) {
                    Movies(page: $page, limit: $limit) {
                        _id,
                        movieName,
                        movieThumbnail,
                        movieTags,
                        releaseYear
                    }
                  }`,
                variables: {
                    page: 1,
                    limit: 6
                }
            })
        });
        tmp = await tmp.json();
        console.log('ss4 =>', tmp);
        setCorosal(tmp.data.Movies);
        setLoading(false);
    }

    useEffect(() => {
        getCorosal();
    }, [])

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 4
                },
                1024: {
                    slidesPerView: 4
                },
            }}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true, onlyInViewport: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            effect='fade'
            className='dark:bg-black dark:md:bg-black bg-gray-200 md:bg-gray-300'
        >
            {/* <SwiperSlide>
                <div className='flex justify-center'>
                    <img src="https://wallpapercave.com/wp/wp8969483.jpg" alt="" className='object-fit' />
                </div>
            </SwiperSlide> */}

            {/* {(Corosal && Corosal.length != 0) ? Corosal.map((cur) => <SwiperSlide className='' key={cur._id}>
                <div className='flex justify-center'>
                    <Label key={cur._id} id={cur._id} title={cur.movieName} thumb={cur.movieThumbnail} tags={cur.movieTags} />
                </div>
            </SwiperSlide>) : <></>} */}

            {(!loading) ? Corosal.map((cur) => <SwiperSlide className='' key={cur._id}>
                <div className='flex justify-center'>
                    <Label key={cur._id} id={cur._id} title={cur.movieName} thumb={cur.movieThumbnail} tags={cur.movieTags} />
                </div>
            </SwiperSlide>) : <>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <LoadingCard />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <LoadingCard />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <LoadingCard />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <LoadingCard />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <LoadingCard />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <LoadingCard />
                    </div>
                </SwiperSlide>
            </>}
        </Swiper>
    );
};

export default DataCorosal
