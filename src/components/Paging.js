import axios from "axios";
import { useEffect, useState } from "react";

function Paging({page,setPage}){
    //게시글 전체갯수
    const [totalCount,setTotalCount] = useState(0);

    //페이징 보여줄 갯수
    const [showPage,setShowPage] = useState(5);

    const [pageNav,setPageNav] = useState([]);
    const [pageCount,setPageCount] = useState(0);

    const [loading,setLoading] = useState(false);

    async function getTootalCount(){
        await axios.get("/count")
        .then(res =>{
            setTotalCount(res.data[0].count);
        });
        setPageCount(Math.floor((totalCount / showPage)+(totalCount % showPage === 0 ? 0 : 1)));
        let a;
        for(let i =1; i<=pageCount; i++){
            a.push(i);
        }
        setPageNav(a)
        console.log("total>>",totalCount);
        console.log("pageCount>>",pageCount)
        console.log("pageNav>>",pageNav);
        setLoading(true);
    }
    
    useEffect(()=>{
        getTootalCount();
    },[])

    return (
        <div>
            {loading ? pageNav?.map(i =>(
                <button key={i+1} onClick={()=>setPage(i+1)}>{i+1}</button>
                
            ))
            : null}
        </div>
    );
}

export default Paging;