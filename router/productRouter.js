const router=require("express").Router();
const db=require("./sqlHelp");
router.post("/shopcart",(req,res)=>{
    let rid=req.body.rid;
    if (req.session.user) {
        let userId=req.session.info.id;
        //进行判断
        let sql2="select * from shopcart where userId=? and ruleId=?";
        db.query(sql2,[userId,rid],(err2,data2)=>{
            if (err2) {
                console.log(err2);
            }
            else {
                if (data2.length>0) {
                    let sql="update shopcart set num=num+1 where userId=? and ruleId=?";
                    db.query(sql,[userId,rid],(err,data)=>{
                        if (err) {
                            console.log(err);
                            res.send({code:500,message:"数据库出错，请联系管理员"});
                        }
                        else {
                            if (data.affectedRows>0){
                                res.send({code:200,message:"加入成功"})
                            }
                            else {
                                res.send({code:202,message:"加入失败"})
                            }
                        }
                    })
                }
                else {
                    let sql="insert into shopcart(userId,ruleId) values(?,?)";
                    db.query(sql,[userId,rid],(err,data)=>{
                        if (err){
                            console.log(err);
                            res.send({code:500,message:"数据库出错，联系管理员"});
                        }
                        else {
                            if (data.affectedRows>0){
                                res.send({code:200,message:"加入成功"})
                            }
                            else {
                                res.send({code:202,message:"加入失败"})
                            }
                        }
                    })
                }
            }
        })
    }
    else {
        res.send({code:201,message:"请先登录"})
    }
});
router.post("/buildOrder",(req,res)=>{
    /*
    购物车生成订单
    1.生成订单
       订单两个表（订单表，订单详情表）
       先订单表，再生成订单详情表
    2.删除购物车
    */
    let sidStr=req.body.sidstr;
    let total=req.body.total;
    //1.生成订单表
    if (req.session.user) {
        let userId=req.session.info.id;
        let sql="insert into orders (userId,total) values(?,?)";
        db.query(sql,[userId,parseFloat(total)],(err,data)=>{
            if (err) {
                console.log(err);
                res.send({code:500,message:"服务器出错，请联系管理员"});
            }
            else {
                if (data.affectedRows>0) {
                    //进行下一步操作
                    console.log(data);
                    let orderId=data.insertId;
                    //1.2插入订单详情
                    let sql2=`INSERT INTO orderDetail(orderId,ruleId,num,price)
                        SELECT ${orderId},s.ruleId,s.num,r.price
                        FROM shopcart s JOIN productrule r
                        ON s.ruleId=r.id
                        WHERE s.id IN (${sidStr})`;
                    db.query(sql2,[],(err2,data2)=>{
                        if (err2) {
                            console.log(err2);
                            res.send({code:500,message:"服务器出错"});
                        }
                        else {
                            //2.删除购物车信息
                            let sql3=`delete from shopcart where id in (${sidStr})`;
                            db.query(sql3,[],(err3,data3)=>{
                                if (err3) {
                                    console.log(err3);
                                    res.send({code:500,message:"服务器出错"});
                                }
                                else {
                                    res.send({code:200,message:"订单生成成功，跳转到详情页"})
                                }
                            })
                        }
                    })
                }
                else {
                    res.send({code:202,message:"插入失败"})
                }
            }
        });
    }
    else {
        res.send({code:200,message:"请先登录"});
    }
})

module.exports=router;