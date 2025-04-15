// import { useState } from "react";
// import RegisterForm from "./RegisterForm";
// import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { useAuth } from "./ContextProvid";

const Navbar: React.FC = () => {
    // const [showForm,setShowForm]=useState(false)
    // const [showFormLog,setShowFormLog]=useState(false)
    
    // function showing (){
    //     // console.log(showForm)
    //     setShowForm(oldValue=>!oldValue)
    // }
    // function showingLog (){
    //     // console.log(showFormLog)
    //     setShowFormLog(oldValue=>!oldValue)
    // }
    
    const { dataRecive ,setDataRecive}=useAuth()
    console.log(dataRecive)
    const handleLogout = () => {
        setDataRecive(null); // Clear user data
    }
    return (
    <div className="flex flex-col  ">
    <nav className="flex flex-row justify-between items-center bg-gray-300 p-4 fixed left-52
    text-white w-6xl  mx-auto rounded-b-full px-16  ">
        {/* Logo Section */}
        <div>
            <h2 className="text-xl font-bold text-gray-700">Social App</h2>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 ml-10">
        <Link to={'/'}>
            <p className=" cursor-pointer text-gray-700 text-xl ">Home</p>
            </Link>
        {dataRecive?(
            <Link to={`/users/${dataRecive?.user.id}`}>
            <p className=" cursor-pointer text-gray-700 text-xl">Profile</p>
            </Link>):null}
            
        </div>
        {dataRecive?(<div className="flex items-center space-x-4">
                        <img src={dataRecive.user.profile_image } className="w-10 h-10  rounded-full"/>
                        <span className="text-sm font-semibold text-gray-700 mr-10">
                                {dataRecive.user.name} 
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-md"
                        >
                            Logout
                        </button>
                    </div>)
        :(<div >
            <Link to={"/login"}>
            <button className="mx-4  cursor-pointer p-1
            bg-gray-600 rounded-md shadow-amber-50" >Sign in</button>
            </Link>
            <Link to={"/register"}>
            <button className="shadow-2xl shadow-amber-50  cursor-pointer p-1
            bg-gray-600 rounded-md" >Sign up</button>
            </Link>
        </div>)}
        </nav>
        {/* {showForm&&<RegisterForm/>}
        {showFormLog&&<LoginForm/>} */}
    </div>
    );
};

export default Navbar;

