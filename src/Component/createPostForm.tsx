import { useMutation } from "@tanstack/react-query"
import { createPost, Postcridit } from "./createPostFn"
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "./ContextProvid";



export default function PostForm(){
    const [postData,setPostData]=useState<Postcridit>({
        title:"",
        body:"",
        image:undefined
    })
    // console.log(postData)
    const {dataRecive}=useAuth()
    
    
    const mutation=useMutation({
        mutationFn:({data,token}:{data:Postcridit,token:string})=>createPost(data,token),
        onSuccess:(data)=>{
            console.log("create post suceesfull",data)
            alert("create post successfull")
        
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
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=event.target
        setPostData((prev)=>({...prev,[name]:value}))
    }
    const handleChangeImage=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,files}=event.target
        setPostData((prev)=>({...prev,[name]:files}))
    }
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        if(dataRecive==null){
            return null
        }
        mutation.mutate({data:postData,token:dataRecive.token})

    }
    

    return(
        
        

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
        <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-blue-400"
                placeholder="Enter title"
                required
            />
        </div>

          {/* Body Field */}
        <div>
            <label className="block text-gray-700 font-medium">Body</label>
            <input
                name="body"
                value={postData.body}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-blue-400"
                placeholder="Enter post content"
                required
            />
        </div>

          {/* Image Upload */}
        <div>
            <label className="block text-gray-700 font-medium">Upload Image</label>
            <input
                type="file"
                name="image"
                
                onChange={handleChangeImage}
                className="w-full mt-1 p-2 border rounded-lg bg-white cursor-pointer focus:outline-none"
                accept="image/*"
            />
        </div>

          {/* Submit Button */}
        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600
            text-white py-2 px-4 rounded-lg font-medium transition duration-300"
        >
            Create Post
        </button>
        </form>
    )
}