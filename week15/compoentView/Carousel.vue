<template>
    <div>
        <img />
    </div>
</template>

<script>
export default {
    el: '#example',
    data: {
        msg: '1'
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            let i = 1;
            let s = '</1111>'
            while(i < 100) {
                i ++;
            }
            return this.message.split('').reverse().join('')
        }
    }

}
</script>