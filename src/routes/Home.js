import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "./Home.module.css"


function Home(){
    const [loginCheck,setLoginCheck] = useState(false);

    useEffect(()=>{
        if(window.sessionStorage.getItem("userId") === null){
            setLoginCheck(false);
        }else{
            setLoginCheck(true);
        }
    },[])

    const onClick = (e) =>{
        e.preventDefault();
        window.sessionStorage.removeItem("userId");
        window.location.replace("/")
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