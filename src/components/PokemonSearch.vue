<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="searchbar">
          <form @submit.prevent="setPokemonUrl" class="d-flex justify-content-center align-items-center">
            <input type="text" v-model="searchvalue" class="form-control" />
            <button class="btn btn-primary mx-3" @click.prevent="setPokemonUrl">Buscar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiUrl"],
  data() {
    return {
      searchvalue: "",
    };
  },
  methods: {
    setPokemonUrl() {
      if (this.searchvalue !== "")
        this.$emit("setPokemonUrl", this.apiUrl + this.searchvalue);
    },
  },
};
</script>

<style scoped>
.searchbar {
  padding-bottom: 20px;
}
input {
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
}

i {
  font-size: 1.25rem;
  color: #0a2e50;
  cursor: pointer;
}
</style>
