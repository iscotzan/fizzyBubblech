import React, {useState} from 'react';
import Link from 'next/link'
import ConnectButton from "./connect-button/connect-button";
import {FaWallet, FaUserPlus} from 'react-icons/fa';
import {MdOutlineCreateNewFolder} from 'react-icons/md';
import {RiEarthFill} from 'react-icons/ri';
import useDarkMode from "../hooks/useDark";
import {useRouter} from "next/router";

interface DOMItem {
    desc: string,
    icon: React.ReactNode,
    label: string,
    link: string
}

const navItems: DOMItem[] = [
    {desc: 'Gallery', icon: <RiEarthFill/>, label: 'Gallery', link: '/'},
    {desc: 'Sell Digital Asset', icon: <MdOutlineCreateNewFolder/>, label: 'Mintery', link: '/create-item'},
    {desc: 'My Digital Assets', icon: <FaWallet/>, label: 'Owned', link: '/my-assets'},
    {desc: 'Creator Dashboard', icon: <FaUserPlus/>, label: 'Created', link: '/creator-dashboard'},
]

function Nav() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
    const [isDarkMode, setEnabledState] = useDarkMode();
    const enableDarkMode = setEnabledState as Function;
    const router = useRouter()
    console.log('router.route', router.route)
    return (
        <nav className="bg-gray-800">
            <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu" aria-expanded="false"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            {/*<img className="block lg:hidden h-8 w-auto"*/}
                            {/*     src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>*/}
                            {/*<img className="hidden lg:block h-8 w-auto"*/}
                            {/*     src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"*/}
                            {/*     alt="Workflow"/>*/}

                            <span
                                className="text-left text-gradient font-bold text-base hidden md:block capitalize">fizzy bubblech club</span>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navItems.map((item, index) => {
                                    const isActive = router.route.toLowerCase() === item.link.toLowerCase();
                                    return (
                                        <div key={index}>

                                            <Link key={index} href={item.link}><a
                                                className={`transition ease-in-out duration-500 ${isActive ? 'bg-green-900 text-orange-200' : 'bg-gray-900 text-white'} px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center `}
                                                aria-current="page"><span
                                                className='mr-2'> {item.icon}</span>{item.label}  </a>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <ConnectButton/>

                        <button type="button"
                                className="bg-gray-800 p-1 ml-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </button>

                        <div className="ml-3 relative">
                            {/*<div>*/}
                            {/*    <button type="button"*/}
                            {/*            className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"*/}
                            {/*            id="user-menu-button" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}*/}
                            {/*            aria-expanded="false" aria-haspopup="true">*/}
                            {/*        <span className="sr-only">Open user menu</span>*/}
                            {/*        <img className="h-8 w-8 rounded-full"*/}
                            {/*             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                            {/*             alt=""/>*/}
                            {/*    </button>*/}
                            {/*</div>*/}


                            {/*{isUserMenuOpen && (<div*/}
                            {/*    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"*/}
                            {/*    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"*/}
                            {/*    tabIndex={-1}>*/}
                            {/*    /!*<a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"*!/*/}
                            {/*    /!*   tabIndex={-1} id="user-menu-item-0">Your Profile</a>*!/*/}
                            {/*    /!*<a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"*!/*/}
                            {/*    /!*   tabIndex={-1} id="user-menu-item-1">Settings</a>*!/*/}
                            {/*    <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem"*/}
                            {/*            tabIndex={-1} id="user-menu-item-2" onClick={() => enableDarkMode()}>*/}
                            {/*        {isDarkMode ? 'Light' : 'Dark'} Mode*/}
                            {/*    </button>*/}
                            {/*</div>)}*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                {isMobileMenuOpen && (
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item, index) => {
                            const isActive = router.route.toLowerCase() === item.link.toLowerCase();

                            return (
                                <Link key={index} href={item.link}>
                                    <a href="#"
                                       className={`transition ease-in-out duration-500 ${isActive ? 'bg-green-900 text-orange-200' : 'bg-gray-900 text-white'} block px-3 py-2 rounded-md text-base font-medium`}
                                       aria-current="page">{item.label}</a>
                                </Link>)
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Nav;