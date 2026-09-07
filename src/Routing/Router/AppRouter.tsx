import { createBrowserRouter } from "react-router"
import Posts from "../../pages/Posts/Posts"
import Layout from "../../Components/Layout/Layout"
import Register from "../../pages/Register/Register"
import Login from "../../pages/Login/Login"
import Notfound from "../../pages/Notfound/Notfound"
import Authprotected from "../../Components/authProtected/Authprotected"
import AuthprotectedRouter from "../../Components/authProtected/AuthprotectedRouter"
import PostDetails from "../../pages/postDetails/PostDetails"
import Profile from "../../pages/Profile/Profile"
import Changepassword from "../../pages/changePassword/Changepassword"

//routing

export const routes=createBrowserRouter([{path:"",element:<Layout/> ,children:[{index:true,element:<Authprotected><Posts/></Authprotected>},
    {path:"posts",element:<Authprotected><Posts/></Authprotected>},
    {path:"profile",element:<Authprotected><Profile/></Authprotected>},
    {path:"changePassword",element:<Authprotected><Changepassword/></Authprotected>},
    {path:"postdetails/:id",element:<Authprotected><PostDetails/></Authprotected>},
    {path:"register",element:<AuthprotectedRouter><Register/></AuthprotectedRouter>},
    {path:"login",element:<AuthprotectedRouter><Login/></AuthprotectedRouter>},
    {path:"*",element:<Notfound/>}


]}])


