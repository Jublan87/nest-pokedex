import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpAdapter: AxiosAdapter,
    private readonly pokemonService: PokemonService
  ) {}

  async executeSeed() {    
    await this.pokemonService.removeAll();

    const data = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800');

    const pokemonsToInsert: CreatePokemonDto[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length - 2];

      pokemonsToInsert.push({ name, nro });
    });

    await this.pokemonService.insertManyPokemons(pokemonsToInsert);

    return 'Seed executed';
  }
}
