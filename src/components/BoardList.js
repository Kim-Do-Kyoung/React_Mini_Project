import Table from "react-bootstrap/Table"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import styled from "../routes/Board.module.css"
import { useState,useEffect } from "react";
import axios from "axios";
import BoardContent from "./BoardContent";
import Paging from "./Paging";

function BoardList(){
    const [board,setBoard] = useState([]);
    
    //페이징 state
    const [page,setPage] = useState(1);

    const getBoard = () =>{
      try{
        axios.get(`/board/${page}`)
        .then(response =>{
            setBoard(response.data);
        })
      }catch(e){
      }
    }
    useEffect(() => {
        getBoard();
    }, [page]);


    const [count,setCount] = useState(1);
    const dummy = (e) =>{
        e.preventDefault();
        setCount(count + 1);
        axios.post(`/dummy/${count}`)
        .then(res =>{
            setBoard(res.data);
            window.location.reload("/");
        })
    }

    return (
        <div>
            <Table bordered hover style={{marginLeft:"10%",width:"80%"}}>
                <thead>
                    <tr>
                        <th style={{width:"50px",background:"gray"}}>번호</th>
                        <th style={{width:"400px",background:"gray"}}>제목</th>
                        <th style={{width:"100px",background:"gray"}}>작성ID</th>
                        <th style={{width:"70px",background:"gray"}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    board.map((bList) => (
                        <BoardContent
                        key ={bList.BOARD_ID}
                        id={bList.BOARD_ID}
                        title={bList.BOARD_TITLE}
                        registerId={bList.REGISTER_ID}
                        registerDate={bList.REGISTER_DATE}
                        />
                    ))
                    }
                </tbody>
            </Table>
            <Paging page={page} setPage={setPage}/>
            {window.sessionStorage.getItem("userId") !== null ? <Link to={"/board/write/"}>
                <button className={styled.button_list} >글쓰기</button>
            </Link> : null}
            <Link to={"/"}>
                <button className={styled.button_list} >뒤로</button>
            </Link>
            <button className={styled.button_list} onClick={dummy}>dummy!</button> 
        </div>
    );
};

export default BoardList;