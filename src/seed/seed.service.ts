import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
      'http://pokeapi.co/api/v2/pokemon?limit=100',
    );

    // const insertPromisesArray = [];
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // await this.pokemonModel.create({ name, no });
      // insertPromisesArray.push(this.pokemonModel.create({ name, no }));
      pokemonToInsert.push({ name, no });
    });

    // await Promise.all(insertPromisesArray);
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'seed executed';
  }
}
