<script>
export default {
    props: {
        placeholder: String,
        value: String,
        id: String,
    }
}
</script>


<template>
    <textarea type="text" :placeholder="placeholder" :value="value" :id="id"
        class="w-full rounded border border-Theme-color1 py-1.5 px-2 text-Theme-color2 text-md font-medium outline-0 focus:border-Theme-color3 placeholder:capitalize min-h-[120px] resize-none placeholder:text-gray-400"></textarea>
</template>