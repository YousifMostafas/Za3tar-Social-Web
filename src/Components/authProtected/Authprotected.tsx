import { Navigate } from "react-router";

export default function Authprotected({ children }: { children: React.ReactNode }) {

if (localStorage.getItem("userToken")) {
return children;
}

return (
    <Navigate to="/login"  />
)

}
