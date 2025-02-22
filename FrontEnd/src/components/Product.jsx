import React, { useContext, useEffect, useState } from 'react'
import { parent } from '../App';
import DataCorosal from './DataCorosal';

const Product = ({ id }) => {
  const gotoComp = useContext(parent);
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ExampleQuery($movieId: ID) {
                  Movie(id: $movieId) {
                    _id,
                    movieName,
                    movieDescription,
                    movieThumbnail,
                    movieTags,
                    releaseYear,
                    imdb,
                    movieDirectors,
                    movieShots,
                    movieReview,
                    movieDownloads {
                      hindi {
                        link,
                        quality
                      },
                      english {
                        link,
                        quality
                      },
                      subbed {
                        link,
                        quality
                      }
                    }
                  }
                }`,
        variables: {
          movieId: id
        }
      })
    });
    tmp = await tmp.json();
    console.log(id);
    console.log("review => ", tmp.data)
    setData(tmp.data.Movie);
    setLoading(false);
  }

  useEffect(() => {
    getProductData();
  }, [])
  //console.log(id)

  const ShowTags = () => {
    if (loading) {
      return <>
        <div className='text-white px-2 py-1 m-1 hover:scale-105 cursor-pointer h-7 w-14 bg-gray-500 animate-pulse'></div>
        <div className='text-white px-2 py-1 m-1 hover:scale-105 cursor-pointer h-7 w-14 bg-gray-500 animate-pulse'></div>
        <div className='text-white px-2 py-1 m-1 hover:scale-105 cursor-pointer h-7 w-14 bg-gray-500 animate-pulse'></div>
      </>;
    }
    let li = Data.movieTags;
    if (Data && li) {
      console.log('list is => ', li)
      return li.map((cur) => {
        return <div className='bg-orange-500 text-white px-2 py-1 m-1 hover:scale-105 cursor-pointer' onClick={() => {
          gotoComp({
            display: 'genre',
            data: cur
          })
        }}>{cur.charAt(0).toUpperCase() + cur.slice(1)}</div>
      })

    }
    return <></>
  }

  const ShowShots = () => {
    let li = Data.movieShots;
    console.log(Data.movieDownloads);
    if (Data && li) {
      return li.map((cur) => {
        return <img src={cur} loading='lazy' />
      })
    }
    return <></>
  }

  // const ShowDownloads = () =>{
  //   let obj = Data.movieDownloads;
  //   if(Data && obj){
  //     for (const key in obj) {
  //       if (Object.prototype.hasOwnProperty.call(object, key)) {
  //         const element = object[key];

  //       }
  //     }
  //   }
  //   return <></>
  // }
  //console.log('ss3 => ', Data.movieDownloads[0],Data.movieDownloads["hindi"]);

  if (loading) {
    return (
      <>
        <div className={`h-fit bg-contain bg-gray-500 animate-pulse `}>
          <div className='h-fit flex justify-center items-center bg-transparent backdrop-blur'>
            <div className={`w-screen sm:w-80 h-96 bg-cover`}></div>
          </div>
        </div>
        <section className='dark:bg-black p-5 md:dark:bg-black'>
          <div className='flex md:justify-center space-y-10 md:space-y-0 md:space-x-10 flex-col md:flex-row'>
            <div className=' md:w-[40rem] space-y-3 dark:text-white'>
              <h1 className='text-3xl font-bold h-10 bg-gray-500 animate-pulse'></h1>
              <div className='font-semibold h-5 w-10 bg-gray-500 animate-pulse'></div>
              <p className='h-40 bg-gray-500 animate-pulse'></p>
              <div className='flex flex-wrap'>
                <ShowTags />
                {/* <div className='bg-orange-500 px-2 py-1'>Adventure</div>
              <div className='bg-orange-500 px-2 py-1'>Fantasy</div> */}
              </div>
              <div>
                <div className='dark:text-white flex justify-between h-10 bg-gray-500 animate-pulse border-b border-white dark:border-black py-2'></div>
                <div className='dark:text-white flex justify-between h-10 bg-gray-500 animate-pulse border-b border-white dark:border-black py-2'></div>
              </div>
              <div className='space-y-3'>
                <h1 className='text-center text-lg font-semibold text-green-500 mt-10 h-40 bg-gray-500 animate-pulse'></h1>
              </div>
            </div>
            <div className='bg-gray-500 animate-pulse md:w-80'>
              <div>
                {/* <img src="https://catimages.org/images/2023/04/17/kat2023-04-17-07h38m56s512.jpg" alt="" /> */}
                {/* <ShowShots /> */}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <div className={`h-fit bg-contain bg-[url('${Data.movieThumbnail}')] `} style={{ backgroundImage: `url(${Data.movieThumbnail})` }}>
        <div className='h-fit flex justify-center items-center bg-transparent backdrop-blur'>
          <div className={`w-screen sm:w-80 h-96 bg-cover`} style={{ backgroundImage: `url(${Data.movieThumbnail})` }}></div>
        </div>
      </div>
      <section className='dark:bg-black p-5 md:dark:bg-black'>
        <div className='flex md:justify-center space-y-10 md:space-y-0 md:space-x-10 flex-col md:flex-row'>
          <div className=' md:w-[40rem] space-y-3 dark:text-white'>
            <h1 className='text-3xl font-bold'>{(Data.movieName) ? Data.movieName.charAt(0).toUpperCase() + Data.movieName.slice(1) : "Movie Name"}</h1>
            <div className='font-semibold flex space-x-1 items-center'>
            {/* {
              ((Data.movieTags) ? ((Data.movieTags.indexOf("english") != -1 || Data.movieTags.indexOf("hindi") != -1) ? "Dub" : "Sub") : "")
            } */}
              <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png" className='h-6 w-7' />
              <h1>{(Data.imdb)? Data.imdb+'/10': (Math.floor(Math.random() * 10) + 1).toString()+'/10'}</h1>
            </div>
            <p>{Data.movieDescription}</p>
            <div className='flex flex-wrap'>
              <ShowTags />
              {/* <div className='bg-orange-500 px-2 py-1'>Adventure</div>
              <div className='bg-orange-500 px-2 py-1'>Fantasy</div> */}
            </div>
            <div>
              <div className='dark:text-white flex justify-between border-b border-black dark:border-white py-2'>
                <span>Release Year</span>
                <span>{Data.releaseYear}</span>
              </div>
              <div className='dark:text-white flex justify-between border-b border-black dark:border-white py-2'>
                <span>Directors</span>
                <span>{(Data.movieDirectors) ? Data.movieDirectors.join(", ") : "None"}</span>
              </div>
            </div>
            <div className='space-y-3'>
              <h1 className='text-center text-lg font-semibold text-green-500 mt-10'>Download Links</h1>
              <div className='space-y-2'>
                <h6 className={`text-center text-md ${(Data && Data.movieDownloads && Data.movieDownloads.hindi.length == 0) ? 'hidden' : ''}`}>Hindi</h6>
                <div className='flex flex-col space-y-3 items-center'>
                  {
                    (Data && Data.movieDownloads && Data.movieDownloads.hindi.length != 0) ? Data.movieDownloads.hindi.map((cur) => {
                      //console.log('ss => ',cur);
                      return <a className='bg-blue-700 text-center px-2 py-1 w-80 text-white hover:bg-green-500' href={cur.link}>{cur.quality}</a>
                    }) : <></>
                  }
                  {/* <div className='bg-blue-500 px-2 py-1'><a href="#">720p</a></div>
                  <div className='bg-blue-500 px-2 py-1'>1080p</div> */}
                </div>
              </div>
              <div className='space-y-2'>
                <h6 className={`text-center text-md ${(Data && Data.movieDownloads && Data.movieDownloads.english.length == 0) ? 'hidden' : ''}`}>English</h6>
                <div className='flex flex-col space-y-3 items-center'>
                  {
                    (Data && Data.movieDownloads && Data.movieDownloads.english.length != 0) ? Data.movieDownloads.english.map((cur) => {
                      return <a className='bg-blue-700 text-center px-2 py-1 w-80 text-white hover:bg-green-500' href={cur.link}>{cur.quality}</a>
                    }) : <></>
                  }
                  {/* <div className='bg-blue-500 px-2 py-1'><a href="#">720p</a></div>
                  <div className='bg-blue-500 px-2 py-1'>1080p</div> */}
                </div>
              </div>
              <div className='space-y-2'>
                <h6 className={`text-center text-md ${(Data && Data.movieDownloads && Data.movieDownloads.subbed.length == 0) ? 'hidden' : ''}`}>English Sub</h6>
                <div className='flex flex-col space-y-3 items-center'>
                  {
                    (Data && Data.movieDownloads && Data.movieDownloads.subbed.length != 0) ? Data.movieDownloads.subbed.map((cur) => {
                      return <a className='bg-blue-700 text-center px-2 py-1 w-80 text-white hover:bg-green-500' href={cur.link}>{cur.quality}</a>
                    }) : <></>
                  }
                  {/* <div className='bg-blue-500 px-2 py-1'><a href="#">720p</a></div>
                  <div className='bg-blue-500 px-2 py-1'>1080p</div> */}
                </div>
              </div>
            </div>
          </div>
          <div className=' md:w-80 flex justify-center'>
            <div>
              {/* <img src="https://catimages.org/images/2023/04/17/kat2023-04-17-07h38m56s512.jpg" alt="" /> */}
              <ShowShots />
            </div>
          </div>
        </div>
        {/* <div className='h-fit dark:text-white font-medium'>{(Data && Data.movieReview)? Data.movieReview:"" // for movieReview}</div> */}
        <DataCorosal mainHeading={'More Like This'} tag={(Data && Data.movieTags) ? Data.movieTags.join(',') : ''} product={(Data && Data._id) ? Data._id:null} />
      </section>
    </>
  )
}

export default Product
