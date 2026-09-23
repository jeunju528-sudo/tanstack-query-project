import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";

function BoardDetail() {
    return (
        <div className="board-page">

            <div className="page-title">
                <h1>자유게시판</h1>
                <p>회원들과 자유롭게 이야기를 나눠보세요.</p>
            </div>

            <div className="board-detail">

                <div className="board-detail-title">

                    <h2 id="subject">
                        Node.js와 Oracle을 이용한 게시판 만들기
                    </h2>

                    <div className="board-detail-info">

                <span>
                    작성자
                    <strong id="name">홍길동</strong>
                </span>

                        <span>
                    작성일
                    <strong id="regdate">2026-09-23</strong>
                </span>

                        <span>
                    조회
                    <strong id="hit">10</strong>
                </span>

                    </div>

                </div>

                <div
                    className="board-detail-content"
                    id="content">

                    Node.js에서 Express를 사용하여
                    Oracle 데이터베이스와 연결하는 방법을 학습했습니다.

                    Express를 사용하면 GET, POST 등의 HTTP 요청을
                    쉽게 처리할 수 있습니다.

                    또한 oracledb 모듈을 사용하면
                    Node.js에서 Oracle 데이터베이스에 접근할 수 있습니다.

                </div>


                <div className="board-detail-buttons">

                    <button
                        className="board-back-btn"
                    >
                        목록
                    </button>


                    <div>

                        <button
                            className="board-edit-btn"
                        >
                            수정
                        </button>

                        <button
                            className="board-delete-btn"
                        >
                            삭제
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default BoardDetail