// nodejs 가장 간단한 서버 / NodeJS에서 웹서버를 만든기 위한 라이브러리
import express from "express";
// CrossOrigin => port가 다른 경우 허용
import cors from "cors";
import oracledb from "oracledb";
// 요청값을 받는다
import request from "request"; // 외부 HTTP 요청 모듈 => 유튜브 검색

const app = express(); // 서버 객체 생성
// port 허용 => 설정
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"]
}));
app.use(express.json()); // JSON형태로 POST 데이터를 받게 설정
// 서버 가동 => 대기상태 => 0~65535 => 0~1023 이미 사용중 port
app.listen(3355,()=>{
    console.log("Server running on port 3355",
        "http://localhost:3355");
})
/*
      React / TanStackQuery
           |
        Node Express
           |
         Oracle
 */
// 오라클 설정 => SELECT 결과를 객체 형식으로 받는다 {} (JSON)
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT
// 오라클 연결 => user/pwd/url  xe (전역 데이터베이스) => ora / orcl
async function getConnection(){
    return await oracledb.getConnection({
        user:'hr',
        password:'happy',
        connectionString:'127.0.0.1/xe'
    })
}
/*
     @GetMapping("/board/list_node")
     public String board_list(HttpServletRequest req, HttpServletResponse res)
     {
         String page=request.getParameter("page");
         if(page==null)
           page="1"

     }
 */
// /board/list_node?page=1  /board/list_node/1
// 모든 웹서버는 자동으로 request,response를 지원
/*
      <Link to="/board/list_node">
              |
          자동으로 인식 => path
 */
app.get("/board/list_node",async (req,res)=>{
    let conn;
    // page==null page="1"
    const page=parseInt(req.query.page as string)||1
    // => req.query.page   request.getParameter("page")
    // get['page']
    // /board/list_node?page=1  , params
    const rowSize=10
    const start=(page-1)*rowSize;
    // OFFSET 0부터

    try {
        // 오라클 연결
        conn=await getConnection();
        // SQL문장 제작
        const listsql=`
                       SELECT no,subject,name,TO_CHAR(regdate,'YYYY-MM-DD') as dbday,hit 
                       FROM jspboard
                       ORDER BY no DESC
                       OFFSET ${start} ROWS FETCH NEXT 10 ROWS ONLY
                     `
        const totalsql= `
                             SELECT CEIL(COUNT(*)/10.0) as totalpage
                             FROM jspboard
                           `
        const result=await conn.execute(listsql)
        // 오라클 => SQL문장 실행 요청
        const total=await conn.execute(totalsql)
        // [ { TOTALPAGE: 5 } ]
        // rows: [{no:1...},{no:2...},{no:3...}]
        const totalpage=(total.rows as {TOTALPAGE:number}[])[0].TOTALPAGE
        console.log(result.rows)
        console.log(total.rows)
        console.log(totalpage)
        res.json({
            curpage:page,
            totalpage,
            list:result.rows
        })

    }catch(error){
        console.log(error); // 오류 처리
    }
    finally{
        // conn 값이 있는 경우 true / null => false
        if(conn){
            await conn.close() // 무조건 수행하는 문장
        }
    }

});
// insert
app.post("/board/insert_node",async (req,res)=>{
    let conn
    const {name,subject,content,pwd}=req.body;
    try {
        conn = await getConnection();
        const sql=`INSERT INTO jspboard(name,subject,content,pwd)
                   VALUES(:name,:subject,:content,:pwd)`
        await conn.execute(
            sql,
            {name,subject,content,pwd},
            {autoCommit:true}) //자바 는 autocommit => commit
        res.json({msg:"yes"}) // 성공시에 React에 전송
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'no'}) // 실패 에러 출력
    }
    finally {
        if(conn){
            await conn.close()
        }
    }

})
// detail => nodeJS / springBoot / python
/*
    app.get(path,async(req,res)=>{})
    @RequestMapping(path) => MVC
    public String board_detail(HttpServletRequest req,HttpServletResponse res)
    {

    }

    프로그램
      1. 공통모듈 => 반복 소스 제거 (언어 => 메소드화)
      2. 소스가 길때 => 나눠서 작업 / 알고리즘
      3. 누구나 볼 수 있게 (가독성)
      4. 재사용 / 가독성 / 최적화 / 유지보수
      3년차 => 프로젝트 확인
 */
app.get("/board/detail_node",async (req,res)=>{
    // 1. 오라클 연결
    let conn
    // 2. 요청 데이터 받기
    const no=req.query.no||1
    // 3. SQL 문장
    try {
        conn = await getConnection();
        const sql1=`UPDATE jspboard SET
            hit=hit+1
                    WHERE no=${no}
        `
        await conn.execute(
            sql1,
            {},
            {autoCommit:true}
        )
        // CLOB => TO_CHAR(content) as content => InputStream

        const sql2=`
                     SELECT no,subject,TO_CHAR(content) as content,name,hit,
                            TO_CHAR(regdate,'YYYY-MM-DD') as dbday
                     FROM jspboard
                     WHERE no=${no}
                   `
        const result=await conn.execute(sql2)
        // => 문제가 키:값 => 키(대문자)
        res.json(result.rows?.[0])
        /*
          result{

             rows:[{}]
          }
         */
    }catch(error){
        console.log(error);
    }
    finally{
        if(conn){
            await conn.close()
        }
    }
    // 4. 결과값 => JSON으로 생성
})
app.get("/board/update_node",async (req,res)=>{
    let conn
    const no=req.query.no
    try {
        conn = await getConnection();
        const sql=`SELECT no,name,subject,TO_CHAR(content) as content 
                   FROM jspboard
                   WHERE no=${no}
                  `
        const result=await conn.execute(sql)
        console.log(result.rows)
        res.json(result.rows?.[0])

    }catch(error){
        console.log(error);
    }
    finally {
        if(conn){
            await conn.close()
        }
    }
})
/*
      board/delete/1/1234 => pathvariable
                 ---------
                 req.params.no
                 req.params.pwd
      app.delete("/board/delete_node/:no/:pwd")
 */
app.put("/board/update_ok_node",async (req,res)=>{
    let conn
    // JSON으로 넘어오는 데이터를 받을 경우 : req.body
    // @RequestBody => JSON => 객체로 변경
    /*
         String sql="SELECT ~ FROM tableName WHERE name='홍길동'"
         String sql="SELECT ~ FROM tableName WHERE name=?"
     */
    const {no,name,subject,content,pwd}=req.body;
    try {
        conn = await getConnection();
        const checkSql=`
            SELECT COUNT(*) as res
            FROM jspboard
            WHERE no=:no AND pwd=:pwd
        `
        const check=await conn.execute(checkSql,{no,pwd})
        console.log(check)
        const count=(check.rows as any[])[0].RES
        if(count===0)
        {
            res.json({msg:"no"})
            return
        }
        const updateSql=`
                           UPDATE jspboard SET
                           name=:name,
                           subject=:subject,
                           content=:content
                           WHERE no=:no
                        `
        await conn.execute(
            updateSql,
            {name,subject,content,no},
            {autoCommit:true}
        )
        res.json({msg:"yes"})
    }catch(error){
        console.log(error);
    }
    finally {
        if(conn){
            await conn.close()
        }
    }
})
// delete
app.delete("/board/delete_node/:no/:pwd",async (req,res)=>{
    let conn
    const no=req.params.no
    const pwd=req.params.pwd
    try {
        conn = await getConnection();
        const sql=`SELECT COUNT(*) as res
                   FROM jspboard
                   WHERE no=:no AND pwd=:pwd
        `
        const check=await conn.execute(sql,{no,pwd})
        console.log(check.rows)
        const count=(check.rows as any[])[0].RES
        if(count===0)
        {
            res.json({msg:"no"})
            return
        }
        const deleteSql=`DELETE FROM jspboard WHERE no=${no}`
        await conn.execute(deleteSql,{},{autoCommit:true})
        res.json({msg:"yes"})
    }catch(error){
        console.log(error);
    }
    finally {
        if(conn){
            await conn.close()
        }
    }
})