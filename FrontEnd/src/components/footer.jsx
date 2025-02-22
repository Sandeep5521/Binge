import React, { useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { parent } from "../App";
 
export function SimpleFooter() {
  const gotoComp = useContext(parent)

  return (
    <footer className="flex px-10 dark:from-black dark:to-[#23252b] dark:bg-gradient-to-b flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 py-6 dark:border-black text-center md:justify-between md:dark:from-black md:dark:to-[#23252b] md:dark:bg-gradient-to-b ">
      <Typography color="orange-gray" className="font-normal dark:text-white">
        &copy; {new Date().getFullYear()} Binge
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="orange-gray"
            className="font-normal transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-white"
            onClick={()=>{
              gotoComp({
                display:'about'
              });
            }}
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="orange-gray"
            className="font-normal transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-white"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://github.com/Sandeep5521/Binge"
            color="orange-gray"
            className="font-normal transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-white"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="orange-gray"
            className="font-normal transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-white"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}