import React, { useEffect, useState } from 'react'
import close from '../images/close.png'
import Data from './Data';
import LoadingCard from './LoadingCard';
import Pagination from './Pagination';

const Search = () => {
  const [Text, setText] = useState("");
  const [SearchList, setSearchList] = useState([]);
  const [Loading, setLoading] = useState(true);
  document.title = 'Search';
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
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [Text])

  const IsLoading = () => {
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
        <Data list={SearchList} />
      </section>
    )
  }

  return (
    <div>
      <div className={`dark:bg-[#141519] bg-white h-16 lg:h-24 flex justify-center items-center`}>
        <input autoFocus type="text" id='text' className='h-10 lg:h-14 pr-10 bg-transparent border-b-2 border-b-orange-600 outline-none dark:text-white text-black text-xl lg:text-3xl w-[90%] lg:w-[60%]' placeholder='Search...' value={Text} onKeyDown={(event)=>{
          if(event.key === 'Enter'){
            event.target.blur(); // for unfocusing the input field
          }
        }} onChange={(event) => {
          setText(event.target.value);
        }} />
        <img src={close} className={`w-5 absolute right-6 sm:right-11 lg:right-[17.5rem] cursor-pointer lg:top-[7.2rem] ${(Text.length > 0) ? 'block' : 'hidden'}`} onClick={() => {
          setText("");
        }} />
      </div>
      <IsLoading />
      {/* <Pagination /> */}
    </div>
  )
}

export default Search
