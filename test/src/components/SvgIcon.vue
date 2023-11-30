<template>
    <svg :style="{ width: props.width, height: props.height }">
        <use :xlink:href="`#icon-${props.name}`" :fill="props.color"></use>
    </svg>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        default: 'file',
        isrequired: true
    },
    color: {
        type: String,
        default: 'red'
    },
    width: {
        type: String,
        default: '1rem'
    },
    height: {
        type: String,
        default: '1rem'
    }
})
</script>

<style scoped></style>
