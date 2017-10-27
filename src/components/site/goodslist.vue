<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
     <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
               <router-link to="/site/goodslist">
                                    购物商城
                                </router-link>
            </div>
        </div>

        <div class="section">
    <div class="wrapper">
        <div class="wrap-box">
            <!--类别菜单-->
            <div class="left-220" style="margin:0;">
                <div class="banner-nav">
                    <ul>
                    <!--此处声明下面可重复循环-->
                     
                        <li v-for="(item,index) in list.catelist" :key="index">
                            <h3>
                                <i class="iconfont icon-arrow-right"></i>
                                <span v-text="item.title"></span>
                                <p>
                                 <span v-for="(citem,index) in item.subcates">{{citem.title}} &nbsp;</span>
                                 
                                </p>
                            </h3>
                            <div class="item-box">
                                <!--如有三级分类，此处可循环-->
                                <dl>
                                    <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                    <dd>
                                         
                                        <a v-for="(citem,index) in item.subcates" href="/goods/43.html">{{citem.title}}</a>
                                         
                                       
                                         
                                    </dd>
                                </dl>
                            </div>
                        </li>
                     
                        
                     
                    </ul>
                </div>
            </div>
            <!--/类别菜单-->
             
            <!--幻灯片-->
            <div class="left-705">
                <div class="banner-img">
                    <div id="focus-box" class="focus-box">
                       <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in list.sliderlist" :key="item.id">
                            <img height="343" :src="item.img_url" alt="">
                            <h3>{{ item.title }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                     
                </div>
            </div>
            <!--/幻灯片-->
             
            <!--推荐商品-->
            <div class="left-220">
                <ul class="side-img-list">
                 
                    <li v-for="(item,index) in list.toplist">
                        <div class="img-box">
                            <label>{{index+1}}</label>
                            <img :src="item.img_url">
                        </div>
                        <div class="txt-box">
                            <a href="/goods/show-98.html">{{item.title}}</a>
                            <span>{{item.add_time|datefmt('YY-MM-DD HH:mm:ss')}}</span>
                        </div>
                    </li>
                 
                   
                 
                 </ul>
             </div>
            <!--/推荐商品-->
         </div>
      </div>
   </div>

         <div class="section">
           <div v-for="(item,index) in clist" :key="index">
                <!--子类-->
                  <div class="main-tit">
                        <h2>{{item.catetitle}}</h2>
                        <p>
                        
                           <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" 
                              href="/goods/43.html">{{subitem.subcatetitle}}</a>    
                            
                           
                            
                            <a href="/goods/40.html">更多
                            <i>+</i>
                            </a>
                        </p>
                    </div>
                        <!--/子类-->
                    <div class="wrapper clearfix">
                            <div class="wrap-box">
                                <ul class="img-list">
                                
                                    <li v-for="(item,index) in item.datas" :key="index">
                                       <router-link v-bind="{to:'/site/goodsinfo/'+item.artID}">
                                        <div class="img-box">
                                            <img :src="item.img_url">
                                        </div>
                                        <div class="info">
                                            <h3>{{item.artTitle}}</h3>
                                            <p class="price">
                                              <b>¥{{item.sell_price}}</b>元</p>
                                            <p>
                                              <strong>库存 {{item.stock_quantity}}</strong>
                                              <span>市场价：
                                              <s v-text="item.market_price"></s>
                                              </span>
                                            </p>
                                        </div>
                                       </router-link>
                                    </li>
                                
                                </ul>
                            </div>
                    </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    // es6的export default{ 写法等同于 module.exports={
    export default {
        // es6的写法 data() 等同于es5的 data:function()
        data() {
            return {
                // 首页顶部分页导航，轮播图，置顶数据
                list: {},

                clist: [],
            }
        },
        created() {
            this.getlist();
            this.getClist();
        },
        methods: {

            // 获取首页顶部分页导航，轮播图，置顶数据
            getlist() {
                this.$http.get('/site/goods/gettopdata/goods').then(res => {
                    this.list = res.data.message;
                    //  console.log(res.data.message.sliderlist);
                })
            },

            //  获取 商品首页按照分类分组获取数据
            getClist() {
                this.$http.get('/site/goods/getgoodsgroup').then(res => {
                    this.clist = res.data.message;
                    //  console.log(res.data.message);
                })
            }
        }
    }
</script>

<style>
    .el-carousel__container {
        height: 343px;
    }
    
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 30px;
        margin: 0;
    }
</style>