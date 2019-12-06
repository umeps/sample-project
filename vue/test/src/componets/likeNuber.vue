<template>
    <div>
        <div>いいね({{ number /2}})</div>
        <button @click="plus">+1</button>
    </div>
</template>

<script>
export default {
    props:['number'],
    methods: {
        plus(){
            this.$emit("my-click", this.number + 1)
        }
        
    },
}
</script>

<style scoped>
div{
    background: red;
}
</style>