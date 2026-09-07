import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
<>
<Navbar/>
 <div className="flex justify-center items-center min-h-screen">


<Outlet/>

</div>
</>
)
}
