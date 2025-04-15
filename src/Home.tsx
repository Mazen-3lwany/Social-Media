
import { useAuth } from "./Component/ContextProvid";
import PostForm from "./Component/createPostForm";
import Navbar from "./Component/NavBar";
import Posts from "./Component/Post";
import { Dialog, DialogTrigger,DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    } from "./components/ui/dialog";

export default function Home(){
    const {dataRecive}=useAuth()
    return(
        <div className="bg-gray-600">
        
        <Navbar/>
        <Posts/>
        
        <Dialog>
        {dataRecive&&<DialogTrigger className="fixed bottom-4 right-4 p-2 
        rounded-3xl bg-gray-300">New Post</DialogTrigger>}
            <DialogContent className="bg-white">
                <DialogHeader>
                <DialogTitle>Create Post </DialogTitle>
                <DialogDescription className="text-4xl text-gray-400">
                    Enters Post details
            </DialogDescription>
            </DialogHeader>
            <PostForm/>
        </DialogContent>
        </Dialog>

        
        </div>
    )
}