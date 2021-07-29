//@ts-check
import Dropdown from 'react-bootstrap/Dropdown'
import {Navbar ,Nav , InputGroup ,Form,FormControl, Button, Container} from 'react-bootstrap'
import Icon from './Icon'
import Link from 'next/link'
import React ,{useEffect} from'react';
import {LoginState, SessionState} from '../../../service/AtomState'
import {account, } from '../../../service'
import { useRecoilState } from 'recoil';
import useSWR from 'swr'
import Router, { useRouter } from 'next/router'



export default function  header (){
  const [user , setUserAccount] = useRecoilState(account);
  console.log(user)
  const [session ,setSession] = useRecoilState(SessionState)
  const [login , setLogin] = useRecoilState(LoginState);

  // const url ='http://localhost:3000/api/tb_user';
  // const {data} = useSWR(url,fetcher);
  // console.log(data);
  const handleLogin = () =>{  
    const dt = new Date()
  setSession (dt.getTime()+ 62 * 10 * 1000)
      if (session > dt.getTime()){
      setLogin(true)
      // alert('anda masih login')
      }
      else{
        alert('sesi anda habis Mohon untuk kembali login ')
        Router.push('/')
      }
    
      console.log(session);
    }

    const addHours =() =>{
      const dt = new Date();
      console.log(session);
      console.log(dt.getTime());
    }
    return (
    
 <div className= 'fixed-top '>
 <Icon/>
 <Navbar   collapseOnSelect  bg="success" expand="sm"  variant="dark">
       <Container  >
         <Navbar.Toggle aria-controls ='responsive-navbar-nav'/>
        
         <Navbar.Collapse id='responsive-navbar-nav'>  
         <Dropdown >
   <Dropdown.Toggle variant="success" id="dropdown-basic">
   <img className="border rounded-circle img-profile" src="../../assets/img/smk.png" style={{width: 30, height: 30}} />
      
   </Dropdown.Toggle>
 
   <Dropdown.Menu>
     <Link href='/'><Dropdown.Item href="/">Log Out</Dropdown.Item></Link>
   </Dropdown.Menu>
 </Dropdown>     

             <Navbar.Brand>{user.nama}</Navbar.Brand>
             <Nav className="nav-item "onClick={handleLogin}>
       <Link href="/user/home" ><a className="nav-link"  ><i className="fas fa-tachometer-alt"  style={{color: 'rgb(255,255,255)', fontSize: 18}} /><span style={{fontSize: 18,}}>&nbsp;Home</span></a></Link>
       <Link href={`/user/pinjaman?nis=${user.nis}`}><a className="nav-link " ><i className="fa fa-warning"  style={{color: 'rgb(255,255,255)',fontSize: 18}} /><span style={{ fontSize: 18,}}>&nbsp;Pinjaman</span></a></Link>
       <Link href="/user/cari"><a className="nav-link  "  ><i className="fa fa-book" style={{color: 'rgb(255,255,255)',fontSize: 18}} /><span style={{ fontSize: 18,}}>&nbsp;Buku</span></a></Link>
       
     </Nav>
     </Navbar.Collapse>
     <form style={{marginTop:'10px'}}>
        <b><h5 style={{color:"white"}}> PERPUSTAKAAN SMK NURUT TAQWA   </h5></b>
        </form>
     {/* <form>
     <InputGroup size="sm" className="mb-3">
     <InputGroup.Prepend>
     <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
     </InputGroup.Prepend>
     <Link href="/user/cari"><Button className="btn btn-dark">Cari</Button></Link>
   
     <Button className="btn btn-secondary" style={{marginLeft:'20px'}} onClick={addHours}>Cek Status </Button>

   </InputGroup>
   </form> */}
 </Container>
 </Navbar>
</div>

    )
}