// 接口列表
const port=4567;
const BASEURL='http://localhost:'+port;
const API_LIST={
    node_a:BASEURL+'/node_a',
    node_b:BASEURL+'/node_b',
    register_post:BASEURL+'/register_post',//注册
    check_name_existence:BASEURL+'/check_name_existence',//校验重名
    user_login_post:BASEURL+'/user_login_post',//登录
    insertGoods:BASEURL+'/insert_Goods',//批量添加商品
    getGoodsCategory:BASEURL+'/get_GoodsCategory',//获取商品大类
    getGoodsInfoById:BASEURL+'/get_GoodsInfoById',//根据商品id获取商品详情
    getGoodsListByCategory:BASEURL+'/get_GoodsListByCategory',//获取商品类别下的商品列表
    getPageGoodsList:BASEURL+'/get_PageGoodsList',//获取分页数据
    getSwipeImages:BASEURL+'/get_SwipeImages'
}

module.exports=API_LIST