import {useState, useRef} from 'react'
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import boardClient from "../../board-commons";

/*
     1. React의 단점
        = 발전 속도가 빠르다
        = 이전 버전과 호환성이 떨어진다 = 18
        = 19버전은 typescript 권장
                  ---------- 자동 지원 (추론)
     2. tanStack-Query
        = useQuery = SELECT (데이터 검색)
        = useMutation = DML (INSERT , UPDATE , DELETE)
     3. 개발자의 요구사항이 많이 발생
        = React(FaceBook=일반 OpenSource)
        @tanstack / @tupes
 */
function BoardInsert(){
    const nav=useNavigate();
    /*
          name : 현재 값
          setName() : 값 변경하는 역할
            | = useQuery => 서버 / Cache
            | = 재렌더링
     */
    const [name,setName]=useState<string>("");
    const [subject,setSubject]=useState<string>("");
    const [content,setContent]=useState<string>("");
    const [pwd,setPwd]=useState<string>("");
    // => 데이터값 저장 (입력된 값) => 변수
    const nameRef=useRef<HTMLInputElement>(null)
    const subjectRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)
    const pwdRef=useRef<HTMLInputElement>(null)
    // => 태그를 제어
    const {mutate:boardInsert}=useMutation({
        mutationFn: async ()=>{
            return await boardClient.post('/board/insert_node',{
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            })
        },
        onSuccess:(res)=>{
            if(res.data.msg==='yes')
            {
                window.location.href="/board/list"
            }
            else
            {
                alert("게시판 등록에 실패하셨습니다!!")
            }
        },
        onError:(err:Error)=>{
            console.log("Error발생:",err.message)
        }
    })
    // 이벤트 처리
    const insert=()=>{
        if(!name.trim())
            return nameRef.current?.focus()
        if(!subject.trim())
            return subjectRef.current?.focus()
        if(!content.trim())
            return contentRef.current?.focus()
        if(!pwd.trim())
            return pwdRef.current?.focus()
        boardInsert()

    }

    return (
        <main className="restaurant-page board-page">

            {/* 페이지 제목 */}
            <section className="page-title">

                <span>
                    COMMUNITY
                </span>

                <h1>
                    글쓰기
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
                        onClick={()=>insert()}
                    >
                        등록하기
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
export default BoardInsert;