import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import styles from "./Login.module.css";

function Login(){
    //db에서 가져온 id,pw 데이터
    const [dbId,setDbId] = useState(null);
    const [dbPw,setDbPw] = useState(null);

    //사용자가 입력한 id,pw
    const [id,setId] = useState("");
    const [pw,setPw] = useState("");

    const navigate = useNavigate();

    async function onSubmit(e){
        e.preventDefault();
        
        if(dbId === id){
            if(dbPw === pw){
                alert('로그인');
                window.sessionStorage.setItem("userId", id);
                navigate('/');
            }else{
                alert('비밀번호가 다릅니다.')
                setPw('');
            }
        }else{
            alert('아이디 혹은 비밀번호가 다릅니다.');
            setId('');
            setPw('');
        }
    };

    async function getDBdata(){
        await axios.get(`/login/check/${id}`)
        .then(res =>{
            res.data.map((data =>(
                setDbId(data.id)
            )));
            res.data.map((data)=>(
                setDbPw(data.pw)
            ))
        });
    }

    useEffect(()=>{
        setId(id);
        setPw(pw);
    },[id,pw]);

    return(
        <div className={styles.wrapper}>
            <form onSubmit={onSubmit}>
                <h1 className={styles.h1}>환영합니다!</h1>
                <input className={styles.input} value={id} onChange={e=>{setId(e.target.value); }} onBlur={getDBdata} type="text" placeholder="id 입력"/> <br />
                <input className={styles.input} value={pw} onChange={e=>{setPw(e.target.value); }} type="password" placeholder="password 입력" />
                <div className={styles.loginInform}>
                    <ul>
                        <Link to="/regist"><li className={styles.a}>회원가입</li></Link>
                        <Link to="/idSearch"><li className={styles.a} style={{color:"gray",textDecoration:"line-through"}}>ID 찾기</li></Link>
                        <li className={styles.a} style={{color:"gray",textDecoration:"line-through"}}>PW 찾기</li>
                    </ul>
                </div>
                <button className={styles.button}> LOGIN </button>
            </form>
        </div>
    )
}

export default Login;