import Table from "react-bootstrap/Table"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import styled from "../routes/Board.module.css"
import { useState,useEffect } from "react";
import axios from "axios";
import BoardContent from "./BoardContent";

function BoardList(){
    const [loading,setLoading] = useState(true);
    const [board,setBoard] = useState([]);
    const getBoard = async () =>{
      try{
        await axios.get("/board")
        .then(response =>{
            setBoard(response.data);
            setLoading(false);
        })
      }catch(e){
        console.log(e);
      }
    }
    useEffect(()=>{
      getBoard();
    },[board])
    
    return (
        <div>
            <Table bordered hover style={{width:"80%"}}>
                <thead>
                    <tr>
                        <th style={{width:"50px"}}>번호</th>
                        <th style={{width:"400px"}}>제목</th>
                        <th style={{width:"100px"}}>작성자</th>
                        <th style={{width:"70px"}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? null : (
                    board.length > 0 &&
                    board.map((bList) => (
                        <BoardContent
                        key ={bList.BOARD_ID}
                        id={bList.BOARD_ID}
                        title={bList.BOARD_TITLE}
                        registerId={bList.REGISTER_ID}
                        registerDate={bList.REGISTER_DATE}
                        />
                    ))
                    )}
                </tbody>
            </Table> 
            <Link to={"/board/write/"}>
                <button className={styled.button_list} >글쓰기</button>
            </Link>
            <Link to={"/"}>
                <button className={styled.button_list} >뒤로</button>
            </Link> 
        </div>
    );
};

export default BoardList;