<template>
  <v-row>
    <v-col cols="12">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td class="d-flex flex-row flex-nowrap align-center">
                <span class="mr-2">$qAuth.loggedIn:</span>
                <v-chip >{{ $qAuth.loggedIn }}</v-chip> 
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

@Component({})
export default class Index extends Vue {}
</script>

<style lang="scss">
</style>