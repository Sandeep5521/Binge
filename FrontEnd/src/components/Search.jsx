import React, { useEffect, useState } from 'react'
import close from '../images/close.png'
import Data from './Data';
import LoadingCard from './LoadingCard';

const Search = () => {
  const [Text, setText] = useState("");
  const [SearchList, setSearchList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const getData = async () => {
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
                          movieTags
                        }
                      }`,
        variables: {
          name: Text
        }
      })
    });
    tmp = await tmp.json();
    console.log(tmp);
    setSearchList(tmp.data.Movies);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [Text])

  const IsLoading = () => {
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
        <Data list={SearchList} />
      </section>
    )
  }

  return (
    <div>
      <div className={`bg-[#141519] h-16 lg:h-24 flex justify-center items-center`}>
        <input autoFocus type="text" id='text' className='h-10 lg:h-14 pr-10 bg-transparent border-b-2 border-b-orange-600 outline-none text-white text-xl lg:text-3xl w-[90%] lg:w-[60%]' placeholder='Search...' value={Text} onKeyDown={(event)=>{
          if(event.key === 'Enter'){
            event.target.blur(); // for unfocusing the input field
          }
        }} onChange={(event) => {
          setText(event.target.value);
        }} />
        <img src={close} className={`w-5 absolute right-6 sm:right-11 lg:right-[19.5rem] cursor-pointer lg:top-[7.2rem] ${(Text.length > 0) ? 'block' : 'hidden'}`} onClick={() => {
          setText("");
        }} />
      </div>
      <IsLoading />
    </div>
  )
}

export default Search
