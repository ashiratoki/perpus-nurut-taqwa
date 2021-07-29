//@ts-check
import  '../styles/Home.module.css'
import React, {useImperativeHandle, useState,useEffect} from 'react' 
import LoginForm from '../components/LoginForm';
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'

import {account} from '../service/AtomState'
import { useRecoilState } from 'recoil';


async function fetcher(url){
  const res = await fetch(url);
  return res.json();
}
async function apiFetch(url, method = "GET", body = null){
  let option = {
    method,
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body : JSON.stringify(body)
  }
  if (body === null) {
    delete option.body
  }
  try {
    const res = await fetch(url, option);
  return res.json();
  } catch (error) {
    throw new Error(error);
  }
}


export default function App() {
const [users , setUser] = useState ({username:''});

  const [user , setAccountLogin] = useRecoilState(account);
  const [error , setError] = useState ('');
  let setLoginUser = false;
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

  const url =`${http}://${host}/api/tb_user`;
  // const {data} = useSWR(url,fetcher);
  // console.log(data);
  // const adminUSer = {
  // username :"admin",
  // password : "admin123"
  // } 

  const loginPost = async (body) =>{
    const response = await apiFetch(url, "POST", body);
    if (response.status == "Success") {
      setAccountLogin(response.data);
      if(response.data.role == "admin"){
            setUser({
              username:response.data.username,
            })
        Router.push('/admin/home')
      }else{
        Router.push('/user/home')
      }
      // localStorage.setItem("isUser", JSON.stringify({auth : response.auth, role :response.data.role}));
      // checkAlreadyUSer(response.role, true)
    } else {
      setError(response.message)
    }
  }
  
  // const checkAlreadyUSer = (role ="siswa", isLogin = false)=>{
  //  const user =  JSON.parse(localStorage.getItem("isUser"));
  //   if (isLogin) {
  //     if(role == "admin"){
  //       Router.push('/admin/home').then(()=>{
  //         location.reload();
  //       })
  //     }else{
  //         Router.push('/user/home').then(()=>{
  //           location.reload();
  //         })
  //     }
  //   } else {
  //     if (user !== null) {
  //       if(user.role == "admin"){
  //         Router.push('/admin/home').then(()=>{
  //           location.reload();
  //         })
  //       }else{
  //           Router.push('/user/home').then(()=>{
  //             location.reload();
  //           })
  //       }
  //     } 
  //   }
  // }

  // useEffect(()=>{
  //   checkAlreadyUSer();
  // })
  // {data.map((tblDat,index)=>
  
    
  //   {tblDat.username}
  //   {tblDat.password}
  
  //   )}


// const [user , setUser] = useState ({username:''});


// const Login = details => {
//   console.log(details);
//   if(details.username == adminUSer.username && details.password == adminUSer.password){
//     console.log('LogIn');
//     setUser({
//       username:details.username,

//     })
//     Router.push('/admin/home')
//   }

//   else{
//     for(let i=0;i<data.length;i++){
//       if(details.username == data[i].username && details.password == data[i].password){
//         setLoginUser = true
//       }
//     }
//     if(setLoginUser){
//       Router.push('/user/home')
//     }else{
//       console.log('details tidak ada ! ')
//       setError('Username & Password Salah!')
//     }
    
//   }
// }

const Logout =() =>{
  console.log('Logout')
 
}

  return (
    <div>

    <section className="login-clean">
     
       <LoginForm Login = {loginPost} error = {error} />
    </section>
  
  
    </div>
  )
  
}
