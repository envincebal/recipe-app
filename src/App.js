import React, { Component } from 'react';
import NoteEntry from "./components/NoteEntry";
import NoteForm from "./components/NoteForm";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			title: "",
			details: "",
			error: false
		}
	}

	updateTitle = (event) => {
		this.setState({ title: event.target.value });
	}

	updateDetails = (event) => {
		this.setState({ details: event.target.value });
	}

	submitHandler = (e) => {
		const {title, details} = this.state;
		e.preventDefault();
		if (!title.length || !details.length) {
			this.setState({
				error: true
			});
			return;
		}

		const newNote = {
			newTitle: title,
			newDetails: details
		}
		this.setState(prevState => ({
			notes: prevState.notes.concat(newNote),
			title: "",
			details: "",
			error: false
		}))
	}

	deleteHandler = (id) => {
		this.setState(prevState => ({
			notes: prevState.notes.filter((el) => el !== id)
		}))
	}

	render() {
		const {title, details, error, notes} = this.state;
		return (
			<div className="container">
				<h1 className="title">React Notes App</h1>
				{error && <p className="error-message">Please fill in both title and details</p>}
				<NoteForm
					titleValue={title}
					detailsValue={details}
					titleHandle={this.updateTitle}
					detailsHandle={this.updateDetails}
					onSubmit={this.submitHandler}
				/>

				<div className="entry-section">
					{notes.map((note, i) => (
						<NoteEntry
							key={note.newTitle}
							title={note.newTitle}
							details={note.newDetails}
							deleteNote={this.deleteHandler.bind(this, note)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default App;