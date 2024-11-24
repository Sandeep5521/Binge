import React, { useContext, useId } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";
import { parent } from '../App';
//import { Parent } from './main';

const Label = ({ title, thumb,tags }) => {
    //const view = useContext(Parent);
    const gotoComp = useContext(parent)
    const Tags = tags.map((cur) => <div key={useId()+1} className='bg-black text-white px-2 rounded hover:bg-orange-500' onClick={()=>{
        gotoComp({
            display:'genre',
            data:cur
        })
    }}>{cur}</div>)

    return (
        <Card className="mt-6 w-[90%] bg-white  dark:border-black dark:border-4 p-4 hover:scale-105 cursor-pointer dark:bg-opacity-20">
            <CardHeader color="blue-gray" className="relative h-fit -my-10 flex justify-center">
                <img className={`rounded-xl shadow-xl`} src={thumb} alt="img-blur-shadow" layout="fill" />
            </CardHeader>
            <CardBody className="mt-[20%] text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="flex flex-wrap items-center  justify-center space-x-2 space-y-1 dark:text-white">
                    {Tags}
                </Typography>
            </CardBody>
        </Card >
    )
}

export default Label