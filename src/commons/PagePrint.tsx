import {FoodListData} from "./commonsData";
import {FC} from "react";

interface PagePrintProps {
    data: FoodListData;
    setCurpage:(page:number) => void;
}
// FC => Function Component (함수형 컴포넌트)
/*
    function App(){
      return (
         <h1>Hello</h1>
      )
    }

    TypeScript : FC 타입을 이용
    const App:FC =()=>{
       return (
         <h1>Hello</h1>
      )
    }
 */
const PagePrint: FC<PagePrintProps> = ({data,setCurpage}) =>{
    const {curpage,totalpage,startPage,endPage} = data
    console.log(data)
    const pageArr=[]
    const prev=()=>setCurpage(startPage-1)
    const next=()=> setCurpage(endPage+1)
    const pageChange=(page:number)=>setCurpage(page)

    if(startPage>1)
    {
        pageArr.push(
            <a className="page-arrow" onClick={prev}>
                ‹
            </a>
        )
    }
    for(let i:number=startPage;i<=endPage;i++)
    {
        pageArr.push(
            <a onClick={()=>pageChange(i)} className={i===curpage?"page active":"page"}>
                {i}
            </a>
        )
    }
    if(endPage<totalpage)
    {
        pageArr.push(
            <a className="page-arrow" onClick={next}>
                ›
            </a>
        )

    }

    return (
        <nav className="pagination">
            {pageArr}
        </nav>
    )
}
export default PagePrint