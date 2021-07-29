//@ts-check
import CardBukuTerbaru from '../../components/user/cardBukuTerbaru'
import CardPinjamanSaya from '../../components/user/cardPinjamanSaya'
import Carousel from '../../components/user/carousel'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import {LoginState} from '../../service/AtomState'
import { useRecoilState } from 'recoil';


export default function Home(){
  const [login , setLogin] = useRecoilState(LoginState);

  

  return(
    

    
        <div>

          <div>
            {login ?
            <div>
<div id="content">
  <div className="container">
    <div className="row">
      <div className="col" style={{marginTop: 40, marginBottom: 29}}>
        
      </div>
    </div>
  </div>
  <Carousel/>

 
  <div id="buku-terbaru" style={{marginTop:'40px'}}>
    <section className="projects-clean" style={{marginTop: '-17px'}}>
      <h3 className="name" style={{margin: 13, textAlign: 'center', fontSize: 34, borderBottomColor: 'var(--bs-indigo)', height: 62, paddingTop: 20}}><strong>BUKU TERBARU</strong></h3>
      <div className="container">
        <div className="row projects">
         
            <CardBukuTerbaru />

     
          {/* Here Card Buku Terbaru */}
          
        </div>
      </div>
    </section>
  </div>
</div>
              </div>
            :
            <>
           <p>Not Login </p>
              <Link href='/'>
              <button 
                className="btn btn-primary" 
                type="button" 
                style={{width: '200px',background: "blue"}}
                >Login</button></Link>
             </>
          }
          </div>
           
      
</div>
    )
}