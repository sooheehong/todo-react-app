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
import AddTodo from './AddTodo';
import './App.css'
import { Paper, List, Container } from '@material-ui/core';
import { call } from './service/ApiService';

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
	componentDidMount() {
		call("/todo", "GET", null).then((response) =>
			this.setState({ items: response.data })
		);
	}
	add = (item) => {
		call("/todo", "POST", item).then((response) =>
			this.setState({ items: response.data })
		);
	}
	delete = (item) => {
		call("/todo", "DELETE", item).then((response) =>
			this.setState({ items: response.data })
		);
	}
	update = (item) => {
		call("/todo", "PUT", item).then((response) =>
			this.setState({ items: response.data })
		);
	}
    render() {
		var todoItems = this.state.items.length && (
			<Paper style={{ margin:16}}>
				<List>
					{this.state.items.map((item, index) => (
						<Todo item={item} key={item.id} delete={this.delete} update={this.update} />
					))}
				</List>
			</Paper>
		)
		
        return (
            <div className="App">
				<Container maxWidth="md">
					<AddTodo add={this.add} />
					<div className="TodoList"> {todoItems} </div>
				</Container>
            </div>
        );
    }
}
export default App;