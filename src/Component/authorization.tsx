import axios from "axios";
export interface Comment {
    id: number;
    body: string;
    author: {
        id: number;
        profile_image?: string;
        is_fake: number;
        username: string;
        name: string;
        email?: string;
        email_verified_at?: string;
        remember_token?: string;
        created_at: string;
        updated_at: string;
    };
}
export interface Post {
    id: number;
    title: string;
    body: string;
    author: {
    id: number;
    profile_image?: string;
    is_fake: number;
    username: string;
    name: string;
    email?: string;
    email_verified_at?: string;
    remember_token?: string;
    created_at: string;
    updated_at: string;
    };
    image?: string;
    tags: string[];
    created_at: string;
    comments_count: number;
    comments?: Comment[];
}


export async function ShowPosts({ pageParam = 1 }: { pageParam?: number }): Promise<Post[]> {
    const res = await axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${pageParam}`);
    return res.data.data;
}

export async function showSinglePost(id:string){
    const post=await axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
    .then((response)=>{
        return response.data.data as Post
    })
    return post
}