import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "../routes/Board.module.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function BoardDetail(){
    const navigate = useNavigate();

    const params = useParams();

    const [id,setId] = useState("")
    const [name,setName] = useState("");
    const [boardTitle,setBoardTitle] = useState("");
    const [boardContent,setBoardContent] = useState("");

    useEffect(()=>{
        axios.get(`/detail/${params.board_id}`)
        .then(res =>{
            console.log(res.data);
            res.data.map((data) => (
                setId(data.BOARD_ID),
                setName(data.REGISTER_ID),
                setBoardTitle(data.BOARD_TITLE),
                setBoardContent(data.BOARD_CONTENT)
            ))
        })
    },[])

    const onClick = (e) =>{
        e.preventDefault();
        navigate("/board");
    }

    function boardDelete(e){
        e.preventDefault();
        alert("삭제!");

        const data = {
            'id' : id
        };
        const config = {"Content-Type": 'application/json'};
    
        axios.post("/delete",data,config)
            .then(res=>{
                console.log("성공?",res);
                navigate("/board");
            }).catch(err =>{
                console.log("에러>>",err);
        })
    }

    return (
        <div style={{textAlign:"center",margin:"50px",background:"white",padding:"20px",borderRadius:"20px"}}>
            <Container className="panel">
                <div style={{textAlign:"center"}}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="작성자"
                        className="mb-3"
                        >
                        <Form.Control type="text" name="name" style={{width:"100%",marginTop:"80px"}} value={name} disabled
                        className={styled.input} /> <br />
                    </FloatingLabel>
                </div>

                <div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="제목"
                        className="mb-3"
                        >
                    <Form.Control type="text" name="title" style={{width:"100%"}} value={boardTitle} disabled
                    className={styled.input} /><br />
                    </FloatingLabel>
                </div>

                <div>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="글 내용"
                        className="mb-3"
                        >
                    <Form.Control as="textarea" type="text" name="content" style={{width:"100%",height:"250px"}} value={boardContent} disabled
                    className={styled.inputText} /><br />
                    </FloatingLabel>
                </div>
                {name === window.sessionStorage.getItem("userId") ? 
                <>
                    <Link to={`/board/write/${id}`}><button className={styled.button_list}>수정</button></Link>
                    <button className={styled.button_list} onClick={boardDelete} >삭제</button>
                </>
            
                : null}
                
                <button className={styled.button_list} onClick={onClick}>목록</button>
            </Container>
        </div>
    )
}

export default BoardDetail;