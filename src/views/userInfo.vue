<template>
    <van-nav-bar left-arrow placeholder fixed title="个人信息" @click-left="this.$router.go(-1)"/>

    <van-cell-group >
        <van-cell title="头像" center>
            <template #value>
                    <van-image
                            round
                            fit="cover"
                            width="3rem"
                            height="3rem"
                            src="../public/lsq.png"
                        />
            </template>
        </van-cell>
        <van-cell title="用户名" value="内容" />
        <van-cell title="手机号" value="内容" />
        <van-cell title="性别" value="内容" />
        <van-cell title="生日" value="内容" />
    </van-cell-group>
</template>

<script>
export default {

}
</script>

<style>
</style>