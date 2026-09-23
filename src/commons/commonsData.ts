/*
   map.put("list", list);
   map.put("search", search);
   map.put("curpage", page);
   map.put("totalpage", totalpage);
   map.put("count", count);
   map.put("startPage", startPage);
   map.put("endtPage", endPage);

   => FoodListData
   => list => FoodItem
   => TypeScript
      정의 :  JavaScript에 데이터형 추가하는 문법
      동작
           JavaScript
              |
           TypeScript
              |
            데이터형 (타입) 검사
              |
           JavaScript로 변환
              |
           브라우저/실행  => 목적 : 가독성 / 실행 전에 오류를 발견

           .ts  => 일반 TypeScript
           .tsx => TypeScript + JSX (JavaScript+XML)
                   HTML을 이용하거나 UI
           .js  => 일반 JavaScript
           .jsx => JavaScript를 이용해서 화면 UI

           1. 기본 데이터형
              string : 문자열  let name: string = 값
              number : 숫자 (정수,실수)
              boolean : true/ false
              array : 배열
              object : 객체
              tuple : 데이터베이스의 ROW와 동일 => 파이썬
                      {} , [] , ()
              any , unknown : 데이터형을 모르는 경우
              void : 리턴형
              null
              undefined

              설계 / 규격
              interface => VO
              interface User{
                 name:string,
                 age:number
              }
              type : interface와 거의 동일
              --------------------------- React / Vue에서 주로 사용
              interface / type
                 UNION => 여러개의 데이터형을 설정 => type에만 적용
                          interface는 제한적
                 type Statue="READY"|"RUNNING"|"END"

              let value:string|number
              let value:any

              optional ?
              email?:string

              readonly
              readonly no:number => 읽기 전용

 */
// no,poster,name,score,theme,type
// VO
export interface FoodItem {
    no: number,
    poster: string,
    name: string,
    score: number,
    theme: string,
    type: string
}
// 전체 목록
export interface FoodListData {
    list: FoodItem[],
    search: string,
    curpage: number,
    totalpage: number,
    count: number,
    startPage: number,
    endPage: number
}
/*
  NO                                        NOT NULL NUMBER
	 NAME                                               VARCHAR2(100)
	 TYPE                                               VARCHAR2(100)
	 PHONE                                              VARCHAR2(30)
	 ADDRESS                                            VARCHAR2(260)
	 SCORE                                              NUMBER(2,1)
	 PARKING                                            VARCHAR2(200)
	 POSTER                                             VARCHAR2(260)
	 TIME                                               VARCHAR2(50)
	 CONTENT                                            CLOB
	 THEME                                              VARCHAR2(4000)
	 PRICE                                              VARCHAR2(100)
	 LIKECOUNT                                          NUMBER
	 JJIMCOUNT                                          NUMBER
	 HIT                                                NUMBER
	 REPLYCOUNT
 */
export interface FoodDetailItem {
    no:number,
    name: string,
    type: string,
    phone: string,
    address: string,
    score: number,
    parking:string,
    poster: string,
    time:string,
    content: string,
    theme:string,
    price:string,
    likecount:number,
    replycount:number,
    jjimcount:number,
    hit:number
}