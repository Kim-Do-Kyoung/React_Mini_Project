import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "./Board.module.css"

function BoardForm(){
  const [check,setCheck] = useState(false);
  const [id,setId] = useState("");
  const [title,setTitle] = useState("");
  const [content,setContent] = useState();
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    alert("작성 완료!");

    const data = {
      'title' : title,
      'content' : content,
      "id" : window.sessionStorage.getItem("userId")
    }

    axios.post("/insert",data)
    .then(res =>{
    }).catch(err =>{
    })
    navigate('/board');
    
  };

  function update(e){
    e.preventDefault();
    alert("수정 완료!");

    const data = {
      'id' : id,
      'title' : title,
      'content' : content
    }

    axios.post("/update",data)
    .then(res =>{
    });
    navigate('/board');
    
  }

  function reset(e){
    e.preventDefault();
    setTitle("");
    setContent("");
  }

  const back = (e) =>{
    e.preventDefault();
    if(window.confirm("게시판 목록으로 넘어갈까요?")){
      navigate("/board");
    }
  }

  const params = useParams();
  useEffect(()=>{
    axios.get(`/list/${params.board_id}`)
    .then(res =>{
      res.data.map((data)=>{
        setId(data.BOARD_ID);
        setTitle(data.BOARD_TITLE);
        setContent(data.BOARD_CONTENT);
        setCheck(true);
      })
    })    
  },[])
  return (
    <div className={styled.div}>
      <h1 className={styled.h1}>글쓰기</h1>
      <div className={styled.table}>
        <form onSubmit={onSubmit} className={styled.formstyle}>
          <table>
            <thead>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h5 className={styled.font}>글제목</h5>
                </td>
                <td>
                  <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={styled.input} required />
                </td>
              </tr>
              <tr>
                <td>
                  <h5 className={styled.font}>내용</h5>
                </td>
                <td>
                  <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className={styled.inputText} required />
                </td>
              </tr>
            </tbody>
          </table>
          { check ? 
            <button className={styled.button} onClick={update}>수정하기</button>:
            <button className={styled.button}>작성하기</button>
          }
          
          <button className={styled.button} onClick={reset}>다시쓰기</button>
          <button className={styled.button} onClick={back}>뒤로가기</button>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;