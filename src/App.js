import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import './App.css'
import { Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core';
import { call, signout } from './service/ApiService';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: [],
			loading: true
		}
	}
	componentDidMount() {
		call("/todo", "GET", null).then((response) =>
			this.setState({ items: response.data, loading: false })
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
		);

		var nevigatinoBar = (
			<AppBar position="static">
				<Toolbar>
					<Grid justifyContent="space-between" container>
						<Typography variant="h6">오늘의 할일</Typography>
					</Grid>
					<Grid>
						<Button color="inherit" onClick={signout}>
							로그아웃
						</Button>
					</Grid>
				</Toolbar>
			</AppBar>
		);

		var todoListPage = (
            <div>
				{nevigatinoBar}
				<Container maxWidth="md">
					<AddTodo add={this.add} />
					<div className="TodoList"> {todoItems} </div>
				</Container>
            </div>
		);

		var loadingPage = <h1>로딩중...</h1>

		var content = this.state.loading ? loadingPage : todoListPage;
		
        return (
            <div className="App">
				{content}
            </div>
        );
    }
}
export default App;