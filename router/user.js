const router=require("express").Router();
const db=require("./sqlHelp");
//登录
router.post("/userLogin",(request,response)=>{
    let user=request.body.user;
    let pwd=request.body.pwd;
    let sql="select * from user where userName=? and pwd=?";
    db.query(sql,[user,pwd],(err,data)=>{
        if (err) {
            response.send({code:500,message:"数据库出错,请联系管理员"});
        }
        else {
            if (data.length>0){
                request.session.user=user;
                request.session.headImage=data[0].headImage;
                request.session.info=data[0];
                response.send({code:200,message:"登录成功",data:data});
            }
            else {
                response.send({code:201,message:"用户名或密码错误"});
            }
        }
    })
})
//注册
router.post("/reg",(request,response)=>{
    let email=request.body.Email;
    let user=request.body.user;
    let pwd=request.body.zhucePwd;
    let sql="INSERT INTO user(userName,pwd,email) VALUES(?,?,?)";
    db.query(sql,[user,pwd,email],(err,data)=>{
        if (err) {
            console.log(err);
            response.send("数据库出错，请联系管理员！")
        }
        else {
            if (data.affectedRows>0){
                response.send("注册成功");
            }
            else {
                response.send("注册失败");
            }
        }
    })
})
module.exports=router;