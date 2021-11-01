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
		const requestOptions = {
			method: "GET",
			headers: { "Content-Type": "application/json"}
		};
		fetch("http://localhost:8080/todo", requestOptions)
			.then(response => response.json())
			.then(
				(response) => {
					this.setState({
						items: response.data
					});
				},
				(error) => {
					this.setState({
						error
					});
				}
			);
	}
	add = (item) => {
		const thisItems = this.state.items;
		item.id = "ID-" + thisItems.length;
		item.done = false;
		thisItems.push(item);
		this.setState({items: thisItems});
		console.log("items : ", this.state.items);
	}
	delete = (item) => {
		const thisItems = this.state.items;
		console.log("before update item : ", this.state.items);
		const newItems = thisItems.filter(e => e.id !== item.id);
		this.setState({items: newItems}, () => {
			console.log("update item : ", this.state.items);
		});
	}
    render() {
		var todoItems = this.state.items.length && (
			<Paper style={{ margin:16}}>
				<List>
					{this.state.items.map((item, index) => (
						<Todo item={item} key={item.id} delete={this.delete} />
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