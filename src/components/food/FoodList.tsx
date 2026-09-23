import apiClient from "../../http-commons";
import {FoodItem,FoodListData} from "../../commons/commonsData";
import {AxiosResponse} from "axios";
import {useState,useRef} from "react";
import {useQuery} from "@tanstack/react-query";

import PagePrint from "../../commons/PagePrint";
import {Link} from "react-router-dom";

function FoodList() {
    // 현재 페이지 설정
    const [curpage, setCurpage] = useState<number>(1);
    const [search , setSearch] = useState<string>("마포");
    const fdRef=useRef<HTMLInputElement>(null);
    // 서버 연결  => useEffect(()=>{},[curpage])
    // 자동 호출이 안된다 => refetch
    const {isLoading, isError , error , data,refetch:foodFind} = useQuery<AxiosResponse<FoodListData>,Error>({
        queryKey: ['food',curpage],
        queryFn: async ()=>{
            return await apiClient.get(`/food/list_react/${search}/${curpage}`);
        }
    })
    // 검색
    const find=()=>{
        if(!search.trim())
        {
            return fdRef.current?.focus()
        }
        if(fdRef.current)
        {
            setSearch(fdRef.current?.value)
        }
        foodFind()
    }
    // 서버를 데이터 전송이 지연되는 경우
    if(isLoading){
        return <h1>Loading...</h1>
    }
    // 서버에서 에러 발생시 처리
    if(isError){
        return <h1>Error발생:{error?.message}</h1>
    }
    console.log(data?.data)
    // 정상 수행
    return (
        <main className="restaurant-page">
            {/*페이지 제목 */}
            <section className="page-title">

                <div>
                    <span>AI RESTAURANT</span>

                    <h1>
                        맛집 찾기
                    </h1>

                    <p>
                        원하는 지역을 선택해보세요.
                    </p>
                </div>

            </section>


            {/* ================= SEARCH =================*/}
            <section className="search-area">

                <div className="search-box">

                    <span>📍</span>

                    <input
                        type="text"
                        placeholder="지역 또는 맛집 이름을 입력하세요."
                        ref={fdRef}
                        value={search}
                        onChange={e=>setSearch(e.target.value)}
                    />

                    <button type="button" onClick={find}>
                        검색
                    </button>

                </div>

            </section>

            <section className="list-header">

                <div>
                    <strong>맛집 목록</strong>
                    <span>총 {data && data.data.count}개의 맛집</span>
                </div>

                <select>
                    <option>추천순</option>
                    <option>평점순</option>
                    <option>리뷰순</option>
                    <option>거리순</option>
                </select>

            </section>



            <section className="restaurant-list">
                {
                    data?.data.list.map((food:FoodItem,index:number)=>
                        <article className="restaurant-card" key={index}>

                            <div className="restaurant-image sushi">
                                <img src={food.poster} alt={""}/>
                            </div>

                            <div className="restaurant-info">

                                <div className="rating">
                                    ⭐ {food.score}
                                </div>

                                <h3>
                                    {food.name}
                                </h3>

                                <p>
                                    {food.type}
                                </p>

                                <div className="tags">
                                    <span>{food.theme}</span>
                                </div>

                                <Link to={"/food/detail/"+food.no}>
                                    자세히 보기 →
                                </Link>

                            </div>
                        </article>
                    )
                }
            </section>

            {/* 페이지 설정*/}
            {
                data?.data &&
                <PagePrint data={data.data} setCurpage={setCurpage}/>
            }
        </main>
    )
}

export default FoodList;