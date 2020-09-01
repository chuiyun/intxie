const express=require("express");
const bodyParser=require("body-parser");
const favicon=require("serve-favicon");
const logger=require("morgan");
const userRouter=require("./router/user");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const ejs=require("ejs");
const viewRouter=require("./router/viewRouter");
const productRouter=require("./router/productRouter");
const app=express();
//配置日志
app.use(logger("dev"));
//定义EJS模板引擎和模板文件位置，也可以使用jade或其他模板引擎
app.set('views',__dirname+'/view');
app.engine("html",ejs.__express);
app.set('view engine','html');
//定义字体图标
app.use(favicon(__dirname+'/public/favicon.ico'));
//配置cookie
app.use(cookieParser());
//配置session
app.use(session({
    secret:'12345',   //密钥
    name:'testapp',  //name的值是cookie的name
    cookie:{maxAge:800000},//过期时间
    rolling:true,      //更新session-cookie失效时间
    resave:true    //重新保存
}))
//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//动态路由放在静态路由前面，配置要放在动态路由前面
app.use(userRouter);
app.use(viewRouter);
app.use(productRouter);
//拦截请求
// app.use("/index.html",(request,response)=>{
//     if (request.session.user) {
//         response.render("index",{user:request.session.user,headImage:request.session.info.headImage})
//     }
//     else {
//         response.render("index",{user:request.session.user})
//     }
// });
//配置静态资源文件
app.use(express.static(__dirname+'/public'));
app.listen(8888);
