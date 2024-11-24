import React, { useEffect, useState } from 'react'
import close from '../images/close.png'
import Data from './Data';

const Search = () => {
    const [Text,setText] = useState("");
    const [SearchList,setSearchList] = useState([]);
    const getData = async () =>{
        let tmp = await fetch('https://bingeql.onrender.com/graphQL',  {
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
    }

    useEffect(()=>{
        getData();
    },[Text])

    return (
        <div>
            <div className={`bg-[#141519] h-16 lg:h-24 flex justify-center items-center`}>
                <input autoFocus type="text" className='h-10 lg:h-14 pr-10 bg-transparent border-b-2 border-b-orange-600 outline-none text-white text-xl lg:text-3xl w-[90%] lg:w-[60%]' placeholder='Search...' value={Text} onChange={(event)=>{
                    setText(event.target.value);
                }}   />
                <img src={close} className={`w-5 absolute right-6 sm:right-11 lg:right-[19.5rem] cursor-pointer lg:top-[7.2rem] ${(Text.length > 0)? 'block':'hidden'}`} onClick={()=>{
                    setText("");
                }} />
            </div>
            <Data list={SearchList} />
        </div>
    )
}

export default Search
