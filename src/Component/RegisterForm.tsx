import { useMutation } from '@tanstack/react-query'
import {useState} from 'react'
import { FFormData, registerUser } from './RegisterFun'
import axios from "axios";
import { useAuth } from './ContextProvid';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm(){
    const [formData,setFormData]=useState<FFormData>({
    username:"",
    password:"",
    name:"",
    email:"",
    image:undefined
})
const {setDataRecive}=useAuth();
const navigate=useNavigate()

const mutation = useMutation({
    mutationFn:(formData:FFormData)=> registerUser(formData),
    onSuccess: (data) => {
        console.log("Registration successful:", data);
        setDataRecive(data)
        alert("User registered successfully!");
        navigate('/')
    },
    onError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
        console.error("Registration error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Registration failed");
        } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
        }
    }
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.files });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(formData); //for start send request
};
return (
    <div className='w-screen h-screen bg-cyan-700'>
    <div className='py-20' >
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">Register</h2>

{mutation.isError && (
    <p className="text-red-500 text-sm text-center mb-2">Error:</p>
)}

<form 
    onSubmit={handleSubmit} 
    className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto"
>
    <div className="space-y-4">
    <label >
        username :
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
        Email :
    <input  
        type="email" 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
        required 
        className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
    />
    </label>

    <label>
        Name:
    <input 
        type="text" 
        name="name" 
        placeholder="Full Name" 
        onChange={handleChange} 
        required 
        className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
    />
    </label>
    <label>
        Password :
    <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        onChange={handleChange} 
        required 
        className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
    />
    </label>
    <label>
        Image
        <input
                type="file"
                name="image"
                
                onChange={handleChangeImage}
                className="w-full mt-1 mb-2 p-2 border rounded-lg bg-gray-50 cursor-pointer focus:outline-none"
                accept="image/*"
            />
        
    </label>
    
    <button 
        type="submit" 
        disabled={mutation.isPending} 
        className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 
        transition disabled:bg-gray-400"
        
    >
        {mutation.isPending ? "Registering..." : "Register"}
    </button>
    
    </div>
</form>

    </div>
    </div>
);
}