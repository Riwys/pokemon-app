import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import Generate from './components/generate/generate';
import Pokemon from './components/pokemon/pokemon';

function App() {
  const [ init, setInit ] = useState(false);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonReceived, setPokemonReceived] = useState(false);
  const [user, setUser] = useState({
                              id: '',
                              username: '',
                              emailId: '',
                              password: '',
                              entries: 0,
                              pokemonStore: [],
                              joined: ''
                          })
/*
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);
  */

  useEffect(() => {
    initParticlesEngine(async (engine) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadAll(engine);
        //await loadFull(engine);
        await loadSlim(engine);
        //await loadBasic(engine);
    }).then(() => {
        setInit(true);
    });
  }, []);
                        
  const particlesLoaded = (container) => {
    console.log(container);
    console.log(pokemonData);
  };

  const loadUser = (userData) => {
    console.log(userData);
    setUser({
      id: userData._id,
      username: userData.username,
      emailId: userData.emailId,
      entries: userData.entries,
      joined: userData.joined
  })
  }
  

  
  const onRouteChange = (routeValue) => {
    if (routeValue === 'signout') {
      setIsSignedIn(false)
      setPokemonReceived(false);
    } else if (routeValue === 'home') {
      setIsSignedIn(true)
    }
    setRoute(routeValue);
  }

  const fetchPokemon = () => {
    fetch('https://pokemon-backend-ff60.onrender.com/pokemon')
        .then(response => {
          if (response) {
            fetch('https://pokemon-backend-ff60.onrender.com/entry', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              setUser({
                ...user,
                entries: count
              })
            })
          }
          return response.json()
        })
        .then(pokeData => renderPokemon(pokeData))
        .catch(err => console.log(err))

        function renderPokemon(pokeData) {
            setUser({
              ...user,
              pokemonStore: pokeData
            })
            setPokemonData(pokeData);
            setPokemonReceived(true);
            console.log('pokemon data set')
        }
  }

  const particlesOptions = {
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#121212",
        },
        links: {
            color: "#121212",
            distance: 100,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 4,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value:200,
        },
        opacity: {
            value: 0.8,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
}
  
  return (
    <div className="App">
     { init && <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={particlesOptions}/> }
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/> 
      { route === 'home'
        ? <div>
          <Logo />
          <Generate fetchPokemon={fetchPokemon} name={user.username} entries={user.entries}/>
          <Pokemon pokemonData={pokemonData} pokemonReceived={pokemonReceived}/>
          </div> 
        : ( route === 'signin' ) 
        ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
        : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
    
      }
    </div>
  );
}

export default App;
