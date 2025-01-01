import React, { useContext, useEffect, useState } from 'react'
import { parent } from '../App';

const Product = ({ id }) => {

  const gotoComp = useContext(parent);
  const [Data, setData] = useState({});
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
                    movieDirectors,
                    movieShots,
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
    setData(tmp.data.Movie);
  }

  useEffect(() => {
    getProductData();
  }, [])
  //console.log(id)

  const ShowTags = () => {
    let li = Data.movieTags;
    if (Data && li) {
      console.log('list is => ', li)
      return li.map((cur) => {
        return <div className='bg-orange-500 px-2 py-1 m-1 hover:scale-105 cursor-pointer' onClick={() => {
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
        return <img src={cur} />
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

  return (
    <>
      <div className={`h-fit bg-contain bg-[url('${Data.movieThumbnail}')] `} style={{ backgroundImage: `url(${Data.movieThumbnail})` }}>
        <div className='h-fit flex justify-center items-center bg-transparent backdrop-blur'>
          <div className={`w-screen sm:w-80 h-96 bg-cover`} style={{ backgroundImage: `url(${Data.movieThumbnail})` }}></div>
        </div>
      </div>
      <section className='bg-black p-5'>
        <div className='flex md:justify-center space-y-10 md:space-y-0 md:space-x-10 flex-col md:flex-row'>
          <div className=' md:w-[40rem] space-y-3 text-white'>
            <h1 className='text-3xl font-bold'>{(Data.movieName) ? Data.movieName.charAt(0).toUpperCase() + Data.movieName.slice(1) : "Movie Name"}</h1>
            <div className='font-semibold'>{
              ((Data.movieTags) ? ((Data.movieTags.indexOf("english") != -1 || Data.movieTags.indexOf("hindi") != -1) ? "Dub" : "Sub") : "")
            }
            </div>
            <p>{Data.movieDescription}</p>
            <div className='flex flex-wrap'>
              <ShowTags />
              {/* <div className='bg-orange-500 px-2 py-1'>Adventure</div>
              <div className='bg-orange-500 px-2 py-1'>Fantasy</div> */}
            </div>
            <div>
              <div className='text-white flex justify-between border-b border-white py-2'>
                <span>Release Year</span>
                <span>{Data.releaseYear}</span>
              </div>
              <div className='text-white flex justify-between border-b border-white py-2'>
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
                    (Data && Data.movieDownloads && Data.movieDownloads.hindi.length != 0)? Data.movieDownloads.hindi.map((cur) => {
                      //console.log('ss => ',cur);
                      return <a className='bg-blue-700 text-center px-2 py-1 w-80 hover:bg-green-500' href={cur.link}>{cur.quality}</a>
                    }):<></>
                  }
                  {/* <div className='bg-blue-500 px-2 py-1'><a href="#">720p</a></div>
                  <div className='bg-blue-500 px-2 py-1'>1080p</div> */}
                </div>
              </div>
              <div className='space-y-2'>
                <h6 className={`text-center text-md ${(Data && Data.movieDownloads && Data.movieDownloads.english.length == 0) ? 'hidden' : ''}`}>English</h6>
                <div className='flex flex-col space-y-3 items-center'>
                  {
                    (Data && Data.movieDownloads && Data.movieDownloads.english.length != 0)? Data.movieDownloads.english.map((cur) => {
                      return <a className='bg-blue-700 text-center px-2 py-1 w-80 hover:bg-green-500' href={cur.link}>{cur.quality}</a>
                    }):<></>
                  }
                  {/* <div className='bg-blue-500 px-2 py-1'><a href="#">720p</a></div>
                  <div className='bg-blue-500 px-2 py-1'>1080p</div> */}
                </div>
              </div>
              <div className='space-y-2'>
                <h6 className={`text-center text-md ${(Data && Data.movieDownloads && Data.movieDownloads.subbed.length == 0) ? 'hidden' : ''}`}>English Sub</h6>
                <div className='flex flex-col space-y-3 items-center'>
                  {
                    (Data && Data.movieDownloads && Data.movieDownloads.subbed.length != 0)? Data.movieDownloads.subbed.map((cur) => {
                      return <a className='bg-blue-700 text-center px-2 py-1 w-80 hover:bg-green-500' href={cur.link}>{cur.quality}</a>
                    }):<></>
                  }
                  {/* <div className='bg-blue-500 px-2 py-1'><a href="#">720p</a></div>
                  <div className='bg-blue-500 px-2 py-1'>1080p</div> */}
                </div>
              </div>
            </div>
          </div>
          <div className='bg-blue-500 md:w-80'>
            <div>
              {/* <img src="https://catimages.org/images/2023/04/17/kat2023-04-17-07h38m56s512.jpg" alt="" /> */}
              <ShowShots />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Product
