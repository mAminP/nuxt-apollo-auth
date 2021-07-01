<template>
  <v-sheet class=" rounded d-flex flex-column justify-space-between fill-height ">
    <v-subheader class="">
      authenticated user:
    </v-subheader>
    <v-card-text class=" fill-height">
      <v-card
        v-if="$qAuth.loggedIn"
        rounded="xl"
        elevation="4"
        class="fill-height "
        color="grey darken-3"
      >
        <v-list dense color="transparent">
          <v-list-item v-for="(value, name, index) in $qAuth.user" :key="index">
            <span class="grey--text mx-1" v-text="name" /> :
            <span class="mx-1" v-text="value" />
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-else rounded="xl" elevation="4" class="fill-height " color="grey darken-3">
        <v-card-text class="fill-height d-flex align-center justify-center">
          <span>no user !</span>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class UserComponent extends Vue {}
</script>

<style lang="scss">
</style>
