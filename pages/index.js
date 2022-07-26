import Image from 'next/image';
import Link from 'next/link';

export default function Home({ pokemons }) {
  const getImageUrl = (_id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_id}.png`;
  };

  const getId = (_url) => {
    const id = _url
      .split('/')
      .filter((str) => str !== '')
      .pop();

    return id;
  };

  return (
    <div className="grid">
      {pokemons.map((pokemon) => {
        const id = getId(pokemon.url);

        return (
          <Link key={id} href={`/pokemon/${id}`}>
            <a className="card">
              <Image
                src={getImageUrl(id)}
                alt={pokemon.name}
                width={150}
                height={150}
              />
              <p>{pokemon.name}</p>
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export async function getServerSideProps({ res, req }) {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // );

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
