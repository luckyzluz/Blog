<template>
    <div class="test">
        
    </div>
</template>
<script>
export default {
    name:'welcome',
    mounted(){
        this.$storage.setItem('UseInfo',{name:'xiaoming',age:12});
        console.log('user=>',this.$storage.getItem("UseInfo"));
        // this.$storage.clearItem("age")
        // this.$storage.clearAll()
    }
}
</script>
<style>

</style>