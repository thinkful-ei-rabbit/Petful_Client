import React from 'react';

import './people.css';

type PeopleProps = (props: { people: string[] }) => JSX.Element;

const People: PeopleProps = ({ people }) => {
  const peopleCards = !people
    ? null
    : people.map((person, idx) => (
        <div key={person} className="person-card">
          {idx + 1}: {person}
        </div>
      ));

  return (
    <>
      <h3>Line:</h3>
      {peopleCards || 'Line is empty!'}
    </>
  );
};

export default People;
