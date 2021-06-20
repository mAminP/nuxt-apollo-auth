<template>
  <v-row>
    <v-col cols="12" md="4">
      <UserComponent />
    </v-col>
    <v-col cols="12" md="8">
      <v-card class="">
        <v-subheader>available users:</v-subheader>
        <v-row no-gutters color="transparent">
          <v-col
            lg="4"
            md="6"
            sm="6"
            cols="12"
            v-for="user in users"
            :key="user.id"
            class="pa-3"
          >
            <v-card
              elevation="4"
              :color="`${
                $qAuth.loggedIn && $qAuth.user.id === user.id
                  ? 'green darken-4'
                  : 'grey darken-3'
              }`"
              rounded="xl"
            >
              <v-list dense color="transparent">
                <v-list-item v-for="(value, name, index) in user" :key="index">
                  <span class="grey--text mx-1" v-text="name" /> :
                  <span v-text="value" class="mx-1" />
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <ScopeComponent />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { UserQ } from "../GraphQL/userGQL";
import { Account, UsersQuery } from "../GraphQL/types/types";
@Component({})
export default class Index extends Vue {
  users: Account[] = [];
  async asyncData(ctx: Context) {
    const apollo = ctx.app.apolloProvider.defaultClient;
    const { data } = await apollo.query<UsersQuery>({
      query: UserQ.users,
    });
    return {
      users: data.accounts,
    };
  }
}
</script>

<style lang="scss">
</style>