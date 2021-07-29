
import React, { useState } from 'react';
import {useRouter} from 'next/router';
const Login =() =>{

  return(
    <div>
      <form >
        <div className="illustration" style={{"height": "210.328px"}}><img src="/smk.png" alt="Picture of the author" style={{width:'170px',height:'170px', margin:'auto'}} className="d-flex m-auto"/>
            <h1 style={{marginTop:"11px", fontSize: "3 54px;", color:"#2E8B57"}}>LOGIN</h1>
            <p style={{fontSize: "16px", color: "rgb(25,25,25)", textAlign:"center",fontWeight: 200}}>Sistem Perpustakaan SMK</p>
        </div><br/><br/><br/>
        <div className="mb-3">
          <input 
          className="form-control" 
          type="text" 
          id="username" 
          name="username" 
          placeholder="Username" 
          value = {username} 
          onChange ={(e) => setUsername(e.target.value)}
          style={{marginTop: "72px"}}
         
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
          >Login</button>
          </a></div>
        <p style={{fontSize: "16px;",color: "#2E8B57",textAlign: "center",fontWeight: "bold",marginTop: "18px"}}>Jika tidak mengetahui username dan password, silahkan menghubungi Admin</p><a href="register.html"></a>
     
    </form>
    </div>

  );
};

export default Login;