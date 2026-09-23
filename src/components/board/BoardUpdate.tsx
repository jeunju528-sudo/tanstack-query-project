import {useState, useRef, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useQuery, useMutation} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {AxiosResponse, AxiosError, Axios} from "axios";

interface BoardItem {
    NO: number;
    NAME: string;
    SUBJECT: string;
    CONTENT: string;
}

interface BoardResponse {
    msg: string;
}

function BoardUpdate(){
    const nav=useNavigate();

    // => 데이터값 저장 (입력된 값) => 변수
    const [name,setName]=useState<string>("");
    const [subject,setSubject]=useState<string>("");
    const [content,setContent]=useState<string>("");
    const [pwd,setPwd]=useState<string>("");

    // => 태그를 제어
    const nameRef=useRef<HTMLInputElement>(null)
    const subjectRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)
    const pwdRef=useRef<HTMLInputElement>(null)

    const {no} = useParams();
    const {isLoading, isError, error, data} = useQuery<{data: BoardItem}>({
        queryKey: ['board-update', no],
        queryFn: async () => {
            return await boardClient.get<BoardItem>(`/board/update_node?no=${no}`);
        }
    })
    const board = data?.data
    console.log(board)

    useEffect(() => {
        if(board){
            setName(board.NAME)
            setSubject(board.SUBJECT)
            setContent(board.CONTENT)
        }
    }, [board]);

    const {mutate:boardUpdate}=useMutation({
        mutationFn: async ()=>{
            return await boardClient.put('/board/update_ok_node',{
                no:no,
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            })
        },
        onSuccess:(res:AxiosResponse<BoardResponse>)=>{
            if(res.data.msg==='yes')
            {
                window.location.href=`/board/detail/${no}`
            }
            else
            {
                alert("비밀번호가 틀렸습니다.")
                setPwd("")
                pwdRef.current?.focus()
            }
        },
        onError:(err:Error)=>{
            console.log("Error발생:",err.message)
        }
    })
    // 이벤트 처리
    const update=()=>{
        if(!name.trim())
            return nameRef.current?.focus()
        if(!subject.trim())
            return subjectRef.current?.focus()
        if(!content.trim())
            return contentRef.current?.focus()
        if(!pwd.trim())
            return pwdRef.current?.focus()
        boardUpdate()
    }

    return (
        <main className="restaurant-page board-page">

            {/* 페이지 제목 */}
            <section className="page-title">

                <span>
                    COMMUNITY
                </span>

                <h1>
                    수정
                </h1>

                <p>
                    맛집에 대한 이야기를 자유롭게 작성해주세요.
                </p>

            </section>


            {/* 글쓰기 폼 */}
            <section className="board-form">
                <div className="form-group">

                    <label>
                        작성자
                    </label>

                    <input
                        type="text"
                        placeholder="작성자를 입력해주세요."
                        value={name}
                        ref={nameRef}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                </div>
                <div className="form-group">

                    <label>
                        제목
                    </label>

                    <input
                        type="text"
                        placeholder="제목을 입력해주세요."
                        value={subject}
                        ref={subjectRef}
                        onChange={(e) =>
                            setSubject(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        내용
                    </label>

                    <textarea
                        placeholder="내용을 입력해주세요."
                        value={content}
                        ref={contentRef}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        비밀번호
                    </label>

                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        ref={pwdRef}
                        value={pwd}
                        onChange={(e) =>
                            setPwd(e.target.value)
                        }
                    />

                </div>
                <div className="board-form-buttons">

                    <button
                        className="form-submit-btn"
                        onClick={()=>update()}
                    >
                        수정하기
                    </button>
                    <button
                        className="form-cancel-btn"
                        onClick={() => nav(-1)}
                    >
                        취소
                    </button>



                </div>

            </section>

        </main>

    )
}
export default BoardUpdate;