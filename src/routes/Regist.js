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
    const [checkPwCon,setCheckPwCon] = useState(null);


    //유효성 메세지
    const [idMessage,setIdMessage] = useState(null);
    const [pwMessage,setPwMessage] = useState(null);
    const [pwConMessage,setConPwMessage] = useState(null);


    const onChangeId = (e)=>{
        const currentId = e.target.value;
        setId(currentId);
        const regex = /[a-z0-9]{2,12}$/;
        if(regex.test(currentId)){
            setCheckId(false);
            setIdMessage("중복 체크를해주세요")
        }else{
            setCheckId(false);
            setIdMessage("2~12 사이 숫자 및 영문만");
        }
        
    }
    // 정규식 쓰기 전 사용했던 코드
    // useEffect(()=>{
    //     if(id.length >=2 && id.length <=12){
    //         setIdMessage("중복 체크를 해주세요!")
    //     }else{
    //         setCheckId(false);
    //         setIdMessage("2글자 이상 12글자 이하로 작성해주세요.")
    //     }
    //     if(id === ""){
    //         setCheckId(null);
    //     }
    // },[id]);

    const onChangePw = (e) =>{
        const currentPw = e.target.value;
        setPassword(currentPw);
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
        if(regex.test(currentPw)){
            setPwMessage("안전한 비밀번호") ;
            setCheckPw(true);
        }else{
           setPwMessage("숫자+영문자+특수문자 조합으로 8자리 입력");
           setCheckPw(false);
        }

    }
    
    
    const onChangePwCon = (e) =>{
        setPasswordConfirm(e.target.value);
    }
    useEffect(()=>{
        if(password === passwordConfirm){
            setCheckPwCon(true);
            setConPwMessage("비밀번호가 일치!")
        }else{
            setCheckPwCon(false);
            setConPwMessage("비밀번호가 불일치!")
        }
        if(passwordConfirm === ""){
            setCheckPwCon(null);
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
        setCheckId(null);
        setCheckPw(null);
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
                setIdMessage("조건만족!")
                setCheckId(true);
            }else if(id.length >=2 && id.length <=12){
                setCheckId(false);
                setIdMessage("중복된 아이디..!");
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
                                    {checkId !== null ? 
                                        checkId ? <tr><td></td><td><p style={{color:"green"}}>{idMessage}</p></td></tr> 
                                            : <tr><td></td><td><p style={{color:"red"}}>{idMessage}</p></td></tr> 
                                        : null}
                            <tr>
                                <td>비밀번호<span>(필수)</span></td>
                                <td><input type="password" name="pw" value={password} onChange={onChangePw} required placeholder="숫자,영문,특수기호 포함 8자리 이상" /></td>
                            </tr>
                                {checkPw !== null ?
                                    checkPw ? <tr><td></td><td><p style={{color:"green"}}>{pwMessage}</p></td></tr>
                                        : <tr><td></td><td><p style={{color:"red"}}>{pwMessage}</p></td></tr>
                                    :null}
                            <tr>
                                <td>비밀번호 확인<span>(필수)</span></td>
                                <td><input type="password" value={passwordConfirm} onChange={onChangePwCon} name="pw2" required /></td>
                                {/* 맨처음에 p값 안보여주기 위해 null 사용 */}
                                <td>{checkPwCon === null ? null :
                                    checkPwCon ? <p style={{color:"green"}}>{pwConMessage}</p> : <p style={{color:"red"}}>{pwConMessage}</p>
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
                {((checkId && checkPwCon) !== null) && (((checkId && checkPwCon) === true) && (name.length && addr.length && email.length && tel.length) > 0 ) ?
                <button>가입하기</button> : <button style={{background:"#eee"}} disabled>가입하기</button>
                }
                
                <button type="reset" onClick={reset}>다시작성</button>
            </form>
        </div>
    );
}

export default Regist;