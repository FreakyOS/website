import React, {Component} from 'react';
import axios from 'axios';
import {Card, CardBody, ModalBody, ModalFooter, ModalHeader, CardText, Button, Modal, CardImg, CardFooter} from 'reactstrap';


export default class Device extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            details: {},
            changelog: `https://raw.githubusercontent.com/FreakyOS/ota_config/still_alive/${this.props.device.codename}/${this.props.device.codename}.txt`,
            isOpen : false,
        }

        this.toggle = this.toggle.bind(this);
        this.datetime = this.datetime.bind(this);
    }

    toggle() {
        this.setState(state => ({
          isOpen: !state.isOpen
        }));
      }
      
    datetime(){
        let unix_timestamp = this.state.details.datetime
        var date = new Date(unix_timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedDate = day + '/' + month + '/' + year
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedDate
    }

    componentDidMount(){
        axios.get(`/${this.props.device.codename}/${this.props.device.codename}.json`).then(
            (response) => {
                this.setState({
                  details: response.data.response[0]
                });
            }
        )
    }
    render(){
        return(
                <Card className="box"  style={{ width:'15rem' , cursor: 'pointer'}} onClick={this.toggle}>
                    <CardBody>
                        <CardImg top width="100%" src={this.props.device.image} alt="Device Image" />
                    </CardBody>
                    <CardFooter><center>{this.props.device.name}</center></CardFooter>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader>
                        {this.props.device.name}
                    </ModalHeader>
                    <ModalBody>
                        <CardText>
                            Brand      : {this.props.device.brand}<br></br>
                            Codename   : {this.props.device.codename}<br></br>
                            Maintainer : {this.props.device.maintainer}<br></br>
                            RomVersion : {this.state.details.version}<br></br>
                            FileName   : {this.state.details.filename}<br></br>
                            RomSize    : {Math.trunc(this.state.details.size/1048576)} MB<br></br>
                            Builddate  : {this.datetime()}<br></br>
                        </CardText>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            href={this.state.details.url}
                            target="_blank"
                            color="primary"
                            rel="noopener noreferrer"
                        >
                            Download
                        </Button>
                        <Button
                            href={this.state.changelog}
                            target="_blank"
                            color="info"
                            rel="noopener noreferrer"
                        >
                            Changelog
                        </Button>
                        <Button
                          onClick={this.toggle}
                          color="danger"  
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                </Card>
        );
    }
}


