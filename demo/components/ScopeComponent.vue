<template>
  <v-sheet class="rounded d-flex flex-column justify-space-between fill-height">
    <v-card-title class="subtitle-2">
      <span class="grey--text">Scope check :</span>
      <v-spacer />
      <span
        class="grey--text text--darken-2"
      >ScopeKey : {{ $qAuth.options.scopeKey }}</span>
    </v-card-title>
    <v-card-text v-if="$qAuth.loggedIn" class="fill-height">
      <v-card class="mt-3 mb-4" rounded="xl" outlined>
        <v-subheader>user scopes:</v-subheader>
        <v-card-text>
          <v-list v-if="Array.isArray(userScopes)" tag="ul" dense>
            <v-list-item v-for="(item, index) in userScopes" :key="index" tag="li">
              <v-icon class="mx-2">
                mdi-circle-small
              </v-icon>
              <v-list-item-title v-text="item" />
            </v-list-item>
          </v-list>
          <v-list-item v-else>
            <v-icon class="mx-2">
              mdi-circle-small
            </v-icon>
            <v-list-item-title v-text="userScopes" />
          </v-list-item>
        </v-card-text>
      </v-card>
      <v-text-field
        v-model="scope"
        dense
        :append-outer-icon="hasScope ? 'mdi-check-circle' : 'mdi-close-circle'"
        :color="hasScope ? 'success' : 'error'"
        label="Scope"
        outlined
        rounded
        hide-details
      />
    </v-card-text>
    <v-card
      v-else
      rounded="xl"
      elevation="4"
      class="fill-height"
      color="grey darken-3"
    >
      <v-card-text class="fill-height d-flex align-center justify-center">
        <span>no user !</span>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class ScopeComponent extends Vue {
  scope: string = '';
  get hasScope (): boolean {
    return this.$qAuth.hasScope(this.scope)
  }

  get userScopes (): string | string[] | null | undefined {
    return this.$qAuth.user[this.$qAuth.options.scopeKey]
  }
}
</script>

<style lang="scss">
</style>
