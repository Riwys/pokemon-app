function Generate({fetchPokemon, name, entries}) {
    return (
        <div>
        <h3>{ `Hey ${name}, you have generated ${entries} ${entries === 1 ? 'pokemon' : 'pokemons' }` }</h3>
        <h2>Generate a random pokemon</h2>
        <button 
        onClick = {fetchPokemon}
        className='w-30 grow f4 link ph3 pv2 dib white bg-black'>
        Generate
        </button>
       </div>
    );
}

export default Generate;