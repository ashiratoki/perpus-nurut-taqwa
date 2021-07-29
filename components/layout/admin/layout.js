//@ts-check
import Side from './side'
import Header from './header'
import Footer from './footer'
import ImportScript from './importScript'
import { useRecoilState } from 'recoil';
import Link from 'next/link'
import {LoginState} from '../../../service/AtomState'
import { useEffect } from'react';
import Router, { useRouter } from 'next/router'

const LayoutAdmin = ({children}) => {
    const [login , setLogin] = useRecoilState(LoginState);
    useEffect(()=>{
      if (!login) {
        Router.push('/');
      }
    })
    return (
        <div >
            {login ?
            <div>
            <div id="wrapper">
                <Side />
                <div className="d-flex flex-column" id="content-wrapper" >
                <Header/>
                {children}
                </div>
            </div>    
            <Footer/>
            <ImportScript/>    
            </div>
            :
            <>
        
                  <div className="row justify-content-center align-items-center vh-100 ">
                    <div className="col-md-6 text-center">
                  Not Login 
                  </div>
                      </div>
         
           </>
          }
        </div>
    )
}
export default LayoutAdmin;