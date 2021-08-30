<template>
    <div class="wrapDiv">
        <input type="text" class="goodsEntry"
        v-model=name placeholder="商品名称"
        @blur="nameBlurFn"
        />
        <input type="text" class="goodsEntry"
        v-model=price placeholder="商品价格"
        @blur="priceBlurFn"
        />
        <input type="text" class="goodsEntry"
        v-model=discribe placeholder="商品信息"
        @blur="discribeBlurFn"
        />
        <input type="text" class="goodsEntry"
        v-model=image placeholder="商品图片"
        @blur="imageBlurFn"
        />
    </div>
</template>
<script>
export default {
    name:'entryGoods',
    data(){
        return {
            name:'',
            price:'',
            discribe:'',
            image:'',
            itemGoodsInfo:{
                n:'',
                p:'',
                d:'',
                i:''
            }
        }
    },
    methods:{
        nameBlurFn(){
            this.itemGoodsInfo.n=this.name;
            this.checkInputFn();
        },
        priceBlurFn(){
            this.itemGoodsInfo.p=this.price;
            this.checkInputFn();
        },
        discribeBlurFn(){
            this.itemGoodsInfo.d=this.discribe;
            this.checkInputFn();
        },
        imageBlurFn(){
            this.itemGoodsInfo.i=this.image;
            this.checkInputFn();
        },
        checkInputFn(){
            let _emp=true;
            // console.log(this.itemGoodsInfo);
            for(let i in this.itemGoodsInfo){
                if (!this.itemGoodsInfo[i]) {
                    _emp=false;
                }
            }
            if (_emp) {
                this.$emit('pushEntryGoodsInfo',this.itemGoodsInfo);
            }else{
                this.$emit('isEmptyGoods');
            }
        }
    }
}
</script>
<style type="text/css">
h1, h2 {
font-weight: normal;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
.cle:after{
content: '.';
overflow: hidden;
visibility: hidden;
height: 0;
display: block;
clear: both;
}
.wrapDiv{
width: 80%;overflow: hidden;border: 1px solid #666;
background: #eee;border-radius: 10px;
margin:10px auto;
}
.wrapDiv p.tip{
font-size: 22px;text-align: center;padding: 0;margin:5px 0;color: #666;
}
.goodsEntry{
    float: left;width: 30%;margin:10px;
    border-radius: 10px;border:1px solid #999;
    line-height: 30px;text-align: center;
    font-size: 16px;
}
</style>