"use client";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HistorySVG from "./ChatGPT/components/HistorySVG"
import NewChatSVG from "./ChatGPT/components/NewChatSVG"
import { useChatLogContext, HistoryEntry } from "./context/ChatLog";
import SideBar from "./ChatGPT/components/SideBar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { initChatLog, setCurrentHistory, activeSidebar, setActiveSidebar } = useChatLogContext();
  const [active, setActive] = useState('ChatGPT');
  const [isMobile, setIsMobile] = useState(false);
  const { status, data: session } = useSession();

  const lists = ['Landing', 'ChatGPT', 'About Us', 'Calendar'];
  const urls = ['/', '/ChatGPT', '#', '#'];
  const pathname = usePathname();
  const checkMobile = () => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  };
  useEffect(() => {
    checkMobile();
    if (pathname === '/ChatGPT') setActive('ChatGPT');
    else if (pathname === '/') setActive('Landing');
    else setActive('');
  }, [pathname]);


  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          {activeSidebar && isMobile && <SideBar setActiveSidebar={setActiveSidebar}/>}
          <div className="  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">

                {active === 'ChatGPT' &&
                  <div className="flex pr-12">
                    <div className="flex text-gray-500 pt-3 " data-state="closed">
                      <button aria-label="Open sidebar" className="h-10 hover:bg-[#909e9e1a] rounded-lg px-2 focus-visible:outline-0" onClick={() => setActiveSidebar((prev: boolean) => !prev)}>
                        <HistorySVG size={31} />
                      </button>
                    </div>
                    <div className="flex text-gray-500 pt-3" data-state="closed">
                      <button aria-label="New chat" className="h-10 rounded-lg px-2 hover:bg-[#909e9e1a] focus-visible:outline-0" onClick={() => { initChatLog(); setCurrentHistory(undefined as unknown as HistoryEntry) }}>
                        <NewChatSVG size={31} />
                      </button>
                    </div>
                  </div>}
                <div className="flex flex-shrink-0 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Your Company"
                  />
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {lists.map((list, index) => (
                    <Link
                      href={urls[index]}
                      className={list === active ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } key={index}
                      onClick={() => setActive(list)}
                    >
                      {list}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {status === "authenticated" ? (
                  <div className="flex">
                    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                      <button
                        type="button"
                        className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none px-2 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {/* AVATAR PLACE HOLDER */}
                            <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-base font-medium text-gray-800">
                                {session.user?.name}
                              </div>
                              <div className="text-sm font-medium text-gray-500">
                                {session.user?.email}
                              </div>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/api/auth/signout"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                  )}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:flex lg:flex-1 lg:justify-end">
                    <div className="hidden md:flex md:items-center md:space-x-6">
                      <Link
                        href="/auth/signin"
                        className="text-base font-medium text-gray-500 hover:text-gray-300"
                      >
                        Log in <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <Link
                        href="/auth/register"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {session?.user?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {session?.user?.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/api/auth/signout"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );
}