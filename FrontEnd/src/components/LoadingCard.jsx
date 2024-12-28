import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";

const LoadingCard = () => {
    return (<Card className="mt-6 w-[90%] bg-white  dark:border-black dark:border-4 p-4 hover:scale-105 cursor-pointer dark:bg-opacity-20">
        <CardHeader color="blue-gray" className="relative h-fit -my-10 flex justify-center" >
            <img className={`rounded-xl shadow-xl bg-gray-200 animate-pulse h-96 w-96`} layout="fill" />
        </CardHeader>
        <CardBody className="mt-[20%] text-center">
            <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white animate-pulse" >
                Loading...
            </Typography>
            <Typography variant="h5" color="blue-gray" className="flex flex-wrap items-center justify-center space-x-2 space-y-1 dark:text-white">
                <div className='bg-gray-200 h-8 w-20 mt-0.5 text-white px-2 rounded hover:bg-orange-500 animate-pulse' />
                <div className='bg-gray-200 h-8 w-20 text-white px-2 rounded hover:bg-orange-500 animate-pulse' />
                <div className='bg-gray-200 h-8 w-20 text-white px-2 rounded hover:bg-orange-500 animate-pulse' />
            </Typography>
        </CardBody>
    </Card >)
}

export default LoadingCard
