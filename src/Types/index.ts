export interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: 'male' | 'female' | 'n/a' | 'hermaphrodite' | 'none';
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
    id?: string;
    homePlanet?: string;
    filmTitle?: string;
    updatedStarships?: string;
  }
  
  export interface CharacterListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
  }
  