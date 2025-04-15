import axios from "axios";
export interface FFormData{
    username:string,
    password:string,
    name:string,
    email:string,
    image?:FileList
}


export const registerUser=async(userData:FFormData
    )=>{
    

    const dataForm = new FormData();
    dataForm.append("name", userData.name);
    dataForm.append("username", userData.username);
    dataForm.append("email", userData.email);
    dataForm.append("password", userData.password);
if (userData.image) dataForm.append("image", userData.image[0]);

    const response=await axios.post('https://tarmeezacademy.com/api/v1/register',dataForm,{
        headers:{"Content-Type": "multipart/form-data"}
    });

    return response.data
};  