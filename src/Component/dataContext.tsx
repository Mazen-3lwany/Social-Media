import {  createContext, useContext, useState } from "react"

export interface datacontextType{
    registerData:string|null
    setRegisterData:(registerData:string|null)=>void
}
const DataContext=createContext<datacontextType|null>(null)  
export  const DataComponent=({childern}:{childern:React.ReactNode})=>{
    const [registerData,setRegisterData]=useState<string|null>(localStorage.getItem('registerData'))

    function handeleregisterData(newRegisterData:string|null){
        setRegisterData(newRegisterData)
        if(newRegisterData){
            localStorage.setItem('registerData',newRegisterData)
        }
        else{
            localStorage.removeItem('registerData')
        }

    }
    return(
        <DataContext.Provider value={{registerData,setRegisterData:handeleregisterData}}>
            {childern}
        </DataContext.Provider>   
        )

}
export const useRegData=()=>{
    const datacontext=useContext(DataContext)
    if(!datacontext)
        throw  new Error("useAuth must be used within an AuthProvider")
    else
    return datacontext

}

