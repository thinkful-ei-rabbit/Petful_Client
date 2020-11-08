import React from 'react';
import { Link } from 'react-router-dom';

type SplashProps = () => JSX.Element;

const Splash: SplashProps = () => {
  return (
    <>
      <header>
        <h2>Welcome to Petful!</h2>
      </header>
      <article>
        <p>
          Here at petful, we have a bunch of pets ready to be adopted!
          How does it work? Simply join the queue of other adopters,
          wait until it&apos;s your turn, and choose between the next
          available cat or dog ready for adoption!
        </p>
      </article>
      <Link to="/pets">
        <button>Check out our pets!</button>
      </Link>
    </>
  );
};

export default Splash;
