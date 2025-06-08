import { useState, useEffect } from 'react'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ pageHandle, Total,limit,Page }) => {
  const [active, setActive] = useState(Page || 1);
  const [List, setList] = useState([]);
  const [PageShowlimit, setPageShowlimit] = useState(limit || 3); // Default fallback
  // Sandeeep : You have to be consistent 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) setPageShowlimit(3);
      else if (width < 768) setPageShowlimit(5);
      else if (width < 1024) setPageShowlimit(7);
      else setPageShowlimit(10);
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let tmp = [];
    console.log("Total =>", Total);
    // If Total is less than or equal to 0, return an empty array
    for (let i = 1; i <= Total; i++) {
      tmp.push(i);
    }
    setList(tmp);
  }, [Total]);

  useEffect(() => {
    console.log("active =>", active);
    // If active is less than 1 or greater than Total, reset to 1
    pageHandle(active);
  }, [active]);

  const getItemProps = (index) =>
  ({
    variant: active === index ? "filled" : "text",
    color: "black",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active > Total) return;
    // If active is already at the last page, do nothing
    //if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4 justify-center dark:bg-black dark:text-white bg-white">
      <Button
        variant="text"
        className="flex items-center gap-2 dark:text-white disabled:dark:text-gray-500 disabled:text-gray-500"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> <span className="hidden md:inline">Previous</span>
      </Button>
      <div className={`flex items-center gap-2`}>
        {
          (active%PageShowlimit === 1)?
            List.slice(active - 1, active + PageShowlimit-1).map((item, index) => (
            <IconButton
              key={index}
              {...getItemProps(item)}
              className={`dark:text-white ${active === item ? 'bg-orange-500' : 'bg-transparent'} flex items-center justify-center`}
              onClick={() => {
                pageHandle(item);
                setActive(item);
              }}
            >
              {item}
            </IconButton>
          )):
            List.slice(active-((active%PageShowlimit === 0)? PageShowlimit:active%PageShowlimit), (active-((active%PageShowlimit === 0)? PageShowlimit:active%PageShowlimit)) + PageShowlimit).map((item, index) => (
            <IconButton
              key={index}
              {...getItemProps(item)}
              className={`dark:text-white ${active === item ? 'bg-orange-500' : 'bg-transparent'} flex items-center justify-center`}
              onClick={() => {
                pageHandle(item);
                setActive(item);
              }}
            >
              {item}
            </IconButton>
          ))
        }
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 dark:text-white disabled:dark:text-gray-500 disabled:text-gray-500"
        onClick={next}
        disabled={active === Total || Total === 0
          || List.length === 0 || List.length === 1}
        // Disable if active is the last page or if there are no items
      >
        <span className="hidden md:inline">Next</span>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination


