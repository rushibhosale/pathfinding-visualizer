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
                    <p>start node</p>
                    <div className="square start-node"></div>
                </div>
                <div className="column">
                    <p>target node</p>
                    <div className="square finish-node"></div>
                </div>

                <div className="column">
                    <p>normal node</p>
                    <div className="square unvisited"></div>
                </div>
                <div className="column">
                    <p>visited node</p>
                    <div className="square visited"></div>
                </div>
                <div className="column">
                    <p>closet node</p>
                    <div className="square current"></div>
                </div>
                <div className="column">
                    <p>shortest path</p>
                    <div className="square shortest-path"></div>
                </div>
                <div className="column">
                    <p>wall</p>
                    <div className="square wall"></div>
                </div>


            </div>
        )
    }
}