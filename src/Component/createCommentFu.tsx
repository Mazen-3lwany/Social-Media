import axios from "axios"
export interface commentType{
    body:string
}
export const createComment=async({comment,id,token}:{comment:string,token:string,id:string})=>{
    const response=await axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
        {
            body:comment
            },
        {headers:
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }
    )
    return response.data.data

}