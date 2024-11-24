import React from 'react'
import Label from './Card'
import nosearch from '../images/noSearch.png'

const Data = ({list}) => {
    //console.log("list is => ",list)
    const renderItem = list.map((cur) => <Label key={cur._id} id={cur._id} title={cur.movieName} thumb={cur.movieThumbnail} tags={cur.movieTags} />)
    const Cdata = () =>{
      if(list.length == 0){
        return <div className='flex items-center justify-center h-screen p-5'>
          <img src={nosearch} className={`object-cover`}/>
        </div>
      }
      else{
        return <div className="h-fit dark:bg-black grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0  place-items-center py-10 md:gap-y-10">
        {renderItem}
      </div>
      }
    }
  return (
    <Cdata/>
  )
}

export default Data
