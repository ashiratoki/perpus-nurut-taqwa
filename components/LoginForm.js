//@ts-check
import React ,{useState} from'react';
import {LoginState, SessionState} from '../service/AtomState'
import { useRecoilState } from 'recoil';
function LoginForm({Login , error }){
    const [details ,setDetails] = useState({username :'', password: ''});
    const [login , setLogin] = useRecoilState(LoginState)
    const [session ,setSession] = useRecoilState(SessionState)

    const submitHandler = e =>{
        e.preventDefault();
        const user = Login(details);
        // @ts-ignore
        let obj = {...obj, default : user.auth};
        setLogin(obj);

        const dt = new Date();
        setLogin(true)
        setSession (dt.getTime()+ 60 * 10 * 1000)
        console.log(session);
    }
    return(
        <form onSubmit={submitHandler}>
        <div className="illustration" style={{"height": "210.328px"}}><img src="/smk.png" alt="Picture of the author" style={{width:'170px',height:'170px', margin:'auto'}} className="d-flex m-auto"/>
            <h1 style={{marginTop:"11px", fontSize: "54px", color:"#2E8B57"}}>LOGIN</h1>
            <p style={{fontSize: "16px", color: "rgb(25,25,25)", textAlign:"center",fontWeight: 200}}>SMK NURUT TAQWA SONGGON</p>
        </div><br/><br/><br/>
        {(error!='')?( <p style={{fontSize: "16px",color: "#2E8B57",textAlign: "center",fontWeight: "bold",marginTop: "18px"}}  >{error}</p>):''}
        <div className="mb-3">
          <input 
          className="form-control" 
          type="text" 
          id="username" 
          onChange={e =>setDetails({...details, username: e.target.value})} value={details.username}
   
          name="username" 
          placeholder="Username" 
          style={{marginTop: "72px"}}
         
          /></div>
        <div className="mb-3">
          <input 
        className="form-control" 
        type="password" 
        name="password" 
        placeholder="Password"
        onChange={e =>setDetails({...details, password: e.target.value})} value={details.password}
     
        /></div>
        <div><a >
          <button 
          className="btn btn-primary" 
          type="submit" 
          style={{width: '240px',background: "#2E8B57"}}
          >Login</button>
          </a></div>
        <p style={{fontSize: "16px",color: "#2E8B57",textAlign: "center",fontWeight: "bold",marginTop: "18px"}}>Jika tidak mengetahui username dan password, silahkan menghubungi Admin</p>
        <span style={{fontSize: "16px",color: "#2E8B57",textAlign: "center",fontWeight: "bold",marginTop: "18px"}}>Bu Reni (+62 812-3279-0730)</span>
     
    </form>
    )
}
export default LoginForm;