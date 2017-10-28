<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
        
    <!-- 导航栏 -->
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/goods.html">购物商城</a>
            <a href="/goods/42/1.html">商品详情</a>

        </div>
    </div>

    <!-- 商品详情 -->
    <div class="section" v-if="ginfo.goodsinfo">
        <div class="wrapper clearfix">
            <div class="wrap-box">
                <!--页面左边-->
                <div class="left-925">
                    <div class="goods-box clearfix">
                        <!--商品图片-->
                        <div class="pic-box">
                             <div class="magnifier" id="magnifier1">
                                            <div class="magnifier-container">
                                                <div class="images-cover"></div>
                                                <!--当前图片显示容器-->
                                                <div class="move-view"></div>
                                                <!--跟随鼠标移动的盒子-->
                                            </div>
                                            <div class="magnifier-assembly">
                                                <div class="magnifier-btn">
                                                    <span class="magnifier-btn-left">&lt;</span>
                                                    <span class="magnifier-btn-right">&gt;</span>
                                                </div>
                                                <!--按钮组-->
                                                <div class="magnifier-line">
                                                    <ul class="clearfix animation03">
                                                        <li v-for="item in ginfo.imglist" :key="item.id">
                                                            <div class="small-img">
                                                                <img :src="item.original_path" />
                                                            </div>
                                                        </li>
                                                                                                          
                                                    </ul>
                                                </div>
                                                <!--缩略图-->
                                            </div>
                                            <div class="magnifier-view"></div>
                                            <!--经过放大的图片显示容器-->
                                        </div>

                        </div>
                        <!--/商品图片-->

                        <!--商品信息-->
                        <div class="goods-spec">
                             <h1 v-text="">{{ginfo.goodsinfo.title}}</h1> 
                            <p class="subtitle">{{ginfo.goodsinfo.sub_title}}</p>
                            <div class="spec-box">
                                <dl>
                                    <dt>货号</dt>
                                    <dd id="commodityGoodsNo">{{ginfo.goodsinfo.goods_no}}</dd>
                                </dl>
                                <dl>
                                    <dt>市场价</dt>
                                    <dd>
                                        <s id="commodityMarketPrice">¥{{ginfo.goodsinfo.market_price}}</s>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>销售价</dt>
                                    <dd>
                                        <em class="price" id="commoditySellPrice">¥{{ginfo.goodsinfo.sell_price}}</em>
                                    </dd>
                                </dl>
                            </div>

                            <div class="spec-box">
                                <dl>
                                    <dt>购买数量</dt>
                                    <dd>
                                        <div class="stock-box">
                                            <el-input-number v-model="buyCount"  :min="1">
                                            </el-input-number>
                                        </div>
                                        <span class="stock-txt">库存<em id="commodityStockNum">10</em>件</span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dd>
                                        <div class="btn-buy" id="buyButton">
                                            <router-link to="/site/shoping">
                                                <button class="buy"> 
                                                    立即支付
                                                </button>
                                             </router-link>
                                            <button class="add" @click="addcar">加入购物车</button>
                                        </div>
                                    </dd>
                                </dl>
                            </div>

                        </div>
                        <!--/商品信息-->
                    </div>

                    <div id="goodsTabs" class="goods-tab bg-wrap">
                        <!--选项卡-->
                        <Affix>
                        <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                            <ul>
                                <li>
                                    <a v-bind="{class:iscontent?'selected':'' }" href="javascript:;"  @click="changepag(true)">商品介绍</a>
                                </li>
                                <li>
                                    <a href="javascript:;" v-bind="{class:!iscontent?'selected':'' }"  @click="changepag(false)">商品评论</a>
                                </li>
                            </ul>
                        </div>
                        </Affix>
                        <!--/选项卡-->

                        <!--选项内容-->
                        <div class="tab-content entry" style="display:block;" v-if="iscontent">
                             <span v-html="ginfo.goodsinfo.content"></span>
                        </div>

                        <div class="tab-content" v-if="!iscontent">
                            <!--网友评论-->
                            <div class="comment-box">
                                <!--取得评论总数-->
                                <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                    <div class="avatar-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </div>
                                    <div class="conn-box">
                                        <div class="editor">
                                            <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容" v-model="txtContent"></textarea>
                                            <span class="Validform_checktip"></span></div>
                                        <div class="subcon">
                                            <input type="button" value="提交评论" class="submit" @click="submitComment">
                                            <span class="Validform_checktip"></span></div>
                                    </div>
                                </form>
                                <ul id="comonlist" class="list-box">
                                   <p v-if="comonlist.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">
                                            暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comonlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span v-text="item.user_name"></span>
                                                    <span>{{item.add_time|datefmt('YY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p v-text="item.content"></p>
                                            </div>
                                        </li>
                                </ul>
                                <!--放置页码-->
                                <div class="page-box" style="margin:5px 0 0 62px">
                                     <el-pagination
                                            @size-change="pageSizeChange"
                                            @current-change="pageIndexChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[1,5,10, 20, 30, 50]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalCount">
                                          </el-pagination>
                                </div>
                                <!--/放置页码-->
                            </div>

                            <!--/网友评论-->
                        </div>

                    </div>

                </div>
                <!--/页面左边-->

                <!--页面右边-->
                <div class="left-220">
                    <div class="bg-wrap nobg">
                        <div class="sidebar-box">
                            <h4>推荐商品</h4>
                            <ul class="side-img-list">

                                <li v-for="item in ginfo.hotgoodslist">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                  {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | datefmt('YY-MM-DD')}}</span>tv
                                        </div>
                            </li> 

                               
                            </ul>
                        </div>
                    </div>
                </div>
                <!--/页面右边-->
            </div>
        </div>
    </div>

    </div>
</template>

<script>
    import Affix from 'iview/src/components/affix';

    // 导入vm.js
    import {
        vm,
        key
    } from '../../kits/vm.js';

    // 导入localStoragekit.js
    import {
        setItem
    } from '../../kits/locaStoragekit.js';



    // 导入jquery插件文件
    import '../../../statics/js/jqplugins/imgzoom/magnifier.js';

    // $(function() {
    //     $('#magnifier1').imgzoon({
    //         magnifier: '#magnifier1'
    //     });
    // });

    // es6的export default{ 写法等同于 module.exports={
    export default {

        components: {
            Affix
        },
        // es6的写法 data() 等同于es5的 data:function()
        data() {
            return {
                buyCount: 1,
                ginfo: {},
                iscontent: true,
                comonlist: [], //评论数据
                txtContent: '',
                pageIndex: 1,
                pageSize: 10,
                totalcount: 0,
            }
        },
        created() {
            this.getginfo();
            this.getcommonlist();
        },

        watch: {
            '$route': function() {
                this.getginfo();
                this.getcommonlist();
            }
        },
        methods: {

            // 加入购物车
            addcar() {
                // 通过vm.导入触发事件
                // vm.$emit(key, this.buyCount)



                // 通过vuex进行触发
                this.$store.dispatch('changeBuycount', this.buyCount);

                // 设置id和数量到localStorage
                setItem({
                    gid: this.$route.params.goodsid,
                    bcount: this.buyCount
                })
            },

            pageIndexChange(val) {
                this.pageIndex = val;
                this.getcommonlist();
            },

            // 设当页总条数
            pageSizeChange(val) {
                this.pageSize = val;
                this.getcommonlist();

            },

            // 分页获取当前评论数据
            getcommonlist() {
                var goodsid = this.$route.params.goodsid;
                var url = '/site/comment/getbypage/goods/';
                this.$http.get(url + goodsid + "?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize).then(res => {
                    this.comonlist = res.data.message;
                    // console.log(res.data.message)

                    this.totalCount = res.data.totalcount;
                })
            },
            // 点击提交评论
            submitComment() {
                // 1.0 判断如果文本框中没值，提醒用户
                if (this.txtContent.length <= 0) {
                    this.$message.error('评论信息必须填写');
                    return;
                }
                // 提交评论信息
                var goodsid = this.$route.params.goodsid;
                this.$http.post('/site/validate/comment/post/goods/' + goodsid, "commenttxt=" + this.txtContent)
                    .then(res => {
                        // 3.0 清空文本框信息
                        this.txtContent = '';
                        // 4.0 刷新当前商品的评论数据即可
                        this.getcommonlist();
                    });
            },

            changepag(iscontent) {
                this.iscontent = iscontent;
            },
            // 
            getginfo() {

                var goodsid = this.$route.params.goodsid;
                this.$http.get('/site/goods/getgoodsinfo/' + goodsid).then(res => {
                    this.ginfo = res.data.message;
                    // console.log(res.data.message);

                    // 等图片数据加载回来以后再去执行插件的初始化操作
                    setTimeout(() => {
                        $('#magnifier1').imgzoon({
                            magnifier: '#magnifier1'
                        });
                    }, 100);
                })
            }

        }
    }
</script>

<style>
    @import url('../../../statics/js/jqplugins/imgzoom/css/magnifier.css')
</style>