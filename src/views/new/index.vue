<template>
    <el-row class="newStandard height-100">
        <el-col :span="4" class="newStandar-nav height-100 layout">
            <ul class="layout-main unstyle" style="margin-top:30px;">
                <router-link exact class="newStandard-item text-center" tag="li" v-for="(item,index) in routes" :key="index" :to="item.path"><i :class="item.iconClass"></i>{{item.label}}</router-link>
            </ul>
            <!-- leave-active-class="slideOutLeft" -->
            <transition enter-active-class="slideInLeft">
                <div class="text-center" style="margin-bottom:15px;" v-show="companyAnimation">
                    <div style="display:flex;justify-content:center;">
                        <img src="@/assets/images/barcode.png" width="200" height="200"/>
                    </div>
                    <p class="company-info">求打赏</p>
                </div>
            </transition>
        </el-col>
        <el-col :span="20" class="height-100">
            <transition leave-active-class="lightSpeedOut" mode="out-in">
                <router-view class="newStandard-content height-100"></router-view>
            </transition>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name:'newStandard',
        data(){
            return {
                routes:[
                    { label:'标签栏一', iconClass:'el-icon-document', path:'/new' },
                    { label:'标签栏二', iconClass:'el-icon-time', path:'/new/history' },
                    { label:'标签栏三', iconClass:'el-icon-s-order', path:'/new/report' },
                    { label:'标签栏四', iconClass:'el-icon-upload2', path:'/new/upload' },
                ],
                companyAnimation:false,
            }
        },
        mounted(){
            this.companyAnimation = true;
        }
    }
</script>

<style lang="scss" scoped>
.newStandard{
    .newStandar-nav{
        background-color: $shadow-color-alpha;
        .newStandard-item{
            height: $router-height;
            line-height: $router-height;
            position: relative;
            // color: $primary-color;
            cursor: pointer;
            padding: 0 15px 0 60;
            margin-bottom: 4px;
            >i{
                position: absolute;
                left: 30px;
                top: 50%;
                margin-top: -0.5em;
            }
        }
        .newStandard-item.router-link-active,.newStandard-item:hover{
            background-color: $white-color;
        }
        .newStandard-item::before{
            content:'';
            display: inline-block;
            width: 2px;
            height: $router-height;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -#{$router-height/2};
            transition: transform 0.3s linear;
            transform: scaleY(0);
        }
        .newStandard-item.router-link-active::before{
            //background-color: $primary-color;
            transform: scaleY(1);
        }
    }
    .newStandard-content{
        padding: 30px 10px 10px 30px;
    }
    .company-info{
        color: black;
        font-size: 80%;
    }
}
</style>