import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import boardClient from "../../board-commons";
import {AxiosError, AxiosResponse} from "axios";
interface BoardDeleteProps {
    msg:string
}
function BoardDelete(){
    const nav=useNavigate();
    const {no} =useParams<{no:string}>()
    const [pwd, setPwd] = useState("");
    const pwdRef = useRef<HTMLInputElement>(null);
    const {mutate:boardDelete} = useMutation({
        mutationFn:async () => {
            return await boardClient.delete(`/board/delete_node/${no}/${pwd}`)
        },
        onSuccess:(res:AxiosResponse<BoardDeleteProps>)=>{
            if(res.data.msg==='yes')
            {
                window.location.href="/board/list";
            }
            else
            {
                alert("비밀번호가 틀립니다")
                setPwd("");
                pwdRef.current?.focus();
            }
        },
        onError:(err:AxiosError)=>{
            console.log(err.message)
        }
    })
    const deleteOk=()=>{
        if(!pwd.trim())
        {
            pwdRef.current?.focus();
            return
        }
        boardDelete()
    }
    return (
        <div className="restaurant-page board-page">
            <div className="page-title">
                <h1>게시글 삭제</h1>
                <p> 게시글을 삭제하려면 작성할 때 입력한 비밀번호를 입력하세요. </p>
            </div>

            <div className="board-form">
                <div className="delete-message">
                    <strong>게시글을 삭제하시겠습니까?</strong>
                    <span> 삭제된 게시글은 복구할 수 없습니다. </span>
                </div>


                <div className="form-group">
                    <label htmlFor="pwd"> 비밀번호 </label>
                    <input type="password" id="pwd"placeholder="비밀번호를 입력하세요"
                           ref={pwdRef} value={pwd} onChange={(e)=>setPwd(e.target.value)}
                    />
                </div>
                <div className="board-form-buttons">
                    <button type="button" className="form-cancel-btn"
                            onClick={() => nav(-1)}
                    > 취소</button>
                    <button type="button" className="form-delete-btn"
                            onClick={deleteOk}
                    > 삭제하기</button>
                </div>
            </div>
        </div>
    )
}
export default BoardDelete;