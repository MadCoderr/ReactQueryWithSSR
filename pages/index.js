import Image from 'next/image';

export default function Home({ pokemons }) {
  const getImageUrl = (_url) => {
    const id = _url
      .split('/')
      .filter((str) => str !== '')
      .pop();

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return imageUrl;
  };

  return (
    <div>
      {pokemons.map((pokemon, i) => (
        <div key={i}>
          <Image
            src={getImageUrl(pokemon.url)}
            alt={pokemon.name}
            width={150}
            height={150}
          />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps({ res, req }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const response = await fetch('https://pokeapi.co/api/v2/pokemon');

  let pokemons = [];
  if (response.status === 200) {
    const { results } = await response.json();
    pokemons = results;
  }

  return {
    props: { pokemons },
  };
}
