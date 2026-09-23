import {useState, useRef} from "react"
import {useQuery} from "@tanstack/react-query";
import {YoutubeApi} from "./YoutubeApi";
import {YoutubeItem} from "../../commons/commonsData";

function YoutubeFind(){

    const [fd, setFd] = useState<string>("맛집");
    const fdRef = useRef<HTMLInputElement>(null);
    const {isLoading, isError, error, data, refetch:find} = useQuery({
        queryKey: ['youtube'],
        queryFn: () => YoutubeApi(fd)
    })

    const findClick = () => {
        if(!fd.trim()){
            return fdRef.current?.focus();
        }
        if(fdRef.current){
            setFd(fdRef.current?.value)
        }
        // refetch 를 부르는 것
        find()
    }

    console.log(data)

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <h1>{error.message}</h1>
    }



    return (
        <div className="youtube-page">

            <div className="youtube-header">

                <div className="youtube-title">

                    <h1>
                        YouTube 동영상
                    </h1>

                    <p>
                        원하는 동영상을 검색해보세요.
                    </p>

                </div>

            </div>


            <div className="youtube-search">

                <div className="youtube-search-box">

            <span>
                🔍
            </span>


                    <input
                        type="text"
                        id="searchInput"
                        placeholder="검색어를 입력하세요"
                        ref={fdRef}
                        value={fd}
                        onChange={(e) => setFd(e.target.value)}
                    />


                    <button onClick={findClick}>
                        검색
                    </button>

                </div>

            </div>


            <div className="youtube-result-header">

                <strong>
                    검색 결과
                </strong>

            </div>



            <div
                className="youtube-loading"
                id="loading">

                YouTube 동영상을 검색하고 있습니다...

            </div>


            <div className="youtube-list" id="youtubeList">
                {
                    data?.items.map((item, index) =>
                            <div className={"youtube-thumbnail"}>
                                <iframe src={"https://www.youtube.com/embed/"+item.id.videoId} style={{"width":"350px", "height":"250px"}}></iframe>
                                <div>
                                    <div className="youtube-card-title">
                                        {item.snippet.title}
                                    </div>
                                </div>
                            </div>
                    )
                }
            </div>


            <div
                className="youtube-empty"
                id="empty">

                검색된 동영상이 없습니다.

            </div>


        </div>

    )
}
export default YoutubeFind