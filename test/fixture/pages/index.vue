<template>
  <div v-if="$qAuth.loggedIn" class="state">Yes</div>
  <div v-else class="state">No</div>
</template>

<script>
export default {};
</script>
