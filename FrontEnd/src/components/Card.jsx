import React, { useContext, useId } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";
import { parent } from '../App';
//import { Parent } from './main';

const Label = ({ title, thumb, tags, id, year }) => {
    //const view = useContext(Parent);
    const gotoComp = useContext(parent)
    const Tags = (tags.length != 0) ? tags.map((cur) => <div key={useId() + 1} className='ml-1.5 mt-1.5 dark:bg-orange-600 bg-black text-white px-2 py-0.5 rounded-sm hover:bg-green-700' onClick={() => {
        gotoComp({
            display: 'genre',
            data: cur
        })
    }}>{cur.charAt(0).toUpperCase() + cur.slice(1)}</div>) : <></>
    let list = title.split(" ");
    list = list.map((cur) => {
        return cur.charAt(0).toUpperCase() + cur.slice(1)
    })
    return (
        <Card className="w-[90%] bg-transparent dark:border-black dark:border-4 cursor-pointer shadow-none">
            <CardHeader color="blue-gray" className="h-fit flex justify-center" onClick={() => {
                gotoComp({
                    display: 'page',
                    data: id
                })
            }}>
                <img className={`rounded-xl shadow-xl hover:brightness-75 w-[26rem]`} src={thumb} alt="img-blur-shadow" layout="fill" />
            </CardHeader>
            <CardBody className="text-left">
                <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white hover:brightness-75" onClick={() => {
                    gotoComp({
                        display: 'page',
                        data: id
                    })
                }}>
                    {list.join(' ')+ ((year) ? " (" + year + ")" : "")}
                </Typography>
                <Typography variant="h1" color="blue-gray" className="h-fit -ml-1.5 flex text-left flex-wrap items-center justify-self-start dark:text-white">
                    {Tags}
                </Typography>
            </CardBody>
        </Card >
    )
}

export default Label