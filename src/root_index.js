const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "bbs",
  });

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.get("/board/:page", (req, res) => {
    const page = (req.params.page -1)*5 ;
    const sqlQuery = `SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD order by board_id desc limit ${page},5;`;
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
});

app.post("/delete",(req,res)=>{
    const id = req.body.id;
    const sqlQuery = `delete from board where board_id =${id}`;
    db.query(sqlQuery,(err,result)=>{
        res.send(result);
    });    
});

app.post("/insert",(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const id = req.body.id;
    const sqlQuery = `insert into BOARD(BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) values(?, ?, ?)`;
    db.query(sqlQuery,[title,content,id],(err,result)=>{
        res.send(result);
    })
});

app.get("/list/:board_id",(req,res)=>{
    const board_id = req.params.board_id;
    const sqlQuery = `select * from board where board_id=?`
    db.query(sqlQuery,[board_id],(err,result)=>{
        res.send(result);
    })
});

app.post("/update",(req,res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;
    const sqlQuery = `update board set board_title=?,board_content =? where board_id = ?`;
    db.query(sqlQuery,[title,content,id],(err,result)=>{
        res.send(result);
    })
});

app.get("/detail/:board_id",(req,res)=>{
    const board_id = req.params.board_id;
    const sqlQuery = `select * from board where board_id=?`
    db.query(sqlQuery,[board_id],(err,result)=>{
        res.send(result);
    })
});

app.post("/regist",(req,res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    const pw2 = req.body.pw2;
    const name = req.body.name;
    const addr = req.body.addr;
    const email = req.body.email;
    const tel = req.body.tel;

    const sqlQuery = `insert into user values(?,?,?,?,?,?,?)`;
    db.query(sqlQuery,[id,pw,pw2,name,addr,email,tel],(err,result)=>{
        res.send(result);
    })
});

app.get("/user/idCheck/:id",(req,res)=>{
    const id = req.params.id;
    const sqlQuery = `select id from user where id =?`;
    db.query(sqlQuery,[id],(err,result)=>{
        res.send(result);
    })
});

app.get("/login/check/:id",(req,res)=>{
    const id = req.params.id;
    const sqlQuery = "select id,pw from user where id =?"
    db.query(sqlQuery,[id],(err,result)=>{
        res.send(result);
    })
});

app.post("/dummy/:count",(req,res)=>{
    const count = req.params.count;
    const sqlQuery = `insert into BOARD(BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) values('더미${count}', '더미${count}', '더미')`;
    db.query(sqlQuery,(err,result)=>{
        res.send(result);
    });
});

app.get("/count",(req,res)=>{
    const sqlQuery = "select count(*) as count from board"
    db.query(sqlQuery,(err,result)=>{
        res.send(result);
    });
})