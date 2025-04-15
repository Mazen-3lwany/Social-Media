import axios from "axios"
export interface Postcridit{
    title:string,
    body:string,
    image?:FileList
}
export const createPost =async (postData :Postcridit,token:string)=>{
    
    const formData=new FormData()
        formData.append("title",postData.title)
        formData.append("body", postData.body);
    if (postData.image) {
        formData.append("image", postData.image[0]);
    }
    const response=await axios.post('https://tarmeezacademy.com/api/v1/posts',formData,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data", 
            }
        }
    )
    return response.data.data
};


