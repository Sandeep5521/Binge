// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y,Keyboard,Autoplay } from 'swiper/modules';
import Banner from './Banner';
import DataCorosal from './DataCorosal';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle'

const Home = () => {
  return (
    <>
      <Banner/>
      <DataCorosal/>
    </>
  )
}

export default Home
