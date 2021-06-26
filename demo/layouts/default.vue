<template>
  <v-app app>
    <v-app-bar app>
      <nuxt-link
        class="text-decoration-none white--text"
        :to="{ name: 'index' }"
      >
        <v-toolbar-title>DEMO</v-toolbar-title>
      </nuxt-link>
       <v-badge
        bordered
        :color="$qAuth.loggedIn ? 'success' : 'error'"
        :icon="$qAuth.loggedIn ? 'mdi-lock-open' : 'mdi-lock'"
        class="mx-3"
        overlap
      >
       <v-chip label >loggedIn : {{$qAuth.loggedIn}}</v-chip>
      </v-badge>
      
      <v-spacer></v-spacer>
      <v-btn outlined class="mx-2" :to="{name: 'allowed'}">Allowed</v-btn>
      <v-btn outlined class="mx-2" :to="{name: 'protected'}">Protected</v-btn>
      <v-btn class="mx-2" v-if="!$qAuth.loggedIn" outlined :to="{ name: 'login' }"
        >Login</v-btn
      >
      <v-btn class="mx-2" v-else outlined @click.stop="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Default extends Vue {
  async logout() {
    await this.$qAuth.logout();
  }
}
</script>
