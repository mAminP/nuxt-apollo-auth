<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          This page is protected. Only authenticated users can access it
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <UserComponent />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  middleware: ['qAuth']
})
export default class Protected extends Vue {}
</script>

<style lang="scss">

</style>
