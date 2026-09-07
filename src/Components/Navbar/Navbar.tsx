import { Avatar, Button } from "@heroui/react";
import { Stellar } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { tokenContext } from "../../pages/context/AuthTokenContext";

export default function Navbar() {
const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); 
const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
const context = useContext(tokenContext);

if (!context) {
  throw new Error(
    "useContext(tokenContext) must be used within AuthTokenContext"
  );
}
const router=useNavigate();

function handleLogout() {
  localStorage.removeItem("userToken");
  context?.setData(null);
  setIsDropdownOpen(false);
  router("/login");
}

const { userData } = context;
console.log("NAVBAR USER:", userData);
return (

<>


<nav className="bg-white fixed shadow-2xl w-full z-20 top-0 inset-s-0 border-b border-default">
  <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
<Stellar size="32" color="#FF8A65" variant="Bold"/>
      <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">ZSW</span>
    </Link>
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    
  {  userData ? (
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    type="button"
    className="flex text-sm bg-neutral-primary rounded-full md:me-0"
  >
    <Avatar>
      <Avatar.Image
        alt={userData.name}
        src={userData.photo}
      />
      <Avatar.Fallback>
        {userData.name?.slice(0, 2).toUpperCase()}
      </Avatar.Fallback>
    </Avatar>
  </button>
) : (
  <div className="flex gap-3">
    <Link to="/login">
      <Button className="bg-orange-300 text-white hover:bg-orange-400">
        Login
      </Button>
    </Link>

    <Link to="/register">
      <Button className="bg-orange-300 text-white hover:bg-orange-400">
        SignUp
      </Button>
    </Link>
  </div>
)}
   


      {/* Dropdown menu */}
      <div className={`z-50 absolute bg-white top-full right-12 ${isDropdownOpen ? 'block' : 'hidden'} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`} id="user-dropdown">
        <div className="px-4 py-3 text-sm border-b border-default">
          <span className="block text-heading font-medium">{userData?.name}</span>
          <span className="block text-body truncate">{userData?.email}</span>
        </div>
        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
       
       
          <li>
            <Link to={"/profile"}>
                        <p className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profile</p>

            </Link>
          </li>
          <li>
            <Link to={"/changePassword"}>
                        <p className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Change Password</p>

            </Link>
          </li>
          <li  onClick={_=> handleLogout()} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          Logout
          </li>
        </ul>
      </div>
      {userData ?  <button onClick={() => setIsMenuOpen(!isMenuOpen)}  data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
      </button> : "" }
     
    </div>
    <div  className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
      {userData ? <> <li>
          <NavLink to="/posts" className={function({ isActive }) { return `block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent ${isActive ? 'text-orange-400' : 'text-black'}` }}>Posts</NavLink>
        </li>
        </>  : "" }
    
      
      </ul>
    </div>
  </div>
</nav>


</>
  )
}
