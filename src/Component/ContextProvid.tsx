import { createContext , useContext, useState } from "react";
interface UserData {
    user: {
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
    token: string;
    
}
export interface AuthContextType{
        dataRecive:UserData|null,
        setDataRecive:(userData:UserData|null)=>void
}

const AuthContext=createContext<AuthContextType|null>(null);
export const AuthProvider=( {children}:{children:React.ReactNode})=>{
    const [dataRecive, setDataRecive] = useState<UserData | null>(() => {
        try {
            const storedData = localStorage.getItem("dataRecived");
            return storedData ? JSON.parse(storedData) : null;
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            return null;
        }
    });
    
        const  handleToken=(userData:UserData|null)=>{
            setDataRecive(userData);
        if(userData)
            localStorage.setItem('dataRecived', JSON.stringify(userData))
        else
            localStorage.removeItem('dataRecived')
    }
    return(
        <AuthContext.Provider value={{dataRecive,setDataRecive:handleToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context

}