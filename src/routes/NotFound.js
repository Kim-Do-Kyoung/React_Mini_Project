import { Link } from "react-router-dom";

function NotFound(){
    return (
        <div>
            <p style={{color:"red",fontSize:"30px"}}>잘못된 접근 !</p>
            <Link to="/"><button>맨처음으로 가기</button></Link>
        </div>
    );
}

export default NotFound;