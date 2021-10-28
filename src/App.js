// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import Todo from './Todo';
import './App.css'

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: [
				{ id: 0, title: 'Hello World 1', done: true},
				{ id: 1, title: 'Hello World 2', done: false},
			]
		}
	}
    render() {
		var todos = this.state.items.map((item, index) => (
			<Todo item={item} key={item.id} />
		));
        return (
            <div className="App">
				{todos}
            </div>
        );
    }
}

export default App;