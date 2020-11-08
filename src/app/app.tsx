import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import './app.css';

import { Header, People, Splash, Pets, Adopted } from '../components';
import service from '../services/fetch.service';

type AppProps = () => JSX.Element;

export type PetInfo = {
  age: number;
  breed: string;
  description: string;
  gender: 'Female' | 'Male';
  imageURL: string;
  name: string;
  story: string;
};

export type PetTypes = {
  cat: PetInfo | null;
  dog: PetInfo | null;
};

type AdoptedPair = {
  owner: string | null;
  pet: PetInfo | null;
};

const App: AppProps = () => {
  const [people, setPeople] = useState<string[]>([]);
  const [pets, setPets] = useState<PetTypes>({
    cat: null,
    dog: null,
  });
  const [adopted, setAdopted] = useState<AdoptedPair>({
    owner: null,
    pet: null,
  });
  const history = useHistory();

  useEffect(() => {
    const callFetcher = async () => {
      await service.reset('people');
      await service.reset('pets');

      const data = await service.getPeopleAndPets();
      if (data === undefined) return;

      const { peopleData, petsData } = data;
      setPeople(peopleData);
      setPets(petsData);
      setAdopted({
        owner: null,
        pet: null,
      });
    };

    if (history) {
      history.push('/');
      callFetcher();
    }
  }, [history]);

  useEffect(() => {
    const startServices = async () => {
      const type = Math.random() > 0.5 ? 'cat' : 'dog';

      await service.deleteNext(type);
      const data = await service.getPeopleAndPets();
      if (data === undefined) return;

      const { peopleData, petsData } = data;

      setTimeout(() => {
        setPeople(peopleData);
        setPets(petsData);
      }, 1e3);
    };

    if (adopted.owner && people && people.length > 1) {
      startServices();
    }
  }, [adopted, people]);

  const handleStart = async (person: string) => {
    await service.addPerson(person);

    setPeople([...people, person]);
    setAdopted({ owner: person, pet: null });
  };

  const handleAdopt = async (type: 'cat' | 'dog') => {
    const adoptedPet = await service.deleteNext(type);

    const data = await service.getPeopleAndPets();
    if (data === undefined) return null;

    const { peopleData, petsData } = data;
    setPeople(peopleData);
    setPets(petsData);
    setAdopted({ ...adopted, pet: adoptedPet });

    history.push('/adopted');
  };

  const handleReset = async (type: 'people' | 'pets') => {
    if (
      !people ||
      people.length === 3 ||
      adopted.pet ||
      type === 'people'
    ) {
      setAdopted({
        owner: null,
        pet: null,
      });

      await service.reset(type);

      const data = await service.getPeopleOrPets(type);

      if (Array.isArray(data)) {
        setPeople(data);
      } else setPets(data);
    }
  };

  return (
    <>
      <div className="top-nav">
        <Link to="/">
          <button
            className="reset-button"
            onClick={() => handleReset('people')}
          >
            Reset People
          </button>
          <button
            className="reset-button"
            onClick={() => handleReset('pets')}
          >
            Reset Pets
          </button>
        </Link>
      </div>

      <Header />

      <div className="main">
        <div className="people-sidebar">
          <People people={people} />
        </div>
        <div className="route-container">
          <Switch>
            <Route exact path="/">
              <Splash />
            </Route>
            <Route exact path="/pets">
              <Pets
                addPerson={handleStart}
                adopt={handleAdopt}
                pets={pets}
                people={people}
              />
            </Route>
            <Route exact path="/adopted">
              <Adopted {...adopted} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
