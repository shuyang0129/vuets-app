<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import * as Interface from "@/models/interface";

@Component({
  components: {}
})
export default class App extends Vue {
  @Action("setUser") setUser!: any;

  created() {
    this.setUser(localStorage.tsToken);
    (this.$router as any).onError((err: any) => console.error(err));
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
