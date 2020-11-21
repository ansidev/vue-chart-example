export default {
  methods: {
    addWheelEvent (refId) {
      const self = this
      this.$nextTick(() => {
        const el = this.$refs[refId]
        el.addEventListener('wheel', self.onWheel)
      })
    },
    onWheel (e) {
      /* Check whether the wheel event is supported. */
      if (e.type !== 'wheel') {
        return
      }
      /* Determine the direction of the scroll (< 0 → up, > 0 → down). */
      var delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1

      if (delta < 0) {
        this.$emit('wheel-up', e)
      } else {
        this.$emit('wheel-down', e)
      }
    }
  }
}
