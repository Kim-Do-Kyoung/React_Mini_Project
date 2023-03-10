import BoardList from '../components/BoardList';
import styled from "./Board.module.css"

function Board(){
  
  return (
    <div style={{textAlign:"center",margin:"50px",background:"white",borderRadius:"20px",padding:"10px"}}>
      <h1 className={styled.h1_2}>React 게시판</h1>
      <BoardList />
    </div>
  );
};


export default Board;