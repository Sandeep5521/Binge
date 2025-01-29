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

const DataCorosal = ({tag,product}) => {
    const [Corosal, setCorosal] = useState([]);
    const [loading, setLoading] = useState(true);
    //console.log('ss5 =>', tag);
    const getCorosal = async () => {
        let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query ExampleQuery($page: Int, $limit: Int,$tag: String) {
                    Movies(page: $page, limit: $limit, tag: $tag) {
                        _id,
                        movieName,
                        movieThumbnail,
                        movieTags,
                        releaseYear
                    }
                  }`,
                variables: {
                    page: 1,
                    limit: 6,
                    tag: (tag)? tag:null
                }
            })
        });
        tmp = await tmp.json();
        console.log('ss4 =>', tmp);
        let data = (product)? tmp.data.Movies.filter((cur) => cur._id != product):tmp.data.Movies;
        setCorosal(data);
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
                    slidesPerView: 3
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
            className='dark:bg-black dark:md:bg-black bg-gray-200 md:bg-gray-300 h-[40rem]'
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
