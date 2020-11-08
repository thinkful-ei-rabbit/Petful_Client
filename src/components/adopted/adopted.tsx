import React from 'react';

import { PetInfo } from 'src/app/app';
import { PetCard } from '../../../src/components';

type Adopted = (props: {
  owner: string | null;
  pet: PetInfo | null;
}) => JSX.Element;

const Adopted: Adopted = ({ owner, pet }) => {
  return (
    <>
      <div>{pet && <PetCard {...pet} />}</div>
      <p>New Owner: {owner}!</p>
      <br />
      <p>(to start over, press one of the reset buttons up top!)</p>
    </>
  );
};

export default Adopted;
