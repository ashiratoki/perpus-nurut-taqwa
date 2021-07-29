//@ts-check
import Header from './Header'
import Footer from './Footer'
import {LoginState, SessionState} from '../../../service/AtomState'
import { useRecoilState } from 'recoil';
import { useEffect } from'react';
import Router, { useRouter } from 'next/router'

import Link from 'next/link'
import router from 'next/router';
const LayoutUser = ({children}) => {
    const [login , setLogin] = useRecoilState(LoginState);
    const [session ,setSession] = useRecoilState(SessionState)


    useEffect(()=>{
      if (!login ) {
        Router.push('/');
      }
    })

    // useEffect(()=>{
    //   if (session !=null) 
    //   {
    //     const dt = new Date();
    //   if (session > dt.getTime()){
    //     setLogin(true)
    //   }
    //   else{
    //     setLogin(false)
    //     Router.push('/')
    //   }
    //   }
    // },[session])


 

  //   const handleLogin = () =>{  
  //   const dt = new Date()
  // setSession (dt.getTime()+ 10 * 1 * 1000)
  //     if (session > dt.getTime()){
  //     setLogin(true)
  //     alert('anda masih login')
  //     }
  //     else{
  //       alert('sesi anda habis ')
  //       Router.push('/')
  //     }
    
  //     console.log(session);
  //   }

  //   const addHours =() =>{
  //     const dt = new Date();
  //     console.log(session);
  //     console.log(dt.getTime());
  //   }
    return (
      
        <div>
          
            {login? 
             
            <div >
              
            <Header />
       
            {children}

            <Footer />
           
            {/* <button type='submit' onClick={handleLogin}>cek</button>
     
         <button type='submit' onClick={addHours}>console</button>
      */}
            </div>
            :
         
            <>
         
                    <div className="row justify-content-center align-items-center vh-100 ">
                      <div className="col-md-6 text-center"  >
                    Not Login 
                    </div>
                    {/* <button type='submit' onClick={handleLogin}>hahah1</button>
         <button type='submit' onClick={addHours}>hahaha</button> */}
                        </div>
          
             </>
           
          }
        </div>
    )
}
export default LayoutUser;