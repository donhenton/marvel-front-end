import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';



export default class SourceCodePage extends Component {
    constructor() {
        super();

    }

    render() {
        var me = this;

        return ( <div className = 'source-code-page'>
            <h2>Source Code For this Project</h2>  
            <p>&nbsp;</p>  
            <blockquote>
            <h3>Front End Code</h3>  
            <p> Located at <a target = "_blank"  href = "https://github.com/donhenton/marvel-front-end"> Marvel Server Front End Github Project </a></p>
            <h3> AWS Lambda Backend Code </h3>  
            <p> Located in the marvel folder of <a target = "_blank" href = "https://github.com/donhenton/sam_local_sandbox">AWS SAM Github Project</a></p>
            </blockquote> 
            </div>
        );
    }
}