import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "./Regist.module.css"

function Regist(){
    const navigate = useNavigate();

    //아이디 , 비밀번호,비밀번호확인 , 이름, 주소, 이메일, 전화번호
    const [id,setId] = useState("");
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name,setName] = useState('');
    const [addr,setAddr] = useState('');
    const [email, setEmail] = useState('');
    const [tel,setTel] = useState('');

    //id유효성 체크,비밀번호 유효성 체크
    const [checkId,setCheckId] = useState(null);
    const [checkPw,setCheckPw] = useState(null);
    const [checkSameId,setSameCheckId] = useState(null);

    //유효성 메세지
    const [message,setMessage] = useState(null);

    const onChangeId = (e)=>{
        setId(e.target.value);
        
    }

    useEffect(()=>{
        if(id.length >=2 && id.length <=12){
            setMessage("중복 체크를 해주세요!")
        }else{
            setCheckId(false);
            setMessage("2글자 이상 12글자 이하로 작성해주세요.")
        }
        if(id === ""){
            setCheckId(null);
        }
    },[id]);

    const onChangePw = (e) =>{
        setPassword(e.target.value);
    }
    
    
    const onChangePwCon = (e) =>{
        setPasswordConfirm(e.target.value);
    }
    useEffect(()=>{
        if(password === passwordConfirm){
            setCheckPw(true);
        }else{
            setCheckPw(false);
        }
        if(passwordConfirm === ""){
            setCheckPw(null);
        }
    },[password,passwordConfirm])

    const onChangeName = (e) =>{
        setName(e.target.value);
    }

    const onChangeAddr = (e) =>{
        setAddr(e.target.value);
    }

    const onChangeEmail = (e) =>{
        setEmail(e.target.value);
    }

    const onChangeTel = (e) =>{
        setTel(e.target.value);
    }

    //form 에서 넘겨줄 데이터 셋팅
    const data = {
        'id': id,
        'pw': password,
        'pw2': passwordConfirm,
        'name' : name,
        'addr': addr,
        'email': email,
        'tel': tel
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(id,password,passwordConfirm,name,addr,email,tel);

        axios.post("/regist",data)
        .then(res =>{
            console.log("성공?>>",res);
            alert("가입 완료!");
            navigate('/login');
        }).catch(e =>{
            console.log(e);
        })
    }

    const reset = (e) =>{
        e.preventDefault();
        setId("");
        setPassword("");
        setPasswordConfirm("");
        setName("");
        setAddr("");
        setEmail("");
        setTel("");
    }

    const sameCheck = (e)=>{
        e.preventDefault();
        axios.get(`/user/idCheck/${id}`)
        .then(res =>{
            //length 가 0이 아니면 id가 검색 된거니 중복된 아이디!
            if(!(res.data.length >0) && id.length >=2 && id.length <=12){
                setMessage("조건만족!")
                setCheckId("true");
            }else if(id.length >=2 && id.length <=12){
                setMessage("중복된 아이디..!");
            }
        }).catch(e =>{
            console.log(e);
        })
    }
    


    return (
        <div className={styled.conatiner}>
            <form className={styled.form} onSubmit={onSubmit}>
                <h1>회원 가입</h1>
                <fieldset>
                    <table className={styled.table}>
                        <tbody>
                            <tr>
                                <td>아이디<span>(필수)</span></td>
                                <td><input type="text" name="id" required placeholder="2글자 이상 12글자 이하" value={id} onChange={onChangeId}/></td>
                                <td><button style={{width:"77px",fontSize:"10px"}} onClick={sameCheck}>중복체크</button></td>
                            </tr>
                                    {/* 맨처음에 p값 안보여주기 위해 null 사용 */}
                                    {checkId !== null ? checkId ? <tr><td></td><td><p style={{color:"green"}}>{message}</p></td></tr> : <tr><td></td><td><p style={{color:"red"}}>{message}</p></td></tr> : null}
                            <tr>
                                <td>비밀번호<span>(필수)</span></td>
                                <td><input type="password" name="pw" value={password} onChange={onChangePw} required placeholder="비밀번호 8~12자리 특수기호 포함" /></td>
                            </tr>
                            <tr>
                                <td>비밀번호 확인<span>(필수)</span></td>
                                <td><input type="password" value={passwordConfirm} onChange={onChangePwCon} name="pw2" required /></td>
                                {/* 맨처음에 p값 안보여주기 위해 null 사용 */}
                                <td>{checkPw === null ? null :
                                    checkPw ? <p style={{color:"green"}}>일치</p> : <p style={{color:"red"}}>불일치</p>
                                }</td>
                            </tr>
                            <tr>
                                <td>이름<span>(필수)</span></td>
                                <td><input type="text" name="name" value={name} onChange={onChangeName} required /></td>
                            </tr>
                            <tr>
                                <td>주소<span>(필수)</span></td>
                                <td><input type="text" name="addr" value={addr} onChange={onChangeAddr} required /></td>
                            </tr>
                            <tr>
                                <td>이메일<span>(필수)</span></td>
                                <td><input type="email" name="email" value={email} onChange={onChangeEmail} required /></td>
                            </tr>
                            <tr>
                                <td>전화번호<span>(필수)</span></td>
                                <td><input type="tel" name="phone" value={tel} onChange={onChangeTel} required /></td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
                {/* id,pw조건이 만족하고 이름 주소 이메일 전화번호의 값이 들어가 있으면 가입하기 , 조건 만족 x disabled */}
                {((checkId && checkPw) !== null) && (((checkId && checkPw) === true) && (name.length && addr.length && email.length && tel.length) > 0 ) ?
                <button>가입하기</button> : <button style={{background:"#eee"}} disabled>가입하기</button>
                }
                
                <button type="reset" onClick={reset}>다시작성</button>
            </form>
        </div>
    );
}

export default Regist;