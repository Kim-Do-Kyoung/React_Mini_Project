import axios from "axios";
import { Link } from "react-router-dom";
import styled from "../routes/Board.module.css"

function BoardContent({id,title,registerId,registerDate}){
    return (
        <tr>
            <td>{id}</td>
            <td><Link to={`/board/detail/${id}`}  className={styled.boardTitle} >{title}</Link></td>
            <td>{registerId}</td>
            <td>{registerDate}</td>
        </tr>
    )
}

export default BoardContent;