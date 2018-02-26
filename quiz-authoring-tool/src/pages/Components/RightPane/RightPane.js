import React, { Component } from 'react';
import styles from './RightPane.css';
import { Row, Col,Grid,Button} from "react-bootstrap";
import TextBox from './TextBox';


let deletedListOptions=[]
class RightPane extends Component {
	constructor(){
		super()
		   this.state={
      deleteModeOptions:false,
      imagePreviewUrl:null
    }
		this.handleAddOption=this.handleAddOption.bind(this)
		this.handleDeleteModeOptions=this.handleDeleteModeOptions.bind(this)
		this.handleCancelDeleteOptions=this.handleCancelDeleteOptions.bind(this)
		this.handleDeleteOptions=this.handleDeleteOptions.bind(this)
		this.readURL=this.readURL.bind(this)
	}
	componentWillMount(){
  	  	var {selectedQuestion}=this.props;
		this.setState({
				questionDetails: selectedQuestion
		})
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.triggerFromDeleteButtonOptions){
			  deletedListOptions=[]
    this.setState({
      deleteModeOptions:false
    })  
		}
			this.setState({
				questionDetails:nextProps.selectedQuestion
			})
	}
	componentDidMount(){
		deletedListOptions=[]
	}
	handleAddOption(){
		var addAnswerOption={
        answerNumber:"",
      answerName:""
    
     }
			this.props.updateAddOption(addAnswerOption,this.state.questionDetails.questionNumber)
	}
	handleDeleteModeOptions(){
		  this.setState({
    deleteModeOptions:true
  })
	}
	 handleDeleteOptions(){
    this.props.triggerDeleteOptions(deletedListOptions,this.state.questionDetails)
  }
	handleCancelDeleteOptions(){
		deletedListOptions=[]
		this.setState({
			deleteModeOptions:false
		})
	}
	 handleCheckBoxClickOptions(event){
      deletedListOptions.push(event.target.value)
      console.log(event.target.value)
    console.log('checkboxcick')
  }
  readURL(e){
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
    	this.state.questionDetails.image=reader.result
      this.setState({
        questionDetails: this.state.questionDetails
      });
    }

    reader.readAsDataURL(file)  
    	this.props.saveImage(this.state.questionDetails)
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

					<img style={{width:'inherit',height:'inherit'}} src={this.state.questionDetails.image} alt="" id="IMG_23" />
					</Col>
					<Col md={3}>
					<div>
  <label for="files" id="addimage" className="btn">ADD IMAGE</label>
  <input id="files" accept="image/*" onChange={this.readURL} style={{visibility:'hidden'}} type="file"/>
</div>
					</Col>
					</Row>
					<div id="options">
				{this.state.questionDetails.answerChoices.map(answer=>{
			return (<Row className="show-grid">
				<Col md={1}>
					{this.state.deleteModeOptions && <label class="checkcontaineroptions">
 
         <input type="checkbox" value={answer.answerNumber} onChange={this.handleCheckBoxClickOptions} id="checkcheckboxoptions"/>
           <span class="checkcheckmarkoptions"></span>
           </label>
  }
				</Col>
					<Col md={2} style={{marginTop:10}}>
				
					<h5>Option {answer.answerNumber}</h5>
					</Col>
					<Col md={8}>
					<TextBox answerChoices={answer} questionNumber={this.state.questionDetails.questionNumber} updateAnswerValue={this.props.updateAnswerValue} />
					</Col>
					</Row>
					);		
				})}
			</div>
			  {this.state.deleteModeOptions ?    <Row clasName="show-grid" style={{    marginTop: 20}}>
          <Col md={4}>
  <Button onClick={this.handleDeleteOptions} bsStyle="danger">DELETE</Button>
          </Col>
          <Col md={1}>
  <Button onClick={this.handleCancelDeleteOptions} bsStyle="primary">CANCEL</Button>
          </Col>
          </Row>:
			   			<Row clasName="show-grid" id="adddeletebuttons">
					<Col md={4}>
  <Button bsStyle="primary" onClick={this.handleAddOption}>ADD</Button>
					</Col>
					<Col md={1}>
  <Button bsStyle="primary" onClick={this.handleDeleteModeOptions}>DELETE</Button>
					</Col>
					</Row>
			}
			</div>
		</form>
	</div>
	
</div>
    );
  }
}

export default RightPane;
