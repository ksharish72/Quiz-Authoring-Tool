import React, { Component } from 'react';
import styles from './RightPane.css';
import { Row, Col,Grid,Button} from "react-bootstrap";
import TextBox from './TextBox';



class RightPane extends Component {
	componentWillMount(){
  	  	var {selectedQuestion}=this.props;
		this.setState({
				questionDetails: selectedQuestion
		})
	}
	componentWillReceiveProps(nextProps){
			this.setState({
				questionDetails:nextProps.selectedQuestion
			})
	}
  render() {
    return (
<div>
	<h3>Design Question {this.state.questionDetails.questionNumber}</h3>

	
	
	<div id="DIV_14">
		<form id="FORM_15" action="/index.php?r=quiz/answer&amp;language=en" method="post">
			<input type="hidden" name="_csrf" value="M1ZMeVVSN2JVYBtUMmtBV2EkIxdsA1sVVzg9OmYkehBlDwkbGxNuKg==" id="INPUT_16" />
			<input type="hidden" value="M1ZMeVVSN2JVYBtUMmtBV2EkIxdsA1sVVzg9OmYkehBlDwkbGxNuKg==" name="_csrf" id="INPUT_17" />
			<div id="FIELDSET_18">
					<Row clasName="show-grid">
					<Col md={3} style={{marginTop:10}}>
					<h5>Question</h5>
					</Col>
					<Col md={9}>
					<TextBox question={this.state.questionDetails} updateQuestionValue={this.props.updateQuestionValue}/>
					</Col>
					</Row>
					<Row clasName="show-grid" id="image">
					<Col md={9}>
					<img src="https://d134jvmqfdbkyi.cloudfront.net/upload/images/questions/katniss.jpg" alt="" id="IMG_23" />
					</Col>
					<Col md={3}>
  <Button bsStyle="primary">ADD IMAGE</Button>
					</Col>
					</Row>
					<div id="options">
				{this.state.questionDetails.answerChoices.map(answer=>{
			return (<Row className="show-grid">
					<Col md={3} style={{marginTop:10}}>
					<h5>Option {answer.answerNumber}</h5>
					</Col>
					<Col md={9}>
					<TextBox answerChoices={answer} questionNumber={this.state.questionDetails.questionNumber} updateAnswerValue={this.props.updateAnswerValue} />
					</Col>
					</Row>
					);		
				})}
			</div>
			   			<Row clasName="show-grid" id="adddeletebuttons">
					<Col md={4}>
  <Button bsStyle="primary">ADD</Button>
					</Col>
					<Col md={1}>
  <Button bsStyle="primary">DELETE</Button>
					</Col>
					</Row>
			
			</div>
		</form>
	</div>
	
</div>
    );
  }
}

export default RightPane;
