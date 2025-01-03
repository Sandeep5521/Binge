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
      <div className="text-left px-10 bg-gray-200 md:bg-gray-300 pt-10 pb-5 dark:bg-black dark:md:bg-black space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">Recently Updated</h1>
        <h2 className='md:text-md dark:text-gray-400'>Start your binge before the new season begins!</h2>
      </div>
      <DataCorosal/>
      <div className="text-left px-10 bg-gray-200 md:bg-gray-300 pt-10 pb-5 dark:bg-black dark:md:bg-black space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">Explore Action</h1>
        <h2 className='md:text-md dark:text-gray-400'>Start your binge before the new season begins!</h2>
      </div>
      <DataCorosal tag={'action'} />
      <div className="text-left px-10 bg-gray-200 md:bg-gray-300 pt-10 pb-5 dark:bg-black dark:md:bg-black space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">Experience Thrillers</h1>
        <h2 className='md:text-md dark:text-gray-400'>Start your binge before the new season begins!</h2>
      </div>
      <DataCorosal tag={'thriller'} />
      <div className="text-left px-10 bg-gray-200 md:bg-gray-300 pt-10 pb-5 dark:bg-black dark:md:bg-black space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">Explore Romance</h1>
        <h2 className='md:text-md dark:text-gray-400'>Start your binge before the new season begins!</h2>
      </div>
      <DataCorosal tag={'romance'} />
    </>
  )
}

export default Home
