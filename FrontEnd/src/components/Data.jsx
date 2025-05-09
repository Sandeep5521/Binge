import React from 'react'
import Label from './Card'
import nosearch from '../images/noSearch.png'

const Data = ({list}) => {
    console.log("list is => ",list)
    const renderItem = (list && list.length != 0)? list.map((cur) => <Label key={cur._id} id={cur._id} title={cur.movieName} thumb={cur.movieThumbnail} tags={cur.movieTags} year={cur.releaseYear} />):<></>;
    const Cdata = () =>{
      if(!list || list.length == 0){
        return <div className='flex items-center justify-center h-screen p-5'>
          <img src={nosearch} className={`object-cover`}/>
        </div>
      }
      else{
        return <div className="h-fit dark:bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-0  place-items-center py-10 md:gap-y-10">
        {renderItem}
      </div>
      }
    }
  return (
    <Cdata/>
  )
}

export default Data
