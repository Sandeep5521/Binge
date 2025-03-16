// Desc: Sidebar component for the dashboard
// its not used in the project but can be used for future reference

import { useState, useEffect } from "react";
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    Input,
    Drawer,
    Card,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    HomeIcon,
    ListBulletIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../images/logo.png";
import { use } from "react";

export function Sidebar() {
    const [open, setOpen] = useState(0);
    const [openAlert, setOpenAlert] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [navList, setNavList] = useState([]);
    const func = async () => {
        let tmp = await fetch('https://bingeql.onrender.com/graphQL', {
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

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => {
        console.log("openDrawer", isDrawerOpen)
        if (isDrawerOpen == false) setIsDrawerOpen(true)
        else setIsDrawerOpen(false)
    };
    //   const closeDrawer = () => {
    //     console.log("closeDrawer")
    //     setIsDrawerOpen(false)
    //   };

    return (
        <>
            {/* <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton> */}
            <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={openDrawer}
            >
                {isDrawerOpen ? (
                    <XMarkIcon className="h-6 w-6 dark:text-white text-black absolute -right-4 -top-2" strokeWidth={2} />
                ) : (
                    <Bars3Icon className="h-6 w-6 dark:text-white text-black absolute -right-4 -top-2" strokeWidth={2} />
                )}
            </IconButton>
            <div className="h-[100rem] fixed bg-red-500 w-screen"></div>
            <Drawer open={isDrawerOpen} className="bg-black">
                <Card
                    aria-flowto="sidebar"
                    shadow={false}
                    className="w-full p-4 rounded-none bg-black h-screen"
                >
                    <div className="mb-2 flex items-center gap-4 p-4">
                        {/* <img
                            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                            alt="brand"
                            className="h-8 w-8"
                        />
                        <Typography variant="h5" color="blue-gray" className="text-orange-500 font-semibold">
                            Binge
                        </Typography> */}
                        <img src={`${logo}`} className={`w-8 h-5 scale-[5] ml-10 my-1.5`} />
                    </div>
                    <div className="p-2">
                        <Input
                            icon={<MagnifyingGlassIcon className="h-5 w-5 dark:text-white ml-56 hover:cursor-pointer" />}
                            placeholder="Search"
                            className="placeholder:text-gray-500 text-black dark:text-white focus:outline-none border-b-2 border-b-blue-500 dark:border-transparent dark:border-b-gray-300 dark:hover:border-b-orange-500"
                        />
                    </div>
                    <List className="p-0 -space-y-2">
                        <ListItem className="border-b-0" ripple="light">
                            <ListItemPrefix>
                                <HomeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Home
                        </ListItem>
                        <Accordion
                            open={open === 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                        }`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 1}>
                                <AccordionHeader
                                    onClick={() => handleOpen(1)}
                                    className="border-b-0 p-3"
                                >
                                    <ListItemPrefix>
                                        <ListBulletIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal text-base">
                                        Browse
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className={`py-1 ${open === 1 ? "block" : "hidden"} p-0 -mt-3`}>
                                <List className="p-0 -space-y-5">
                                    {(navList != []) ? navList.map((tag) => {
                                        return (
                                            <ListItem>
                                                {tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1)}
                                            </ListItem>
                                        )
                                    }) : <></>}
                                    {/* <ListItem>
                                        Analytics
                                    </ListItem>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Reporting
                                    </ListItem>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Projects
                                    </ListItem> */}
                                </List>
                            </AccordionBody>
                        </Accordion>
                        {/* <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            > */}
                        {/* <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem> */}
                        <ListItem className="">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            About
                        </ListItem>
                        <ListItem className="">
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Docs
                        </ListItem>
                    </List>
                    {/* <Alert
                        open={openAlert}
                        className="mt-auto"
                        onClose={() => setOpenAlert(false)}
                    >
                        <CubeTransparentIcon className="mb-4 h-12 w-12" />
                        <Typography variant="h6" className="mb-1">
                            Upgrade to PRO
                        </Typography>
                        <Typography variant="small" className="font-normal opacity-80">
                            Upgrade to Material Tailwind PRO and get even more components,
                            plugins, advanced features and premium.
                        </Typography>
                        <div className="mt-4 flex gap-3">
                            <Typography
                                as="a"
                                href="#"
                                variant="small"
                                className="font-medium opacity-80"
                                onClick={() => setOpenAlert(false)}
                            >
                                Dismiss
                            </Typography>
                            <Typography
                                as="a"
                                href="#"
                                variant="small"
                                className="font-medium"
                            >
                                Upgrade Now
                            </Typography>
                        </div>
                    </Alert> */}
                </Card>
            </Drawer>
        </>
    );
}