<template>
  <div>
    <modal
      :is="primera"
      type="modal"
    />
    <modal
      :is="segunda"
      type="submodal"
    />
  </div>
</template>

<script>
  export default {
    props: {
      modals: {
        type: Array,
        default: null
      }
    },
    computed: {
      primera () {
        return (this.modals) ? this.modals[0] : null
      },
      segunda () {
        return (this.modals) ? this.modals[1] : null
      }
    },
    mounted () {
      console.log(this.modals)
    }
  }
</script>
