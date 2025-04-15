
import profile from "../Images/user.png"
import { Post } from "./authorization";
import { useAuth } from "./ContextProvid";
import CommentComponent from "./CommentForm";
import { Link } from "react-router-dom";

export default function PostComponent({ post }: { post: Post }) {
    const {dataRecive}=useAuth()
    return (
<div className="w-screen min-h-screen  bg-indigo-300 flex flex-col ">
    <div className="w-xl m-auto   rounded-full mt-24" >
        <div key={post.id} className="mb-5 bg-indigo-200 p-5 rounded-lg shadow-md">
        {/* Post Header */}
        <div className="flex flex-row items-center mb-3">
            <Link to={`/users/${post.author.id}`}>
            <img
            src={post.author?.profile_image || profile}
            className="w-15 h-15 rounded-full"
            alt="Profile"
            />
            </Link>
            <div className="flex flex-col justify-center ml-3">
            <p className=" text-xl font-semibold">
            {post.author?.name || "Unknown"}
            </p>
                <p className="text-gray-500 text-sm ">
                    {post.created_at}📅
                </p>
            </div>
        </div>

        {/* Post Title & Content */}
        <div className="ml-4 ">
        <h2 className="text-xl font-bold mb-1 ">{post.title || "No Title"}</h2>
        <p className="text-gray-700 mb-2">{post.body || "No content available"}</p>
        </div>


        {/* Post Image */}
        
        {post.image && (
    <div className="flex justify-center">
        <img
            src={post.image}
            className="w-full max-h-96 object-cover rounded-lg"
            alt="Post"
        />
    </div>
)}

        {/* Post Info */}
        

        
        

        {/* Comments Section */}
        {post.comments?(post.comments.map((comment)=>(
            <div className="flex items-baseline">
                <img src={comment.author.profile_image} className="w-8 h-8 rounded-full"/>
            <div className="bg-white m-4 max-w-84 rounded-2xl shadow-black flex flex-col 
            justify-center p-3 min-w-54">
                <h3>{comment.author.name}</h3>
                <p>{comment.body}</p>
            </div>
            </div>
        )
        )):null
        }
        {dataRecive?<CommentComponent/>:(
        <p className="text-blue-500 cursor-pointer mt-3 ml-104">
            💬 {post.comments_count} Comments
        </p>)}
    </div>
    </div>
</div>
);
}