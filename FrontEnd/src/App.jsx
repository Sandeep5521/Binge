import './App.css'
import Nav from './components/Nav'
import Genre from './components/Genre'
import { useState, createContext } from 'react'
import Banner from './components/Banner';
import Home from './components/Home';
import { SimpleFooter } from './components/footer';
import Search from './components/Search';
import Product from './components/Product';
import About from './components/About';
import Docs from './components/Docs';

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
    if(Comp.display == 'page') return <Product id={Comp.data}/>
    if(Comp.display == 'about') return <About/>
    if(Comp.display == 'docs') return <Docs/>
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