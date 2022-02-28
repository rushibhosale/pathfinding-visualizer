import { Component } from "react";
import "./Info.css";

export class Info extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="square start-node"></div>
                    <p>start node</p>
                </div>
                <div className="column">
                    <div className="square finish-node"></div>
                    <p>target node</p>
                </div>
                <div className="column">
                    <div className="square visited"></div>
                    <p>visited node</p>
                </div>

                <div className="column">
                    <div className="square current"></div>
                    <p>closet node</p>
                </div>
                <div className="column">
                    <div className="square shortest-path"></div>
                    <p>shortest path</p>
                </div>
                <div className="column">
                    <div className="square wall"></div>
                    <p>wall</p>
                </div>


            </div>
        )
    }
}