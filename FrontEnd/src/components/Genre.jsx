import { useEffect, useId, useState } from "react"
import Label from "./Card.jsx"
import Data from "./Data.jsx";
import LoadingCard from "./LoadingCard.jsx";


export default function Genre({ data }) {
  const [genre, setGenre] = useState([]);
  const [Text, setText] = useState("");
  const [Loading, setLoading] = useState(true);
  document.title = data.charAt(0).toUpperCase() + data.slice(1);
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
  
  if (Loading) {
    return (
      <section>
        <div className="h-fit dark:bg-black grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0  place-items-center py-10 md:gap-y-10">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-center dark:text-white dark:bg-black font-semibold font-mono text-xl pt-10 px-10">{Text}</h1>
      <Data list={genre} />
    </section>
  )
}