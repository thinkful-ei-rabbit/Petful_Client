import React from 'react';

import './petCard.css';

type PetCard = (props: {
  people?: string[];
  adopt?(type: 'cat' | 'dog'): void;
  type?: 'cat' | 'dog';
  age: number;
  breed: string;
  description: string;
  gender: 'Female' | 'Male';
  imageURL: string;
  name: string;
  story: string;
}) => JSX.Element;

const PetCard: PetCard = ({ people, adopt, type, ...info }) => {
  const handleSubmit = (e: React.FormEvent, type: 'cat' | 'dog') => {
    e.preventDefault();
    adopt && adopt(type);
  };

  return (
    <div className="pet-card">
      <form onSubmit={(e) => type && handleSubmit(e, type)}>
        <p>{info.name}</p>
        <p>
          <span>{info.gender + ' '}</span>
          <span>{info.breed + ', '}</span>
          <span>{info.age} years old</span>
        </p>
        <p>{info.description}</p>
        <img src={info.imageURL} alt={type + 'image'} width="200" />
        <p>{info.story}</p>
        {people && people.length === 1 && (
          <button type="submit">Adopt?</button>
        )}
      </form>
    </div>
  );
};

export default PetCard;
