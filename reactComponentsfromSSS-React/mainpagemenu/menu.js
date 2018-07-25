import React, { Component } from 'react';
import teacher from './images/teacher.png';
import student from './images/student.png';
import parent from './images/parent.png';
import admin from './images/admin.png';
import './menu.css';

//  import Search from './search/search.js'

class Menu extends Component {
    getInitialState(){
        return { search:false}
    }
    search(){
        // alert( 'hi');
        return(){ 
            this.setState({search:false});
        }; 
    }

    render() {
      return (
        <div className="App">
            <div className="menu container bg-3 text-center"> 
                <div className="row navi">
                    {/* <a href="http://www.yahoo.com" target="_blank"> */}
                        <div onClick={this.search} className="col-sm-3" id="teachers">
                            <p className="nav">Teachers</p>
                            <img src={teacher} className="teacher" alt="Image"/>
                        </div>
                    {/* </a> */}
                    <a href="http://www.yahoo.com" target="_blank">
                        <div className="col-sm-3 " id="students">
                            <p className="nav">Students</p>
                            <img src={student} className="teacher" alt="Image"/>
                        </div>
                    </a>    
                    <a href="http://www.yahoo.com" target="_blank">
                        <div className="col-sm-3" id="parents"> 
                            <p className="nav">Parents</p>
                            <img src={parent} className="teacher" alt="Image"/>
                        </div>
                    </a> 
                    <a href="http://www.yahoo.com" target="_blank">   
                        <div className="col-sm-3" id="admin"> 
                            <p className="nav">Adminstration</p>
                            <img src={admin} className="teacher" alt="Image"/>
                        </div>
                    </a>    
                </div>
            </div>
        </div>
      );
    }
}

export default Menu;