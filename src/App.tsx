import { useState, useEffect, ChangeEvent } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import { getData } from './utils/fetch.utils';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchFeild, setSearchFeild] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);


  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(`https://jsonplaceholder.typicode.com/users`);
      setMonsters(users);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((m) => m.name.toLocaleLowerCase().includes(searchFeild));
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchFeild])

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFeildString = event.target.value.toLocaleLowerCase();
    setSearchFeild(searchFeildString);
  }

  return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox className="monsters-search-box" placeholder="Search Monsters" onChangeHandler={onSearchChange}  />
        <CardList monsters={filteredMonsters} />
      </div>
  );
}

// class App extends Component {

//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchFeild: ''
//     };
//   }

//   componentDidMount() {
//     fetch(`https://jsonplaceholder.typicode.com/users`)
//     .then((res) => res.json())
//     .then((users) => this.setState((state, props) => {
//       return {
//         monsters: users
//       }
//     })
//     );
//   }

//   onSearchChange = (event) => {
//     const searchFeild = event.target.value.toLocaleLowerCase();
//     this.setState((state, props) => {
//       return {
//         searchFeild
//       }
//     });
//   }

//   render() {
//     const filteredMonsters = this.state.monsters.filter((m) => m.name.toLocaleLowerCase().includes(this.state.searchFeild));
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox className="monsters-search-box" placeholder="Search Monsters" onChangeHandler={this.onSearchChange}  />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }

// }

export default App;
