import './App.css'
import Nav from './components/Nav'
import Genre from './components/Genre'
import { useState, createContext } from 'react'
import Banner from './components/banner';
import Home from './components/Home';
import { SimpleFooter } from './components/footer';
import Search from './components/search';

const parent = createContext();

export default function App() {
  const [Comp, setComp] = useState({
    display: 'home',
    data: 'adventure'
  }) 

  const gotoComp = (obj) => {
    //console.log('hii')
    setComp((val) => {
      return {
        ...val,
        display: obj.display,
        data: obj.data
      }
    })
  }

  const Page = () =>{
    if(Comp.display == 'genre') return <Genre data={Comp.data}/>
    if(Comp.display == 'search') return <Search/>
    return <Home/>
  }

  return (
    <>
      <parent.Provider value={gotoComp}>
        <Nav />
        <Page/>
        <SimpleFooter/>
      </parent.Provider>
    </>
  )
}
export { parent };