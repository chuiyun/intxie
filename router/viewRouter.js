const router =require('express').Router();
const db=require("./sqlHelp");
router.get("/",(req,res)=>{
    res.redirect("/index.html");
});
router.get("/index.html",async (req,res)=>{
    let bannerList=await getBanner();
    let newList=await getNewList();
    if (req.session.user) {
        res.render("index",{user:req.session.user,headImage:req.session.info.headImage,
            lunbo:bannerList,
            newList:newList
        })
    }
    else {
        res.render("index",{user:req.session.user,
                lunbo:bannerList,
                newList:newList
            }
        );
    }
    // getBanner().then((data)=>{
    //     //data从数据库得到的banner信息
    //     return getNewList();
    // }).then((data)=>{
    //     newList=data;
    // }).catch((err)=>{
    //
    // })
})

function getBanner() {
    return new Promise((resolve,reject)=>{
        let sql="select * from banner where keyName='lun'";
        db.query(sql,[],(err,data)=>{
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

function getNewList(){
    return new Promise((resolve,reject)=>{
        let sql2="SELECT product.*,productrule.Id AS rid FROM product JOIN productrule  ON product.Id=productrule.productId WHERE isDefault=1 AND isNew=1";
        db.query(sql2,[],(err,data)=>{
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
router.get("/product.html",(req,res)=>{
    res.render("product");
})
router.get("/user.html",(req,res)=>{
    let sql="select * from user";
    db.query(sql,[],(err,data)=>{
        res.render("user",{userList:data});
    })
})
router.get("/productDetail.html",(req,res)=>{
    let rid=req.query.id;
    let sql="SELECT *,r.Id AS rid FROM product AS p JOIN productrule AS r ON p.id=r.productId WHERE r.id=?";
    db.query(sql,[rid],(err,data)=>{
        res.render("productDetail",{info:data[0],
            user:req.session.user,
            headImage:req.session.headImage
        });
    })
})
router.get("/cart.html",(req,res)=>{
    if (req.session.user) {
        let userId=req.session.info.id;
        let sql=`SELECT s.id as sid,p.feng,p.title,r.price,s.num,r.Id AS rid FROM
                shopcart s JOIN productrule r
                ON s.ruleId=r.Id JOIN product p
                ON r.productId=p.id where s.userId=?`;
        db.query(sql,[userId],(err,data)=>{
            res.render("cart",{user:req.session.user,
                headImage:req.session.headImage,
                productList:data
            });
        })

    }
    else {
        res.redirect("/index.html");
    }

})
module.exports=router;