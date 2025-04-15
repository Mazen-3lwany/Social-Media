import axios from "axios"

export const LoginUser=async(userlogin:{
    username:string,
    password:string
})=>{
    const responselog=await axios.post('https://tarmeezacademy.com/api/v1/login',userlogin,{
        headers:{"Accept":"application/json"}
    })
    return responselog.data
}