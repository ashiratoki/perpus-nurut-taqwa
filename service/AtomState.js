import {atom, useRecoilState} from 'recoil'

export const LoginState = atom ({
    key : "LoginState",
    default: false
})


export const account = atom ({})

export const checkUser = (data) =>{
    if (data !== null) {
        const [user, setAccount] =useRecoilState(account)
        setAccount(data);
        return user;
    }
}

export const SessionState = atom ({
    key : "varSession",
    default : null
})
