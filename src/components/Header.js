import styled from "../components/Header.module.css"

function Header(){
    return (
        <div style={{textAlign:"center",width:'100%' ,height: '200px',background:"#375959" }}>
            <a href="/" className={styled.a}><h1 >Mini Project</h1></a>
        </div>
    );
}

export default Header;