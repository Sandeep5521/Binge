import {useState,useEffect} from 'react'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = () => {
    const [active, setActive] = useState(1);
    const [Text, setText] = useState("");
    const [SearchList, setSearchList] = useState([]);
    // Sandeeep : You have to be consistent 
    const getData = async () => {
        let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `query ExampleQuery($name: String,$page: Int, $limit: Int) {
                            Movies(name: $name, page: $page, limit: $limit) {
                              _id,
                              movieName,
                              movieThumbnail,
                              movieTags,
                              releaseYear
                            }
                          }`,
            variables: {
              name: Text,
              page: 1,
              limit: 18
            }
          })
        });
        tmp = await tmp.json();
        console.log("page =>",tmp);
        setSearchList(tmp.data.Movies);
        
      }
    
      useEffect(() => {
        getData();
      }, [Text])

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "black",
        onClick: () => setActive(index),
    });

    const next = () => {
        if (active === 5) return;

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
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                <IconButton {...getItemProps(1)} className={`dark:text-white ${active== 1? 'bg-orange-500':'bg-transparent'} flex items-center justify-center`}>1</IconButton>
                <IconButton {...getItemProps(2)} className={`dark:text-white ${active== 2? 'bg-orange-500':'bg-transparent'} flex items-center justify-center`}>2</IconButton>
                <IconButton {...getItemProps(3)} className={`dark:text-white ${active== 3? 'bg-orange-500':'bg-transparent'} flex items-center justify-center`}>3</IconButton>
                <IconButton {...getItemProps(4)} className={`dark:text-white ${active== 4? 'bg-orange-500':'bg-transparent'} flex items-center justify-center`}>4</IconButton>
                <IconButton {...getItemProps(5)} className={`dark:text-white ${active== 5? 'bg-orange-500':'bg-transparent'} flex items-center justify-center`}>5</IconButton>
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 dark:text-white disabled:dark:text-gray-500 disabled:text-gray-500"
                onClick={next}
                disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default Pagination


