import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LoginUser } from "./LoginFun";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./ContextProvid";

export default function LoginForm(){
    const [loginData,setLoginData]=useState({
        username:"",
        password:""
    })
    const {setDataRecive}=useAuth()
    const navigate=useNavigate()
    const mutation=useMutation({
        mutationFn:LoginUser,
        onSuccess:(data)=>{
            console.log("success Login",data)
            alert('Login successfully')
            setDataRecive(data)
            navigate('/')
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
            console.error("Login  error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed");
            } else {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred");
            }
        }
    })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setLoginData({...loginData,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        mutation.mutate(loginData)
    }

    return (
        <div className="w-screen h-screen bg-cyan-700">
        <div className="pt-32">
            <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">Login</h2>
    
    {mutation.isError && (
        <p className="text-red-500 text-sm text-center mb-2">Error:</p>
    )}
    
    <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto"
    >
        <div className="space-y-4">
        <label>
            username:
        <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
            className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        </label>
        <label>
            Password:
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        </label>
        <button 
            type="submit" 
            disabled={mutation.isPending} 
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400"
        >
            {mutation.isPending ? "Login..." : "Login"}
        </button>
        </div>
    </form>
    
        </div>
        </div>
    );
}