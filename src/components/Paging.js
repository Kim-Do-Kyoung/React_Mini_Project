import axios from "axios";
import { useEffect, useState } from "react";
import styled from "../routes/Board.module.css"

function Paging({page,setPage}){
    //게시글 전체갯수
    const [totalCount,setTotalCount] = useState(0);
    
    //페이지 갯수 담을 배열
    const [array, setArray] = useState([]);

    //페이징 보여줄 갯수
    const showPage = 5;

    //게시글 갯수
    const [pageCount,setPageCount] = useState(0);

    //페이지 변환state
    const [isPageCh,setIsPageCh] = useState(false);

    const getTootalCount = () =>{
        try{
            axios.get("/count").then((res) => {
                let tempTotal = res.data[0].count;
                setTotalCount(res.data[0].count);
                setPageCount(Math.floor((tempTotal / showPage)+(tempTotal % showPage === 0 ? 0 : 1)));
                if(tempTotal === 0){
                    setPageCount(1);
                }
            });
        }catch(err){
        }
    }
    useEffect(()=>{
        getTootalCount();
    },[]);

    useEffect(() => {
        let temp = [];
        let startPage = ((page-1)/showPage)*showPage +1;
        let endPage = startPage + showPage-1;
        if(endPage > pageCount){
            endPage = pageCount;
        }
        for(let i = startPage; i <= endPage; i ++) {
            temp.push(i);
        }
        setArray(temp);
        setIsPageCh(false);
    }, [pageCount,isPageCh])

    const prevButton = (e)=>{
        e.preventDefault();
        let pageTemp = page -1;
        setPage(page -1);

        if(pageTemp !== 0 && pageTemp % showPage === 0 ){
            setPage(page-5);
            setIsPageCh(true);
        }
        if(page === 1){
            alert("이전으로 갈수 없음");
            setPage(1);
        }
    }

    const nextButton = (e) =>{
        e.preventDefault();
        setPage(page +1);
        if(page % showPage === 0){
            setIsPageCh(true);
        }
        if(pageCount<=page){
            alert("마지막 페이지");
            setPage(pageCount);
        }
    }

    return (
        <div>
            <button onClick={prevButton} className={styled.selectButton}>&lt;</button>
            {
            array.map((list) => {
                if(list === page){
                    return(
                    <button key={list} onClick={()=>setPage(list)}  style={{color:"red"}} className={styled.selectButton} disabled>
                        {list}
                    </button>   
                    )
                }else{
                    return(
                    <button key={list} onClick={()=>setPage(list)} className={styled.selectButton}>
                    {list}
                </button> 
                    )
                }
                })
            }
        <button onClick={nextButton} className={styled.selectButton}>&gt;</button>
        </div>
     );
};

export default Paging;