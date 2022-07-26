import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Pokemon({ pokemon, id }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pokemon.name}</title>
        <meta name="title" content={pokemon.name} />
        <meta name="description" content={pokemon.name} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://nextjs-9rssk1--3000.local.webcontainer.io/pokemon/${id}`}
        />
        <meta property="og:title" content={pokemon.name} />
        <meta property="og:description" content={pokemon.name} />
        <meta property="og:image" content={pokemon.sprites.front_default} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://nextjs-9rssk1--3000.local.webcontainer.io/pokemon/${id}`}
        />
        <meta property="twitter:title" content={pokemon.name} />
        <meta property="twitter:description" content={pokemon.name} />
        <meta
          property="twitter:image"
          content={pokemon.sprites.front_default}
        />
      </Head>

      <div>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
        />
        <h3>{pokemon.name}</h3>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  let pokemon = null;
  if (response.status === 200) {
    pokemon = await response.json();
  }

  return {
    props: { pokemon, id },
  };
}
