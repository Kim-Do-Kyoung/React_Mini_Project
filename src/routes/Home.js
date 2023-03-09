import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import styled from "./Home.module.css"


function Home(){
    const location = useLocation();
    const navigate = useNavigate();
    const [loginCheck,setLoginCheck] = useState(false);


    useEffect(()=>{
        if(location.state === null){
            return;
        }else{
            setLoginCheck(location.state.loginCheck);
        }
    },[])

    const onClick = (e) =>{
        navigate('/',{state:{loginCheck:false}});
        window.location.replace("/");
    }

    return (
        <div className={styled.div} >
            {loginCheck === true ? <h1 className={styled.font}>환영합니다!</h1> : <h3><Link to={"/login"} className={styled.font} >로그인하기</Link></h3>}
            {loginCheck === true ? <button onClick={onClick} className={styled.button} >로그아웃</button> : null}
            <h3><Link to={"/board"} className={styled.font} >게시판</Link></h3>
        </div>
    );
}

export default Home;