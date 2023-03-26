<template>
    <div>
        <h1>msg-{{msg}}</h1>
    </div>
</template>
<script setup>
// defineProps({
//     msg:String
// })

</script>
<script>
export default {
    name:'msg',
   props:['msg'] 
}
</script>