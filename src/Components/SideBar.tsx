import { useState } from "react";
import avatar from "../assets/Avatar.png";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "My Profile", src: "Chart_fill" },
    { title: "My Credit Card", src: "Chat" },
    { title: "New Quest", src: "User", gap: true },
    { title: "View My Fetcher ", src: "Calendar" },
    { title: "Track My Order", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  const hide = !open && "scale-0";

  return (
    <div className="flex ">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-min p-5  pt-8 relative duration-300 rounded-b-lg`}
      >
        <img
          src="./src/assets/control.png"
          className={`border-solid border-dark-purple absolute cursor-pointer rounded-full
           -right-3 top-9 w-7 border-2  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className={`flex gap-x-4 items-center `}>
          <img src={avatar} className={`cursor-pointer duration-500`} />
          <h1
            className={`${hide} text-white origin-left font-medium text-xl duration-300`}
          >
            QuestMaker
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};

export default SideBar;
