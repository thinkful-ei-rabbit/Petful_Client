import config from '../config';

const { API_ENDPOINT } = config;
import { PetTypes, PetInfo } from '../../src/app/app';

type PnP = () => Promise<{
  peopleData: string[];
  petsData: PetTypes;
}>;

type PorP = (
  endpoint: 'people' | 'pets',
) => Promise<string[] | PetTypes>;

type Reset = (endpoint: 'people' | 'pets') => Promise<void>;

type AddP = (person: string) => Promise<void>;

type DelNext = (type: 'cat' | 'dog') => Promise<PetInfo>;

const getPeopleAndPets: PnP = async () => {
  const endpoints = ['people', 'pets'];
  const [peopleData, petsData] = await Promise.all(
    endpoints.map(async (ep) =>
      fetch(API_ENDPOINT + ep).then((raw) => {
        if (!raw.ok) {
          console.log(raw.status);
        } else return raw.json();
      }),
    ),
  );

  return { peopleData, petsData };
};

const getPeopleOrPets: PorP = async (endpoint) => {
  const data = await fetch(API_ENDPOINT + endpoint).then((raw) => {
    if (!raw.ok) {
      console.log(raw.status);
    } else return raw.json();
  });

  return data;
};

const reset: Reset = async (endpoint) => {
  const reset = 'reset/' + endpoint;
  await fetch(API_ENDPOINT + reset);
};

const addPerson: AddP = async (person) => {
  await fetch(API_ENDPOINT + 'people', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ person }),
  });
};

const deleteNext: DelNext = async (type) => {
  const endpoints = ['people', 'pets'];
  const [, pet] = await Promise.all(
    endpoints.map((ep) =>
      fetch(API_ENDPOINT + ep, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      }),
    ),
  );

  const parse = await pet.json();

  return await parse.pet;
};

export default {
  getPeopleAndPets,
  getPeopleOrPets,
  reset,
  addPerson,
  deleteNext,
};
