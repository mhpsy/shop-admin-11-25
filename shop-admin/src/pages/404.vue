<template>
    <div>
        <el-result icon="warning" title="页面走丢了" sub-title="请联系管理人员">
            <template #extra>
                <el-button type="primary" @click="$router.push('/')">Back</el-button>
            </template>
        </el-result>
    </div>
</template>
<script setup>

</script>
<style lang="">

</style>
