// import '../styles/globals.css'
import React from 'react'
import App from 'next/app'
import {useRouter} from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Bootstrap-Callout-Success.css'
import '../styles/Features-Boxed.css'
import '../styles/Footer-Basic.css'
import '../styles/Footer-Clean.css'
import '../styles/Login-Form-Clean.css'
import '../styles/Navigation-with-Search.css'
import '../styles/Pretty-Header.css'
import '../styles/Pretty-Registration-Form.css'
import '../styles/Projects-Clean.css'
import '../styles/styles.css'
import 'react-bootstrap'
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../styles/Features-Boxed.css"
import "../styles/Home.module.css"
import"../styles/untitled.css"
import "../styles/globals.css"
import "../styles/bootstrap.min.css"
import "../styles/fonts/fontawesome-all.min.css"
import "../styles/fonts/font-awesome.min.css"
import "../styles/fonts/fontawesome5-overrides.min.css"
import LayoutAdmin from'../components/layout/admin/layout'
import LayoutUser from'../components/layout/user/LayoutUser'

//auth
import {RecoilRoot} from 'recoil'



function MyApp({ Component, pageProps }) {
  const router = useRouter()
  if(router.pathname.startsWith('/admin/')){
    return(
      <RecoilRoot>
      <LayoutAdmin>
          <Component {...pageProps} />
      </LayoutAdmin>
      </RecoilRoot>
    )
  }
  else if(router.pathname.startsWith('/user/')){
    return(
      <RecoilRoot>
      <LayoutUser>
          <Component {...pageProps} />
    </LayoutUser>
    </RecoilRoot>
    )
  }
  else{
    return <RecoilRoot> <Component {...pageProps}  /> </RecoilRoot>
    
  }
}
export default MyApp
