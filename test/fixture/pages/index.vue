<template>
  <div>
    busy:
    <pre :style="{backgroundColor: $qAuth.busy? 'red': '' }">{{ $qAuth.busy }}</pre>
    <hr>
    <pre v-if="$qAuth.loggedIn" class="state" v-text="$qAuth.user" />
    <div v-else class="state">
      No
    </div>
  </div>
</template>

<script>
export default {}
</script>
