import { useState } from "react";
import { close, logo_sib, menu } from "../assets";
import { navLinks } from "../constants";


function Navbar({active_s, setActive}) {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-2 justify-between items-center navbar">
      <ul className="list-none sm:flex hidden justify-start items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`navbar-item font-poppins font-normal cursor-pointer text-[27px] py-1 px-2
             ${active_s.toLocaleLowerCase() === nav.title.toLocaleLowerCase() ? "text-primary" : "text-dimPrimary"}
             ${active_s.toLocaleLowerCase() === nav.title.toLocaleLowerCase() ?  "navbar-selected" :""}
             ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`
            }
            onClick={() => setActive(nav.title.toLocaleLowerCase())}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <img src={logo_sib} alt="logo-sib" className="justify-end w-[100px] h-[70px]" />
      {/*Small Screen Menu*/}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)} />
        <div className={`${ !toggle ? "hidden" : "flex" } p-6 bg-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`} >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active_s === nav.title ? "text-primary" : "text-dimPrimary"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title.toLocaleLowerCase())}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
