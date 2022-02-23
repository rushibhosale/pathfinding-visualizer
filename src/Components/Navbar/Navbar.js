import { Component } from "react";
import { GraphAlgorithms } from "./Data";
import "./Navbar.css";
export class Navbar extends Component {
    constructor() {
        super();
    }
    render() {
        return (

            <nav className="navbar">
                <h1 className="title">pathfinding visualizer</h1>
                <ul className="nav-links">
                    <li className="dropdown">
                        <a href="#">Algorithm's<i className="fa-solid fa-caret-down"></i></a>
                        <ul className="dropdown-content">
                            {
                                GraphAlgorithms.map((item, index) => {
                                    return <li key={index}><a href="javascript:void(0);" >{item.title}</a></li>;
                                })
                            }
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#">Maze Algorithm's<i className="fa-solid fa-caret-down"></i></a>
                    </li>
                    <li className="item">
                        <a href="#">visualize Algorithm</a>
                    </li>
                    <li className="item">
                        <a href="#">Clear Board</a>
                    </li>

                    <li className="dropdown">
                        <a href="#">speed<i className="fa-solid fa-caret-down"></i></a>
                    </li>
                </ul>
            </nav>
        );
    }
}