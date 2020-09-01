/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}
$(function () {
    let layer=layui.layer;
//登录
    $("#loginBtn").click(function () {
        let user=$("#loginUser").val();
        let pwd=$("#loginPwd").val();
        if (user.trim().length==0) {
            layer.alert("用户名不能为空！");
        }
        else if(pwd.trim().length==0) {
            layer.alert("密码不能为空！");
        }
        else {
            let index=myLoading();
            $.ajax(
                {
                    type:"POST",
                    url:"/userLogin",
                    data:"user="+user+"&pwd="+pwd,
                    success:function (data) {
                        layer.close(index);
                        layer.alert(data.message);
                        if (data.code==200) {
                            // close1();
                            // console.log(data);
                            // $("#user").html("<img class='userHead' src='"+data.data[0].headImage+"'><span>"+user+"</span>")
                            location.reload();//刷新页面
                        }
                    }
                }
            )
        }
    })
//注册
    $("#zhuceBtn").click(function () {
        let obj={"Email":"邮箱","zhuceUser":"用户名","zhucePwd":"密码", "resPwd":"确认密码"};
        let flag=true;
        for (let key in obj) {
            if ($("#"+key).val().trim().length==0) {
                flag=false;
                layer.alert(obj[key]+"不能为空");
                break;
            }
        }
        if (flag) {
            let index=myLoading();
            $.ajax({
                type:"post",
                url: "/reg",
                data:$("#frmReg").serialize(),
                success:function (data) {
                    layer.close(index);
                    layer.alert(data);
                    if(data=="注册成功"){
                        switchLogin();
                    }
                }
            })
        }
    })
})

function myLoading(){
    layer.load(2,{
        shade:[0.5,"#000"],
        content:"",
        success:function (layero) {
            layero.find('.layui-layer-content').css({
                'paddingTop':'40px',
                'textAlign':'center',
                'backgroundPositionX':'center',
                'color':'#fff',
                'fontSize':'16px',
                'fontWeight':'700',
                'letterSpacing':'2px'
            });
        }
    })
    return layer.load()
}