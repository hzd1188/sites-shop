<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
        
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/cart.html">购物车</a>
        </div>
    </div>

    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span> 放进购物车
                                </div>
                            </li>
                            <li class="active">
                                <div class="progress">
                                    <span>2</span> 填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span> 支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <div class="cart-box">
                    <h2 class="slide-tit">
                        <span>1、收货地址</span>
                    </h2>
                   <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="form-box address-info">
                            <el-row>
                                <el-col :span="10">
                                     <el-form-item label="收件人" prop="accept_name">
                                        <el-input v-model="form.accept_name"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                           <!-- 所在区域联动框 -->
                             <el-row>
                                <el-col :span="16">
                                    <el-form-item label="所在地区">
                                        <v-distpicker @selected="getarea"></v-distpicker>
                                    </el-form-item>
                             </el-col>
                            </el-row>
                            
                           <el-row>
                                <el-col :span="10">
                                     <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="form.address"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                     <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="form.mobile"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                            <el-row>
                                <el-col :span="10">
                                     <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="form.email"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                     <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="form.post_code"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <h2 class="slide-tit">
                            <span>2、支付方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <el-radio class="radio" v-model="form.payment_id" label="6">在线支付</el-radio>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>3、配送方式</span>
                        </h2>
                        <el-radio-group class="item-box clearfix" v-model="form.express_id" @change="expressChange">
                                <el-radio v-for="item in expresslist" :key="item.id" :label="item.id">{{item.title}}(运费：{{item.express_fee}} 元)</el-radio>
                        
                         </el-radio-group>
                        <h2 class="slide-tit">
                            <span>4、商品清单</span>
                        </h2>
                        <div class="line15"></div>
                        <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                            <tbody>
                                <tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for="item in goodslist" :key="item.id">
                                    <td width="68">
                                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                    <img :src="item.img_url" class="img">
                                        </router-link>
                                    </td>
                                    <td>
                                       <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                {{item.title}}
                                        </router-link>
                                    </td>
                                    <td>
                                        <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                    </td>
                                     <td align="center" v-text="item.buycount"></td>
                                    <td>
                                         ￥{{ item.buycount * item.sell_price }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="line15"></div>
                        <h2 class="slide-tit">
                            <span>5、结算信息</span>
                        </h2>
                        <div class="buy-foot clearfix">
                            <div class="left-box">
                                <dl>
                                    <dt>订单备注(100字符以内)</dt>
                                    <dd>
                                         <textarea name="message" class="input" style="height:35px;" v-model="form.message"></textarea>
                                    </dd>
                                </dl>
                            </div>
                            <div class="right-box">
                                <p>
                                    商品 <label class="price">{{goodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                    <label id="goodsAmount" class="price">{{form.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p>
                                    运费：￥<label id="expressFee" class="price">{{form.expressMoment}}</label> 元
                                </p>
                                <p class="txt-box">
                                    应付总金额：￥<label id="totalAmount" class="price">{{totalAmount}}</label>
                                </p>
                                <p class="btn-box">
                                    <a class="btn button" href="/cart.html">返回购物车</a>
                                    <input id="btnSubmit" @click="submitform" type="button" value="确认提交" class="btn submit">
                                </p>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    </div>

    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker';

    import {
        getItem
    } from '../../kits/locaStoragekit.js';
    export default {
        components: {
            VDistpicker
        },
        data() {
            // 自定义一个方法用来验证手机号的格式
            var checkMobile = (rule, value, callback) => {
                // 定义一个手机号码的正则表达式
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('手机号码格式错误'));
                }
                callback();
            };

            var checkEmail = (rule, value, callback) => {
                // 定义一个正则表达式
                var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('emial格式错误'));
                }
                callback();
            };

            var checkZipCode = (rule, value, callback) => {
                // 定义一个正则表达式
                var reg = /^\d{6}$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('邮编格式错误'));
                }
                callback();
            };

            return {
                expresslist: [],
                goodslist: [],
                form: {
                    accept_name: '',
                    address: '',
                    mobile: '',
                    email: '',
                    post_code: '',
                    area: {},
                    payment_id: '',
                    message: '',
                    expressMoment: 20, //快递费默认20
                    goodsids: this.$route.params.ids,
                    goodsAmount: 0,
                    express_id: 1,
                },
                rules: {
                    accept_name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }],
                    mobile: [
                        // 手机号码一定是格式要正确
                        {
                            validator: checkMobile,
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        // 
                        {
                            validator: checkEmail,
                            trigger: 'blur'
                        }
                    ],
                    post_code: [
                        // 
                        {
                            validator: checkZipCode,
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        created() {
            this.getexpresslist();
            this.getgoodslist();
        },
        computed: {
            totalAmount() {
                //总价格 = 商品的总价 + 运费
                var amount = this.form.goodsAmount + this.form.expressMoment;

                return amount;
            }
        },
        methods: {
            // 提交表单
            submitform() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        // 提交到服务器
                        this.$http.post('/site/validate/order/setorder', this.form)
                            .then(res => {
                                // 提醒
                                this.$message.success({
                                    message: res.data.message,
                                    duration: 1000, //表示提示框是1秒钟以后关闭
                                    onClose: () => {
                                        // 跳转
                                        this.$router.push({
                                            name: 'goodslist'
                                        });
                                    }
                                });
                            });
                    } else {
                        console.log('表单验证失败');
                        return false;
                    }
                });
            },

            // 获取当前选择快递费运费费用
            expressChange(expressid) {
                var newArr = this.expresslist.filter(function(item) {
                    return item.id == expressid;
                });
                this.form.expressMoment = newArr[0].express_fee;
            },

            // 获取购买商品数据
            getgoodslist() {
                this.$http.get('/site/comment/getshopcargoods/' + this.form.goodsids).then(res => {
                    this.goodslist = res.data.message;

                    // 遍历this.goodslist 根据其中的商品id获取localStorage中的购买数量赋值给goodslist这个商品的buycount
                    var goodsObj = getItem();
                    this.goodslist.forEach(item => {
                        item.buycount = goodsObj[item.id];
                        // 将所有商品的价格计算出来以后累加即可
                        this.form.goodsAmount += (item.sell_price * item.buycount);

                    });
                })
            },
            // 获取快递运送方式
            getexpresslist() {
                var url = '/site/validate/order/getexpresslist';
                this.$http.get(url).then(res => {
                    /*expresslist格式：
                        [
                            {
                            id: 1,
                            title: "顺丰快递",
                            express_fee: 20
                            },
                            {
                            id: 2,
                            title: "圆通快递",
                            express_fee: 10
                            },
                            {
                            id: 3,
                            title: "韵达快递",
                            express_fee: 8
                            }
                            ]
                            
                    */
                    this.expresslist = res.data.message;
                    // this.form.express_id = res.data.message.id;
                });
            },
            // 三级联动
            getarea(data) {
                this.form.area = data;
            }

        }
    }
</script>

<style>

</style>