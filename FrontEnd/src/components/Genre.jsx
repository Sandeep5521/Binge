import { useEffect, useId, useState } from "react"
import Label from "./Card.jsx"
import Data from "./Data.jsx";



export default function Genre({ data }) {
  const [genre, setGenre] = useState([]);
  const [Text, setText] = useState("");
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
    mov = mov.map((cur)=> {
      return {
        ...cur,
        movieName : cur.movieName + " " +"("+cur.releaseYear+")"
      }
    })
    //console.log("Genre is => ",mov)
    setGenre(mov);
    setText(tmp.data.Tag.tagDescription);
  }
  useEffect(() => {
    getGenre();
  }, [genre])

  

  return (
    <section className="bg-gray-200 md:bg-gray-100">
      <h1 className="text-center dark:text-white dark:bg-black font-semibold font-mono text-xl pt-10 px-10">{Text}</h1>
      <Data list={genre}/>
    </section>
  )
}