<template>
    <div class="layout height-100">
        <div class="layout-main center">
            <img src="@/assets/images/noresource.jpg" alt="" width="200" height="200">
            <div>资源未授权，不可访问，<el-link class="el-link" @click="returnBack">返回上一级</el-link></div>
        </div>
    </div>
</template>

<script>
    //资源未授权，不可访问
    import { AES,enc } from 'crypto-js'
    export default {
        name:'unAuth',
        data(){
            return {}
        },
        methods:{
            returnBack(){
                let { query:{ from } = {} } = this.$route;

                let bytes = AES.decrypt(from,this.$store.state.secretKey)
                let originRoute = bytes.toString(enc.Utf8);

                from = from?JSON.parse(originRoute):{path:'/'};
                if(from.name == 'Error'){
                    this.$router.replace('/')
                    return false;
                }
                this.$router.replace(from)
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