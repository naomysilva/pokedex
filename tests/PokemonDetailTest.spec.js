import { shallowMount } from '@vue/test-utils';
import PokemonDetail from '@/components/PokemonDetail.vue';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('PokemonDetail.vue', () => {
  it('emits setPokemonUrl event with pokemonUrl', () => {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/1';

    const wrapper = shallowMount(PokemonDetail, {
      propsData: {
        pokemonUrl: pokemonUrl
      }
    });

    wrapper.vm.$emit('setPokemonUrl', pokemonUrl);

    expect(wrapper.emitted().setPokemonUrl).toBeTruthy();
    expect(wrapper.emitted().setPokemonUrl[0]).toEqual([pokemonUrl]);
  });
});
