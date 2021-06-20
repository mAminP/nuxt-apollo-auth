<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          This page is allowed for all
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <UserComponent />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
     middleware: ["qAuth"],
     qAuth:false
})
export default class Allowed extends Vue {

}
</script>

<style lang="scss">

</style>