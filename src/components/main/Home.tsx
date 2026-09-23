import {useState} from "react";
import {Navigate} from "react-router-dom";

function Home(){
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                <span className="badge">
                    ✦ AI RESTAURANT FINDER
                </span>
                    <h1>
                        오늘은<br/>
                        <strong>어디서 먹을까요?</strong>
                    </h1>

                    <p>
                        현재 위치와 취향을 기반으로<br/>
                        AI가 가장 잘 맞는 맛집을 찾아드립니다.
                    </p>

                    <div className="search-box">

                        <span>📍</span>

                        <input
                            type="text"
                            placeholder="지역을 입력하세요. 예) 강남역"
                        />

                        <button>
                            검색
                        </button>

                    </div>

                </div>

                <div className="map-area">

                    <div className="map-grid"></div>

                    <div className="map-pin pin1">📍</div>
                    <div className="map-pin pin2">📍</div>
                    <div className="map-pin pin3">📍</div>
                    <div className="map-pin pin4">📍</div>

                    <div className="map-center">
                        <span>✨</span>
                        AI 추천
                    </div>

                </div>

            </section>


            <section className="category">

                <div className="section-title">

                    <span>DISCOVER</span>

                    <h2>
                        무엇이 먹고 싶으세요?
                    </h2>

                </div>

                <div className="category-list">

                    <button>
                        🍜<span>한식</span>
                    </button>

                    <button>
                        🍣<span>일식</span>
                    </button>

                    <button>
                        🍕<span>양식</span>
                    </button>

                    <button>
                        🥩<span>고기</span>
                    </button>

                    <button>
                        🍔<span>맛집</span>
                    </button>

                    <button>
                        ☕<span>카페</span>
                    </button>

                </div>

            </section>


            <section className="recommend">

                <div className="section-title">

                    <span>AI RECOMMEND</span>

                    <h2>
                        당신을 위한 맛집
                    </h2>

                </div>


                <div className="restaurant-cards">

                    <article className="restaurant-card">

                        <div className="restaurant-image">
                            🍣
                        </div>

                        <div className="restaurant-info">

                            <div className="rating">
                                ⭐ 4.8
                            </div>

                            <h3>
                                오늘의 스시
                            </h3>

                            <p>
                                서울 · 일식 · ⭐ 인기맛집
                            </p>

                            <button>
                                자세히 보기 →
                            </button>

                        </div>

                    </article>


                    <article className="restaurant-card">

                        <div className="restaurant-image">
                            🥩
                        </div>

                        <div className="restaurant-info">

                            <div className="rating">
                                ⭐ 4.7
                            </div>

                            <h3>
                                서울 고기집
                            </h3>

                            <p>
                                강남 · 한우 · 회식추천
                            </p>

                            <button>
                                자세히 보기 →
                            </button>

                        </div>

                    </article>


                    <article className="restaurant-card">

                        <div className="restaurant-image">
                            🍝
                        </div>

                        <div className="restaurant-info">

                            <div className="rating">
                                ⭐ 4.9
                            </div>

                            <h3>
                                AI 추천 파스타
                            </h3>

                            <p>
                                홍대 · 이탈리안 · 데이트
                            </p>

                            <button>
                                자세히 보기 →
                            </button>

                        </div>

                    </article>

                </div>

            </section>
        </>
    )
}

export default Home;