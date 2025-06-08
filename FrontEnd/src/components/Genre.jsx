import { useEffect, useId, useState } from "react"
import Label from "./Card.jsx"
import Data from "./Data.jsx";
import LoadingCard from "./LoadingCard.jsx";
import Pagination from './Pagination';


export default function Genre({ data }) {
  const [genre, setGenre] = useState([]);
  const [Text, setText] = useState("");
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(15);
  const [Total, setTotal] = useState(0);
  const [Loading, setLoading] = useState(true);
  document.title = data.charAt(0).toUpperCase() + data.slice(1);

  const getCountData = async () => {
    let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ExampleQuery($name: String) {
                        Movies(name: $name) {
                          _id,
                          movieName,
                          movieThumbnail,
                          movieTags,
                          releaseYear
                        }
                      }`
      })
    });
    tmp = await tmp.json();
    console.log("getCount =>", tmp.data.Movies.length);
    setTotal(tmp.data.Movies.length);
    console.log("Count =>", tmp);
    setLoading(false);
  }

  async function getGenre() {
    let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ExampleQuery($tag: String,$page: Int, $limit: Int) {
                  Movies(tag: $tag, page: $page, limit: $limit) {
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
          tag: data,
          page: Page,
          limit: Limit
        }
      })
    });
    tmp = await tmp.json();
    //console.log(tmp);
    let mov = tmp.data.Movies;
    // mov = mov.map((cur) => {
    //   return {
    //     ...cur,
    //     movieName: cur.movieName + " " + "(" + cur.releaseYear + ")"
    //   }
    // })
    //console.log("Genre is => ",mov)
    setGenre(mov);
    setText(tmp.data.Tag.tagDescription);
    setLoading(false);
  }

  useEffect(() => {
    getCountData();
    setLoading(true);
  }, [Text])

  useEffect(() => {
    getGenre();
  }, [Text, Page, Total, Limit])

  const handlePageChange = (newPage) => {
    console.log("newPage =>", newPage);
    if (newPage === Page) return; // If the page is already the same, do nothing
    if (newPage < 1 || newPage > Math.ceil(Total / Limit)) return; // Ensure newPage is within valid range
    setPage(newPage);
    setLoading(true);
  }

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
      {
        (Total > Limit && !Loading) && (
          <Pagination pageHandle={handlePageChange} Total={Math.ceil(Total / Limit)} limit={3} Page={Page} />
        )
      }
    </section>
  )
}