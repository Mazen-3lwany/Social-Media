import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {  createComment } from "./createCommentFu";
import { useAuth } from "./ContextProvid";
import axios from "axios";
import { useState } from "react";


export default function CommentComponent(){
    const [commentData,setCommentData]=useState<{
        comment:string
    }>(
        {
            comment:""
        })
    const {id}=useParams()
    const {dataRecive}=useAuth()

    const Mutation=useMutation({
        mutationFn:({id,comment,token}:{id:string,comment:string,token:string})=>
            createComment({id,comment,token}),
        onSuccess:(data)=>{
            console.log("create comment successfull ",data)
            alert('comment puplished')
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
        setCommentData((prev)=>({...prev,comment:e.target.value}))

    }
    const handelSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        if(dataRecive==null){
            return null
        }
        if(!id){
            return null
        }
        console.log(commentData.comment)
        console.log(dataRecive.token)
        Mutation.mutate({comment:commentData.comment,token:dataRecive.token,id})
        
    }
    return(
        <form onSubmit={handelSubmit}>
        <div className="mt-3">
        <label className="block text-gray-700 font-medium ">Comment:</label>
        <input
            name="body" 
            value={commentData.comment}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-white mb-3 border rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-white"
            placeholder="Enter post content"
            required
        />
    </div>

        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600
            text-white py-2 px-4 rounded-lg font-medium transition duration-300"
        >
            Create Comment
        </button>
        </form>
    )
}