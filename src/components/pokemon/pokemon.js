function Pokemon({pokemonData, pokemonReceived}) {
    if (pokemonReceived) {
        return (
            <div className="w-40 shadow-2 center ph1 pv2 mv4 bg-red">
             <h2>{pokemonData.data.name}</h2>
             <h3>{`experience: ${pokemonData.data.base_experience}`}</h3>
             <img 
             src={pokemonData.data.sprites.front_default} 
             alt='Pokemon' 
             />  
           </div>
        );
    } else {
        return (
            <></>
        );
    }
   
}

export default Pokemon;