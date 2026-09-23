// nodejs 가장 간단한 서버
import express from "express";
// CrossOrigin
import cors from "cors";
import oracledb from "oracledb";
// 요청값을 받는다
import request from "request";

const app = express();
// port 허용
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"]
}));
app.use(express.json());
// 서버 가동 => 대기상태
app.listen(3355,()=>{
    console.log("Server running on port 3355",
        "http://localhost:3355");
})

// 오라클 설정
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT
// 오라클 연결
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
app.get("/board/list_node",async (req,res)=>{
    let conn;
    const page=parseInt(req.query.page as string)||1

    const rowSize=10
    const start=(page-1)*rowSize;

    try {
        conn=await getConnection();
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
        const total=await conn.execute(totalsql)
        // [ { TOTALPAGE: 5 } ]
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
        console.log(error);
    }
    finally{
        if(conn){
            await conn.close()
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
            {autoCommit:true})
        res.json({msg:"yes"})
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'no'})
    }
    finally {
        if(conn){
            await conn.close()
        }
    }

})