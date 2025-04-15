// import Auth from "./Component/authorization";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./Component/ContextProvid";
import SinglePostPage from "./Component/SinglePostPage";
import UserComponentPage from "./Component/UserComponentPage";
import RegisterFormPage from "./Component/RegisterFormPage";
import LoginFormPage from "./Component/LoginFormPage";

export default function App(){
  const queryClient = new QueryClient();
  return(
    <>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/posts/:id" element={<SinglePostPage/>}/>
        <Route path="/users/:id" element={<UserComponentPage/>}/>
        <Route path="/register" element={<RegisterFormPage/>}/>
        <Route path="login" element={<LoginFormPage/>}/>
      </Routes>

    </QueryClientProvider>
    </AuthProvider>
      
      {/* <Auth/>  */}
    </>
  
    
  )
}