<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info" :model="orderForm">
                <div class="member-info-item" v-for="(item,index) in orderForm.users" :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="item.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item,index) in insure" :key="index">
                    <el-checkbox 
                    @change="check(item)"
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}` "
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="orderForm.contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入手机号码" v-model="orderForm.contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="orderForm.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
            <input type="hidden" :value="setPrice">
        </div>
    </div>
</template>

<script>
export default {
    props:{
        insure:{
            type: Array,
            default:[]
        },
        data:{
            type:Object,
            default:{
                seat_infos:{},
            }
        }
    },
    data(){
        return{
            orderForm:{
                //用户列表
                users:[
                    {
                        username:'',
                        id:''
                    }
                ],
                insurances:[],//保险id
                contactName:'',//联系人名字
                contactPhone:'',//联系人电话
                invoice:'false',//是否需要发票
                seat_xid:this.$route.query.seat_xid,//座位id
                air:this.$route.query.id,//航班id,
                captcha: '',//手机验证码
            }
        }
    },
    computed:{
        setPrice(){
            let price = 0
            price = this.data.seat_infos.org_settle_price + this.data.airport_tax_audlet //机票价钱加燃油费
            // 保险
            price += this.orderForm.insurances.length * 30
            // 人数
            price = this.orderForm.users.length * price
            this.$store.commit('air/setPrice',price)
        }
    },
    methods: {
        // 选择保险
        check(item){
            const id = item.id
            // 先判断是否已经有该id，有的话即删除
            let index = this.orderForm.insurances.indexOf(id)
            if(index != -1){
                // 证明有
                this.orderForm.insurances.splice(index,1)
            }else{
                this.orderForm.insurances.push(id)
            }
        },

        // 添加乘机人
        handleAddUsers(){
            this.orderForm.users.push({
                username:'',
                id:''
            })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.orderForm.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            const reg = /^[1]([3-9])[0-9]{9}$/
            const phone = this.orderForm.contactPhone
            // 判断手机号码
            if(phone.trim().length == 0){
                this.$message.warning('手机号码不能为空!')
            }else if(!reg.test(phone)){
                this.$message.warning('请输入正确的手机号码！')
            }else{
                // 调用vuex封装的请求验证码接口
                this.$store.dispatch('user/code',phone).then(() => {
                    const code = this.$store.state.user.phoneCode
                    this.$confirm(`手机验证码为${code}`,'提示',{
                        type:'warning'
                    })
                })
            }
        },

        // 提交订单
        handleSubmit(){
            // 验证非空
            const rules = {
                users:{
                    value:this.orderForm.users[0].username && this.orderForm.users[0].id,
                    message:'乘机人姓名和身份证号不能为空'
                },
                contactName:{
                    value:this.orderForm.contactName,
                    message:'请填写联系人姓名'
                },
                contactPhone:{
                    value:this.orderForm.contactPhone,
                    message:'请填写联系人电话'
                },
                captcha:{
                    value:this.orderForm.captcha,
                    message:'请填写手机验证码'
                }
            }
            let valid = true
            Object.keys(rules).forEach((e) => {
                if(!valid) return
                if(!rules[e].value){
                    this.$message.error(rules[e].message)
                    valid = false
                }
            })
            if(!valid) return
            // 提交订单接口
            this.$axios({
                url:'airorders',
                method:'post',
                data:this.orderForm,
                headers:{
                    Authorization:"Bearer "+this.$store.state.user.userInfo.token
                }
            })
            .then(res => {
                this.$message.success(res.data.message)
            })
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>