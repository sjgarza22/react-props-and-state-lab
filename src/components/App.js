import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    const newType = e.target.value
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  onFindPetsClick = () => {
    let url = '';
    switch(this.state.filters.type) {
      case 'cat' :
        url = '/api/pets?type=cat';
        break;
      case 'dog' :
        url = '/api/pets?type=dog';
        break;
      case 'micropig' :
        url = '/api/pets?type=micropig'
        break;
      default :
        url = '/api/pets'
    }

    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ pets: data}))
  }

  onAdoptPet = (id) => {
    // const index = this.state.pets.findIndex(pet => pet.id === id)
    this.setState(prevState => ({
      pets: prevState.pets.map(pet => (pet.id === id) ? Object.assign(pet, { isAdopted: true}) : pet)
    }))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
