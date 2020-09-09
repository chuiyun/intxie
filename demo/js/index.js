let flag=true;//true为增加，false为修改
let modifyId;//存储修改时的ID
const app=new Vue({
    el:"#app",
    data:{
        textDisplay:"",
        showModels:false,
        search:"",
        student:[
            {id: 1, cardId: "6225880287860549", pwd: "909090", money: 9000},
            {id: 2, cardId: "6225880287862345", pwd: "666666", money: 100},
            {id: 3, cardId: "6225880287861234", pwd: "888888", money: 5000},
            {id: 4, cardId: "6225880287860549", pwd: "909090", money: 9000},
            {id: 5, cardId: "6225880287862345", pwd: "666666", money: 100},
            {id: 6, cardId: "6225880287861234", pwd: "888888", money: 5000},
            {id: 7, cardId: "6225880287860549", pwd: "909090", money: 9000},
            {id: 8, cardId: "6225880287862345", pwd: "666666", money: 100},
            {id: 9, cardId: "6225880287861234", pwd: "888888", money: 5000}
        ],
        addForm:{
            id:"",
            cardId:"",
            pwd:"",
            money:""
        }
    },
    computed:{
        searchList:function () {
            return this.student.filter((item)=>{
                return item.cardId.indexOf(this.search)>=0;
            })
        }
    },
    methods:{
        del:function (id) {
            for (let i=0;i<this.student.length;i++) {
                if (this.student[i].id==id) {
                    this.student.splice(i,1);
                    break;
                }
            }
        },
        add:function () {//添加按钮
            flag=true;
            this.textDisplay="添加学生信息";
            this.showModels=true;
        },
        addY:function () {
            if (flag) {    //存储添加的信息
                let obj={...this.addForm};
                this.student.push(obj);
            }
            else {    //保存修改信息
                for (let i=0;i<this.student.length;i++) {
                    if (this.student[i].id==modifyId) {
                        this.student[i].id=this.addForm.id;
                        this.student[i].cardId=this.addForm.cardId;
                        this.student[i].pwd=this.addForm.pwd;
                        this.student[i].money=this.addForm.money;
                        break;
                    }
                }
            }
            this.addForm.id="";
            this.addForm.cardId="";
            this.addForm.pwd="";
            this.addForm.money="";
            this.showModels=false;
        },
        addN:function () {//关闭模态框
            this.addForm.id="";
            this.addForm.cardId="";
            this.addForm.pwd="";
            this.addForm.money="";
            this.showModels=false;
        },
        modify:function (id) {//修改按钮
            flag=false;
            this.textDisplay="修改学生信息";
            this.showModels=true;
            for (let i=0;i<this.student.length;i++) {
                if (this.student[i].id==id) {
                    modifyId=id;
                    this.addForm.id=this.student[i].id;
                    this.addForm.cardId=this.student[i].cardId;
                    this.addForm.pwd=this.student[i].pwd;
                    this.addForm.money=this.student[i].money;
                    break;
                }
            }
        }
    }
})