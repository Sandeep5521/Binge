import { useEffect, useId, useState } from "react"
import Label from "./Card.jsx"
import Data from "./Data.jsx";
import LoadingCard from "./LoadingCard.jsx";
import Pagination from './Pagination';
import ActionImage from '../images/action-banner.png';
import AdventureImage from '../images/adventure-banner.png';
import AnimatedImage from '../images/animated-banner.jpg'; // Default image for genres
import CrimeImage from '../images/crime-banner.png';
import ComedyImage from '../images/comedy-banner.png';
import DramaImage from '../images/drama-banner.jpg';
import FantasyImage from '../images/fantasy-banner.png';
import HindiImage from '../images/hindi-banner.jpg';
import HorrorImage from '../images/horror-banner.jpg';
import RomanceImage from '../images/romance-banner.jpg';
import SciFiImage from '../images/sci-fi-banner.jpg';
import MysteryImage from '../images/mystery-banner.png';
import SportsImage from '../images/sports-banner.jpg';
import ThrillerImage from '../images/thriller-banner.png';
import GenreBanner from "./GenreBanner.jsx";


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

  const handleImages = () => {
    if(data != null && data != undefined && data != "") {
      if(data === "action") {
        return ActionImage; // Replace with the actual image path for action genre
      }
      if(data === "adventure") {
        return AdventureImage; // Replace with the actual image path for adventure genre
      }
      if(data === "animated") {
        return AnimatedImage; // Replace with the actual image path for animated genre
      }
      if(data === "crime") {
        return CrimeImage; // Replace with the actual image path for crime genre
      }
      if(data === "comedy") {
        return ComedyImage; // Replace with the actual image path for comedy genre
      }
      if(data === "drama") {
        return DramaImage; // Replace with the actual image path for drama genre
      }
      if(data === "fantasy") {
        return FantasyImage; // Replace with the actual image path for fantasy genre
      }
      if(data === "hindi") {
        return HindiImage; // Replace with the actual image path for hindi genre
      }
      if(data === "horror") {
        return HorrorImage; // Replace with the actual image path for horror genre
      }
      if(data === "romance") {
        return RomanceImage; // Replace with the actual image path for romance genre
      }
      if(data === "sci-fi") {
        return SciFiImage; // Replace with the actual image path for sci-fi genre
      }
      if(data === "mystery") {
        return MysteryImage; // Replace with the actual image path for mystery genre
      }
      if(data === "sports") {
        return SportsImage; // Replace with the actual image path for sports genre
      }
      if(data === "thriller") {
        return ThrillerImage; // Replace with the actual image path for thriller genre
      }
      else {
        return HindiImage; // Default image if no match found
      }
      
    }
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
      {/* <h1 className="text-center dark:text-white dark:bg-black font-semibold font-mono text-xl pt-10 px-10 ">{Text}</h1> */}
      <GenreBanner
      genre={data.charAt(0).toUpperCase() + data.slice(1)}
      description={Text}
      image={handleImages()} // Add your image in public/images folder
    />
      <Data list={genre} />
      {
        (Total > Limit && !Loading) && (
          <Pagination pageHandle={handlePageChange} Total={Math.ceil(Total / Limit)} limit={3} Page={Page} />
        )
      }
    </section>
  )
}