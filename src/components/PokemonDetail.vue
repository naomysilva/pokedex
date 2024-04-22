<template>
  <div class="detail">
    <div class="detail-view-wrapper" v-if="show">
      <div class="detail-view" >
        <div v-if="pokemon" class="image">
          <img :src="imageUrl + pokemon.id + '.png'" alt="" />
        </div>
        <div v-if="pokemon" class="data">
          <h2>{{ pokemon.name }}</h2>
          <div class="property">
            <div class="left">Base Experience</div>
            <div class="right">{{ pokemon.base_experience }} XP</div>
          </div>
          <div class="property">
            <div class="left">Height</div>
            <div class="right">{{ pokemon.height / 10 }} m</div>
          </div>
          <div class="property">
            <div class="left">Weight</div>
            <div class="right">{{ pokemon.weight / 10 }} kg</div>
          </div>

          <h3>Pokemon game_indices</h3>
          <div class="types">
            <div
              class="type"
              v-for="(value, index) in pokemon.game_indices"
              :key="'value' + index"
            >
              {{ value.game_index }}
              {{ value.version.name }}
            </div>
          </div>
          <h3>Pokemon Moves</h3>
          <div class="moves">
            <div
              class="move"
              v-for="(value, index) in pokemon.stats"
              :key="'stats' + index"
            >
              {{ value.stat.name }} = {{ value.base_stat }}
            </div>
          </div>

          <h3>Abilities</h3>
          <div class="abilities">
            <div
              class="ability"
              v-for="(value, index) in pokemon.abilities"
              :key="'value' + index"
            >
              {{ value.ability.name }}
            </div>
          </div>

          <h3>
            moves do Pokémon
            <div class="sprites row">
              <div
                class="sprite col-md-3"
                v-for="(value, key) in pokemon.sprites"
                :key="key"
              >
                <img
                  v-if="typeof value !== 'object' && value !== null"
                  :src="value"
                  :alt="key"
                />
              </div>
            </div>
          </h3>
          <h3>Moves</h3>
          <div class="moves">
            <div class="move" v-for="(move, index) in pokemon.moves" :key="index">
              <div v-if="move.move && move.move.name">
                {{ move.move.name }}
              </div>
            </div>
          </div>

          <h3>Other</h3>
          <div class="sprites row">
            <div
              class="sprite col-md-2"
              v-for="(value, key) in pokemon.sprites.other"
              :key="key"
            >
              <img
                v-if="value !== null"
                :src="value.front_default"
                :alt="key"
                height="75px"
              />
            </div>
          </div>
          <h3>Gerações</h3>

          <div class="sprites row">
            <div
              v-for="(generation, generationName) in pokemon.sprites.versions"
              :key="generationName"
            >
              <h2>{{ generationName }}</h2>
              <div
                v-for="(version, versionName) in generation"
                :key="versionName"
                class="row"
              >
                <div v-for="(value, key) in version" :key="key" class="col-md-3">
                  <img
                    v-if="typeof value === 'string'"
                    :src="value"
                    :alt="key"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 v-else>The pokemon was not found</h2>
        <button class="close" @click="closeDetail">close</button>
      </div>
    </div>
    <i v-else class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  props: ["pokemonUrl", "imageUrl"],
  data() {
    return {
      show: false,
      pokemon: {},
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemon = data;
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  overflow-y: hidden;
}

.detail-view-wrapper {
  max-height: calc(100vh - 100px);
  overflow-y: auto; 
}

.detail-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 510px;
  padding: 50px 0 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  margin-top: 6em;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -60px;
  width: 120px;
  height: 120px;
  background-color: #333;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  text-transform: capitalize;
}

.data {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
}

.property {
  width: 90%;
  max-width: 400px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.left {
  float: left;
}
.right {
  float: right;
}

h3 {
  width: 90%;
  max-width: 400px;
  border-bottom: 1px solid #ccc;
}

.types,
.abilities, .moves {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 90%;
  max-width: 400px;
}
.type,
.ability,.move {
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: capitalize;
  word-wrap: none;
  word-break: keep-all;
}

.type, .move {
  background-color: #0a2e50;
}
.ability {
  background-color: #c73015;
}

.close {
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #efefef;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  cursor: pointer;
}

i {
  font-size: 2rem;
  color: #efefef;
}
</style>
