import {FoodDetailItem} from "../../commons/commonsData";
import {useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";
import {AxiosResponse} from "axios";
import {useQuery} from "@tanstack/react-query";
import MapPrint from "../../commons/MapPrint";
/*
     useQuery : SELECT
     useMutation : INSERT , UPDATE , DELETE
 */
interface FoodDetailProps {
    data: FoodDetailItem;
}
function FoodDetail() {
    const {no} = useParams();
    const nav=useNavigate();
    const {isLoading,isError,error,data}=useQuery<FoodDetailProps,Error>({
        queryKey:['food-detail',no],
        queryFn: async()=>{
            return await apiClient(`/food/detail_react/${no}`);
        }
    })
    console.log(data?.data)
    if(isLoading){
        return (
            <h1>Loading...</h1>
        )
    }
    if(isError){
        return (
            <h1>Error 발생:{error?.message}</h1>
        )
    }

    const vo:FoodDetailItem|undefined=data?.data
    console.log(vo)
    return (
        <main className="restaurant-page">

            <section className="page-title">

                <span>
                    AI RESTAURANT
                </span>

                <h1>
                    맛집 상세정보
                </h1>

                <p>
                    맛집의 다양한 정보를 확인해보세요.

                </p>

            </section>

            <section className="food-detail">




                <div className="food-detail-image">

                    <img
                        src={vo?.poster}
                        alt="맛집 이미지"
                    />

                </div>




                <div className="food-detail-info">




                    <div className="rating">
                        ⭐ {vo?.score}
                    </div>




                    <h2>
                        {vo?.name}
                    </h2>




                    <p className="food-type">
                        {vo?.type}
                    </p>




                    <div className="food-tags">

                <span>
                    한식
                </span>

                        <span>
                    마포
                </span>

                        <span>
                    인기맛집
                </span>

                    </div>




                    <div className="food-info">


                        <div>

                            <strong>
                                📍 주소
                            </strong>

                            <p>
                                {vo?.address}
                            </p>

                        </div>


                        <div>

                            <strong>
                                📞 전화
                            </strong>

                            <p>
                                {vo?.phone}
                            </p>

                        </div>


                        <div>

                            <strong>
                                🕐 영업시간
                            </strong>

                            <p>
                                {vo?.time}
                            </p>

                        </div>


                        <div>
                            <strong>
                                🍴 음식 종류
                            </strong>
                            <p>
                                {vo?.type}
                            </p>
                        </div>


                        <div>
                            <strong>
                                💰 가격대
                            </strong>
                            <p>
                                {vo?.price}
                            </p>
                        </div>


                        <div>
                            <strong>
                                🚗 주차
                            </strong>
                            <p>
                                {vo?.parking}
                            </p>
                        </div>
                    </div>




                    <div className="food-detail-buttons">

                        <button className="back-btn" onClick={()=>nav(-1)}>
                            ← 목록으로
                        </button>

                        <button className="map-btn">
                            📍 지도에서 보기
                        </button>

                    </div>


                </div>

            </section>




            <section className="food-description">

                <h2>
                    맛집 소개
                </h2>

                <p>
                    {vo?.content}
                </p>

            </section>

            <section className="food-map">

                <div className="map-title2">
                    <span>📍 LOCATION</span>
                    <h2>매장 위치</h2>
                    <p>
                        {vo?.address}
                    </p>
                </div>

                <div className="map-container">
                    {/* 카카오맵 또는 네이버 지도 API가 들어갈 영역 */}
                    <div className="map-placeholde">
                        {
                            vo &&
                            <MapPrint address={vo?.address} name={vo?.name}/>
                        }
                    </div>

                </div>
            </section>
            <section className="ai-recommend">

                <div className="ai-icon">
                    ✨
                </div>

                <div>

            <span>
                AI RECOMMEND
            </span>

                    <h2>
                        이런 맛집도 추천해드릴까요?
                    </h2>

                    <p>
                        현재 맛집과 비슷한 음식점과
                        주변 인기 맛집을 AI가 추천해드립니다.
                    </p>

                </div>

                <button>
                    AI 맛집 추천 →
                </button>

            </section>


        </main>

    )
}

export default FoodDetail;