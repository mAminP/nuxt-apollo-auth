<template>
  <v-row>
    <v-col cols="12">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td class="d-flex flex-row flex-nowrap align-center">
                <v-subheader >loggedIn:</v-subheader>
                <v-chip :color="$qAuth.loggedIn? 'success':'error'">{{ $qAuth.loggedIn }}</v-chip>
              </td>
            </tr>
            <tr>
              <td class="">
                <v-subheader>available users:</v-subheader>
                <v-row dense color="transparent">
                  <v-col
                    lg="4"
                    md="6"
                    sm="6"
                    cols="12"
                    v-for="user in users"
                    :key="user.id"
                  >
                    <v-card>
                      <v-list>
                        <v-list-item v-for="(value, name,index) in user" :key="index" >
                          <span class="grey--text mx-1" v-text="name" /> :
                          <span  v-text="value"  class="mx-1"/> 
                          </v-list-item
                        >
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import {UserQ} from '../GraphQL/userGQL'
import {User, UsersQuery} from '../GraphQL/types/types'
@Component({})
export default class Index extends Vue {
  users: User[] = [] //  ({__typename: "User";} & Pick<User, "id" | "userName" | "email" | "password">)[] = [];
  async asyncData(ctx: Context) {
    const apollo = ctx.app.apolloProvider.defaultClient;
    const {
      data
    } = await apollo.query<UsersQuery>({
      query: UserQ.users
    });
    return {
      users: data.users,
    };
  }
}
</script>

<style lang="scss">
</style>