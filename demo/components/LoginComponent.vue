<template>
  <v-card>
    <v-card-title>Login :</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <v-text-field
          v-model="requset.email"
          :rules="rules.email"
          label="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="requset.password"
          :rules="rules.password"
          label="password"
          type="password"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" @click.stop="submitForm" color="success">
          Login
        </v-btn>
        <v-btn color="error" outlined @click.stop="reset"> Reset Form </v-btn>

        <v-btn color="warning" outlined @click.stop="resetValidation">
          Reset Validation
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {
  LoginMutationVariables,
  LoginMutation,
  LoginInput,
  MeQuery,
  Account,
} from "demo/GraphQL/types/types";
import { Vue, Component, Ref } from "vue-property-decorator";

type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};
class LoginRequset implements LoginInput {
  email:string
  password: string
}

@Component({
  data() {
    return {
      rules: {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "Password is required"],
      },
    };
  },
})
export default class LoginComponent extends Vue {
  @Ref("form") readonly form!: VForm;
  valid: boolean = true;
  public requset = new LoginRequset();
  rules: any;
  async submitForm() {
    if (this.form.validate()) {
      try {
        const res = await this.$qAuth.login<
          LoginMutation,
          LoginMutationVariables,
          MeQuery,
          Account
        >({ data: this.requset });
      } catch (error) {
        const {graphQLErrors} = error
        console.log('graphQLErrors :>> ', graphQLErrors[0].message);
        console.dir(error)
      }
    }
  }
  reset() {
    this.form.reset();
  }
  resetValidation() {
    this.form.resetValidation();
  }
}
</script>

<style lang="scss">
</style>