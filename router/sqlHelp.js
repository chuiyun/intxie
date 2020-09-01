const mysql=require('mysql');
function DbOper(sql,param,callback) {
    const conn=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'960288546',
        port:'3306',
        database:'w227'
    });
    conn.connect();
    conn.query(sql,param,callback);
    conn.end();
}


module.exports={
    query:DbOper
}