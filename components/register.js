//@ts-check
import React, { useState } from 'react';
import {useRouter} from 'next/router';

const Register =() =>{

    const [nis, setNis] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
    const http = host === 'localhost:3000' ? 'http' : 'https'
    async function submitHandler(e) {
        // setSubmitting(true)
        e.preventDefault()
        try {
            const res = await fetch(`${http}://${host}/api/create-register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                nis,
                username,
                password
              }),
            })
            // setSubmitting(false)
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            router.push('/')
            alert("Penambahan Data Sukses")
          } catch (e) {
            throw Error(e.message)
          }
    }

  return(
    <div>
      <form onSubmit={submitHandler}>
        <div className="illustration" style={{"height": "210.328px"}}><img src="/smk.png" alt="Picture of the author" style={{width:'170px',height:'170px', margin:'auto'}} className="d-flex m-auto"/>
            <h1 style={{marginTop:"11px", fontSize: "3 54px;", color:"#2E8B57"}}>Register</h1>
            <p style={{fontSize: "16px", color: "rgb(25,25,25)", textAlign:"center",fontWeight: 200}}>Sistem Perpustakaan SMK</p>
        </div><br/><br/><br/>
        <div className="mb-3">
          <input 
          className="form-control" 
          type="text" 
          id="nis" 
          name="nis" 
          placeholder="nis" 
          value = {nis} 
          onChange ={(e) => setNis(e.target.value)}
          /></div>
        <div className="mb-3">
          <input 
          className="form-control" 
          type="text" 
          id="username" 
          name="username" 
          placeholder="Username" 
          style={{marginTop: "72px"}}
          value = {username} 
          onChange ={(e) => setUsername(e.target.value)}
          /></div>
        <div className="mb-3">
          <input 
        className="form-control" 
        type="password" 
        name="password" 
        placeholder="Password"
        value = {password} 
        onChange ={(e) => setPassword(e.target.value)}
        /></div>
        <div><a >
          <button 
          className="btn btn-primary" 
          type="submit" 
          style={{width: '240px',background: "#2E8B57"}}
          >Register</button>
          </a></div>
        <p style={{fontSize: "16px;",color: "#2E8B57",textAlign: "center",fontWeight: "bold",marginTop: "18px"}}>Jika tidak mengetahui username dan password, silahkan menghubungi Admin</p><a href="register.html"></a>
     
    </form>
    </div>

  );
};

export default Register;