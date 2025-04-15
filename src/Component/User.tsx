import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

    async function showUser(id:string){
        const response=await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
        
        return response.data.data
}
export default function UserComponent(){
    const {id}=useParams()
    const {data,isLoading,error}=useQuery({
        queryKey:['users'],
        queryFn:()=>showUser(id||"")
    })
    
    if(isLoading)
        return <h1>is Loading .....</h1>
    if(error)
        throw error
    console.log(data.email)
    return(
    <div className="w-screen h-screen bg-indigo-300 flex items-center justify-center">
        <main className="flex flex-col items-center justify-center
            bg-indigo-200 px-4
            rounded-2xl shadow-2xl max-w-lg mx-auto h-auto py-16 mt-12 ">
        {/* Profile Image */}
        <img
            src={data.profile_image}
            className="w-35 h-35 rounded-full border-2 border-gray-300 shadow-md"
            alt="Profile"
        />

        {/* Name & Username */}
        <h2 className="mt-4 text-3xl font-bold text-gray-800">{data.name}</h2>
        <p className=" text-gray-600 text-xl mt-2">@{data.username}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 bg-indigo-100 shadow-lg rounded-lg p-6
            mt-6 max-w-md w-full">
            <div>
                <p className="text-gray-500 text-sm font-semibold">Email</p>
                <p className="text-gray-700 text-lg">{data.email}</p>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-semibold">ID</p>
                <p className="text-gray-700 text-lg">{data.id}</p>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-semibold">Post Count</p>
                <p className="text-gray-700 text-lg">{data.posts_count}</p>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-semibold">Comment Count</p>
                <p className="text-gray-700 text-lg">{data.comments_count}</p>
            </div>
        </div>
    </main>
    </div>
    
    )
    }
