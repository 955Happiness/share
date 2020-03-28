<template>
    <div class="layout height-100">
        <div class="layout-main center">
            <img src="@/assets/images/noresource.jpg" alt="" width="200" height="200">
            <div style="margin-top:15px;">访问资源不存在，<el-link class="el-link" @click="returnBack">返回上一级</el-link></div>
        </div>
    </div>
</template>

<script>
    //访问资源不存在
    export default {
        name:'Error',
        data(){
            return {}
        },
        methods:{
            returnBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
.center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.el-link{
    margin-top: -4px;
}
</style>