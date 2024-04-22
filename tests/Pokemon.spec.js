import { shallowMount } from '@vue/test-utils';
import Pokemon from '@/components/Pokemon.vue';
import PokemonSearch from '@/components/PokemonSearch.vue';
import PokemonDetail from '@/components/PokemonDetail.vue';

describe('Pokemon.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Pokemon);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets Pokemon URL when PokemonSearch emits setPokemonUrl event', () => {
    const wrapper = shallowMount(Pokemon);
    const searchComponent = wrapper.findComponent(PokemonSearch);
    searchComponent.vm.$emit('setPokemonUrl', 'https://pokeapi.co/api/v2/pokemon/1');
    expect(wrapper.vm.pokemonUrl).toBe('https://pokeapi.co/api/v2/pokemon/1');
    expect(wrapper.vm.showDetail).toBe(true);
  });
});
