import { useState, useEffect, useContext } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.png";
import { parent } from "../App.jsx";
import search from "../images/search.png";

function NavListMenu({ setOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [navList, setNavList] = useState([]);
  const func = async () => {
    let tmp = await fetch('http://localhost:3000/graphQL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ExampleQuery {
                    Tags{
                    tagName
                }
              }`
      })
    });
    tmp = await tmp.json();
    console.log(tmp);
    setNavList(tmp.data.Tags);
  }
  useEffect(() => {
    func()
  }, [])

  const gotoComp = useContext(parent)
  const renderItemsMobile = navList.map(
    ({ tagName }, key) => (
      <a href="#" key={key} onClick={() => {
        console.log(tagName)
        setOpen(false)
        gotoComp({
          display: 'genre',
          data: tagName
        })
      }}>
        <MenuItem className={`flex items-center gap-3 rounded-lg`}>
          <div className={`${(!isMobileMenuOpen) ? 'hidden' : ''} my-1`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {tagName}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  const renderItems = navList.map(
    ({ tagName }, key) => (
      <a href="#" key={key} className="flex justify-center" onClick={() => {
        console.log(tagName)
        gotoComp({
          display: 'genre',
          data: tagName
        })
        //setIsMobileMenuOpen(false)
      }}>
        <MenuItem className={`flex items-center gap-3 rounded-lg`}>
          <div className={`${(!isMenuOpen) ? 'hidden' : ''} my-1`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center hover:text-orange-500 text-sm font-bold"
            >
              {tagName}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );
  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 px-0.5 py-0 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((cur) => !cur)
              }}
            >
              <span className='text-white'>Browse</span>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 text-white transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 text-white transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block z-10">
          <ul className="grid grid-cols-4 gap-y-3 p-3 gap-x-6 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      {/* {console.log(isMobileMenuOpen, isMenuOpen)} */}
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen} className="px-1.5">{renderItemsMobile}</Collapse>
      </div>
    </>
  );
}

// const navListMenuItems = [
//   {
//     title: "Action",
//     description: "",
//   },
//   {
//     title: "Comedy",
//     description: ""
//   }, {
//     title: "Action",
//     description: "",
//   },
//   {
//     title: "Comedy",
//     description: ""
//   }, {
//     title: "Action",
//     description: "",
//   },
//   {
//     title: "Comedy",
//     description: ""
//   }, {
//     title: "Action",
//     description: "",
//   },
//   {
//     title: "Comedy",
//     description: ""
//   }
// ];

function NavList({ display, open }) {
  const gotoComp = useContext(parent)
  return (
    <ul className={`${display} my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6`}>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-white transition-colors">
          Browse
        </a>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        onClick={()=>{
          if(open) open(false);
          console.log(typeof open)
          gotoComp({
            display:'search'
          });
        }}
      >
        <a href="#" className="flex items-center hover:text-white transition-colors">
          <img src={search} className='lg:block hidden w-10 cursor-pointer hover:scale-105' />
          <span className='text-md block lg:hidden'>Search</span>
        </a>
      </Typography>
      <NavListMenu setOpen={open} />
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Blocks
        </a>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-white transition-colors">
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-white transition-colors">
          Docs
        </a>
      </Typography>
    </ul>
  );
}

export default function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const gotoComp = useContext(parent)

  return (
    <>
    <Navbar className="max-w-screen w-screen fixed text-white px-6 lg:px-16 py-4 rounded-none backdrop-blur bg-opacity-40 bg-[#23252b] z-10">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-orange-500 font-bold text-xl"
          onClick={()=>{
            setOpenNav(false)
            gotoComp({
              display:'home'
            });
          }}
        >
          <div className={`flex space-x-1.5`}>
            <img src={`${logo}`} className={`w-8 h-8 scale-[5] ml-12 `} />
            {/* <div>Binge</div> */}
          </div>
        </Typography>
        <div className="hidden lg:block">
          <NavList display={''} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 absolute -right-4 -top-2" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 absolute -right-4 -top-2" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList open={setOpenNav} display={(!openNav) ? 'hidden' : ''} />
      </Collapse>
    </Navbar>
    <div className={`h-[4.5rem] w-full bg-black`}></div>
    </>
  );
}