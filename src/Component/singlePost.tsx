import {useQuery} from '@tanstack/react-query'
import { showSinglePost } from './authorization'
import { useParams } from 'react-router-dom'
import PostComponent from './postComponent'
export default function SinglePost(){
    const {id}=useParams()
    
    const {data ,isLoading ,error}=useQuery({
        queryKey:['post'],
        queryFn:()=>showSinglePost(id || ""),
    })
    if(isLoading) return <p>is Loading .....</p>
    if(error) return <p>any </p>
    // console.log(data)
    return (
        
        data&&<PostComponent post={data}/>
    )
}

// showSinglePost                       showSinglePost(id)