// import { Canvas } from '@react-three/fiber'
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { Suspense } from 'react'
// import Bvideo from '../videos/187985-881517510_medium.mp4'
// import Bsound from '../audios/wind-blowing-sfx-12809.mp3'

// import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { parent } from '../App';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle'
import { useContext, useEffect, useState } from 'react';

const Banner = () => {
  const [List, setList] = useState([]);
  const gotoComp = useContext(parent);
  const getList = async () => {
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
                  movieThumbnail
              }
            }`,
        variables: {
          page: 1,
          limit: 6,
          tag: null
        }
      })
    });
    tmp = await tmp.json();
    console.log('ss4 =>', tmp);
    setList(tmp.data.Movies);
  }

  useEffect(()=>{
    getList();
  },[])

  if (document.getElementById('aud')) {
    const aud = document.getElementById('aud');
    aud.volume = 0.1;
  }
  return (
    // <>
    //     <video className='w-screen object-fill ' autoPlay loop>
    //         <source src={`${Bvideo}`} type='video/mp4' />
    //     </video>
    //     <audio id='aud' src={`${Bsound}`} loop autoPlay></audio>
    // </>
    <Swiper
      // install Swiper modules
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
      autoplay={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true, hide: true }}
      keyboard={{ enabled: true, onlyInViewport: false }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className='dark:bg-black h-[30rem]'
      effect='fade'
    >
      {/* <SwiperSlide>
        <div className='flex justify-center'>
          <img src="https://wallpapercave.com/wp/wp8969483.jpg" alt="" className='object-fit' />
        </div>
      </SwiperSlide> */}

      {List.map((cur) => {
        return (
          <SwiperSlide key={cur._id}>
            <div className='flex justify-center cursor-pointer hover:brightness-75' onClick={()=>gotoComp({
                    display: 'page',
                    data: cur._id
                })}>
              <img src={cur.movieThumbnail} alt="" className='object-fit' />
            </div>
          </SwiperSlide>
        )
      })}
      {/* <SwiperSlide>
        <div className='flex justify-center'>
          <img src="https://wallpapercave.com/wp/wp11391382.png" alt="" className='object-fit' />
        </div>
      </SwiperSlide> */}
      {/* <SwiperSlide>
        <div className='flex justify-center'>
          <img src="https://wallpapercave.com/wp/wp10456761.jpg" alt="" className='object-fit' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='flex justify-center'>
          <img src="https://wallpapercave.com/wp/wp14549974.jpg" alt="" className='object-fit' />
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
};

export default Banner
