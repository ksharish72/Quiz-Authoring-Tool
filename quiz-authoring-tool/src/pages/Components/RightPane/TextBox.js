import React, { Component } from 'react';
import styles from './TextBox.css';
import TextField from 'material-ui/TextField';


class TextBox extends Component {
	constructor(props){
		super()
		this.state={
			textboxvalue:null
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleSave=this.handleSave.bind(this)
	}
	handleChange(event){
			console.log(this)
			this.setState({
				textboxvalue:event.target.value
			})
	}
	handleSave(event){
		console.log(this)
		var {question,answerChoices,questionNumber}=this.props;
		if(question==undefined)
		this.props.updateAnswerValue(questionNumber,answerChoices.answerNumber,this.state.textboxvalue)
	else
		this.props.updateQuestionValue(question.questionNumber,this.state.textboxvalue)

	}
	componentWillReceiveProps(nextProps){
					var {question,answerChoices} = nextProps;
			this.setState({
				textboxvalue:question!=undefined && question.questionName||answerChoices!=undefined && answerChoices.answerName
			})
	}
	componentDidMount(){
			var {question,answerChoices} = this.props;
			this.setState({
				textboxvalue:question!=undefined && question.questionName||answerChoices!=undefined && answerChoices.answerName
			})
	}
	render(){
		var textboxvalue=this.state.textboxvalue
				var {question,answerChoices}=this.props;
		return(
  <input type="text"
      hintText="Question Text"
      	id={question!=undefined && "questiontextBox"||answerChoices!=undefined && "answertextBox"}
       value={textboxvalue}
       onChange={this.handleChange}
       onBlur={this.handleSave.bind(this)}
    />

			)
	}
}
export default TextBox;