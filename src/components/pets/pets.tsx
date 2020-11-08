import React, { useState } from 'react';

import './pets.css';

import { PetTypes } from '../../../src/app/app';
import { PetCard } from '../../../src/components';

type PetsProps = (props: {
  addPerson(person: string): void;
  adopt(type: 'cat' | 'dog'): void;
  pets: PetTypes;
  people: string[];
}) => JSX.Element;

const Pets: PetsProps = ({ addPerson, adopt, pets, people }) => {
  const [name, setName] = useState<string>('');

  const renderCards = () => {
    const cards = [];

    for (const [type, info] of Object.entries(pets)) {
      if ((type === 'cat' || type === 'dog') && info)
        cards.push(
          <PetCard
            key={type}
            people={people}
            adopt={adopt}
            type={type}
            {...info}
          />,
        );
    }

    return cards;
  };

  const getInLine = () => {
    name && addPerson(name);
  };

  return (
    <>
      {people && people.length === 3 && people[0] === 'Randy Lahey' && (
        <div className="get-in-line">
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => getInLine()}>Get in line!</button>
        </div>
      )}
      <br />
      <div>{renderCards()}</div>
    </>
  );
};

export default Pets;
