import { useEffect, useId, useState } from "react"
import Label from "./Card.jsx"
import Data from "./Data.jsx";
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";


export default function Genre({ data }) {
  const [genre, setGenre] = useState([]);
  const [Text, setText] = useState("");
  const [Loading, setLoading] = useState(true);
  async function getGenre() {
    let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ExampleQuery($tag: String) {
                  Movies(tag: $tag) {
                    _id,
                    movieName,
                    movieThumbnail,
                    movieTags,
                    releaseYear
                  }
                  Tag(tag: $tag) {
                    tagDescription
                  }
                }`,
        variables: {
          tag: data
        }
      })
    });
    tmp = await tmp.json();
    //console.log(tmp);
    let mov = tmp.data.Movies;
    mov = mov.map((cur) => {
      return {
        ...cur,
        movieName: cur.movieName + " " + "(" + cur.releaseYear + ")"
      }
    })
    //console.log("Genre is => ",mov)
    setGenre(mov);
    setText(tmp.data.Tag.tagDescription);
    setLoading(false);
  }
  useEffect(() => {
    getGenre();
  }, [])

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

  if (Loading) {
    return (
      <section className="bg-gray-300 md:bg-gray-200">
        <div className="h-fit dark:bg-black grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0  place-items-center py-10 md:gap-y-10">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-300 md:bg-gray-200">
      <h1 className="text-center dark:text-white dark:bg-black font-semibold font-mono text-xl pt-10 px-10">{Text}</h1>
      <Data list={genre} />
    </section>
  )
}