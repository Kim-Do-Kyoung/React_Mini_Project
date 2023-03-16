function IdSearch(){
    return (
        <div style={{textAlign:"center"}}>
            <form>
       		    <h2>ID찾기</h2>
                <table>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" required/></td>
                    </tr>
                    <tr>
                        <td>E - Mail</td>
                        <td><input type="email" required /></td>
                    </tr>
                </table>
        		<input type="submit" value="아이디 찾기" />
            	<ul>
            	    <li>당신의 ID는</li>
            	    <li>입니다!</li>
            	</ul>
            	<button>로그인 하러가기</button>
    		</form>
        </div>
    )
}

export default IdSearch;