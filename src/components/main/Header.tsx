import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <a href="../index.html" className="logo">
                <span>📍</span>
                AI RESTAURANT
            </a>
            <nav>
                <div className="nav-item">
                    <a href="#">맛집</a>

                    <div className="sub-menu">
                        <Link to={"/food/list"}>맛집</Link>
                        <a href="#">맛집 검색</a>
                        <a href="#">AI 맛집추천</a>
                    </div>
                </div>
                <div className="nav-item">
                    <a href="#">레시피</a>

                    <div className="sub-menu">
                        <a href="#">레시피</a>
                        <a href="#">쉐프</a>
                        <a href="#">AI 레시피</a>
                    </div>
                </div>

                <div className="nav-item">
                    <a href="#">여행</a>

                    <div className="sub-menu">
                        <a href="#">여행</a>
                        <a href="#">AI 여행코스</a>
                    </div>
                </div>

                <div className="nav-item">
                    <a href="#">AI 추천</a>

                    <div className="sub-menu">
                        <a href="#">AI 맛집 추천</a>
                        <a href="#">내 취향 추천</a>
                        <a href="#">메뉴 추천</a>
                        <a href="#">데이트 맛집</a>
                    </div>
                </div>
                <div className="nav-item">
                    <a href="#">커뮤니티</a>

                    <div className="sub-menu">
                        <Link to={"/board/list"}>자유게시판</Link>
                        <a href="#">챗봇</a>
                    </div>
                </div>

            </nav>

            <button className="login-btn">
                로그인
            </button>

        </header>
    )
}
export default Header;