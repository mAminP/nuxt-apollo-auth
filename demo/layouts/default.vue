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
        :color="$qAuth.busy? 'warning' :$qAuth.loggedIn ? 'success' : 'error'"
        :icon="$qAuth.busy? 'mdi-key-outline':$qAuth.loggedIn ? 'mdi-lock-open' : 'mdi-lock'"
        class="mx-3"
        overlap
      >
        <v-chip label>
          loggedIn : {{ $qAuth.loggedIn }}
        </v-chip>
      </v-badge>

      <v-spacer />
      <v-btn outlined class="mx-2" :to="{ name: 'allowed' }">
        Allowed
      </v-btn>
      <v-btn outlined class="mx-2" :to="{ name: 'protected' }">
        Protected
      </v-btn>
      <v-btn
        v-if="!$qAuth.loggedIn"
        class="mx-2"
        outlined
        :to="{ name: 'login' }"
      >
        Login
      </v-btn>
      <v-btn v-else class="mx-2" outlined @click.stop="logout">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {
  LogoutMutation,
  LogoutMutationVariables
} from '../GraphQL/types/types'
@Component({})
export default class Default extends Vue {
  async logout () {
    try {
      const res = await this.$qAuth.logout<
        LogoutMutation,
        LogoutMutationVariables
      >({
        data: {
          time: new Date()
        }
      })
      console.log('res :>> ', res)
    } catch (error) {
      console.dir(error)
    }
  }
}
</script>
