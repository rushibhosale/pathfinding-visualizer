import { Component } from "react";
import { GraphAlgorithms, MazeAlgorithms, speed } from "./Data";
import { Dropdown } from "./Dropdown";
import "./Navbar.css";
export class Navbar extends Component {
    constructor({ data }) {
        super();
        this.mainHandler = data.handler;
        this.state = {
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
            speed: "normal",
            currAlgorithm: "Visualize Algorithm"
        };
        this.handleWindowClickEvent = this.handleWindowClikcEvent.bind(this);

    }
    componentDidMount() {
        window.addEventListener('click', this.handleWindowClickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClickEvent);
    }

    handler(e, value) {
        e.preventDefault();
        // console.log(value)
        let isPresent = GraphAlgorithms.find(element => {
            return element.title === value;
        });
        if (isPresent !== undefined) {
            this.setState({ currAlgorithm: `Visualize ${isPresent.value}` });
            return;
        }
        isPresent = MazeAlgorithms.find(element => {
            return element.title === value;
        });
        if (isPresent) {
            this.mainHandler(isPresent.value, "maze", this.state.speed);
            return;
        }
        isPresent = speed.find(element => {
            return element.title === value;
        });
        if (isPresent) {
            this.setState({ speed: value.toLowerCase() });
            return;
        }
        if (value === "clearBoard") {
            this.mainHandler(value, "clearBoard", this.state.speed);
        }
        if (value === "clearPaths") {
            this.mainHandler(value, "clearPaths", this.state.speed);
        }
    }
    visualizeAlgoritm(e) {
        e.preventDefault();
        const { currAlgorithm } = this.state;
        if (currAlgorithm.indexOf("Visualize Algorithm") === 0 ||
            currAlgorithm.indexOf("Select an algorithm") === 0) {
            this.setState({ currAlgorithm: `Select an algorithm` });
            return;
        }
        this.mainHandler(currAlgorithm.slice(10), "graph", this.state.speed);
    }
    render() {
        return (
            <nav className="navbar">
                <h1 className="title">pathfinding visualizer</h1>
                <ul className="nav-links">
                    <li className={this.state.dropdown1 ? 'dropdown active' : 'dropdown'}>
                        <a href="#" className="algorithm-dropbtn"
                            onClick={e => { this.handleDropDown(e) }}>Algorithm's<i className="fa-solid fa-caret-down"></i></a>
                        {/* dropdown */}
                        <Dropdown
                            data={{
                                list: GraphAlgorithms,
                                toggleDropdown: this.state.dropdown1,
                                extacssClass: '',
                                handler: this.handler.bind(this)
                            }
                            } />
                    </li>
                    <li className={this.state.dropdown2 ? 'dropdown active' : 'dropdown'}>
                        <a href="#" className="maze-dropbtn"
                            onClick={e => { this.handleDropDown(e) }}>Maze Algorithm's<i className="fa-solid fa-caret-down"></i></a>
                        {/* dropdown */}
                        <Dropdown
                            data={{
                                list: MazeAlgorithms,
                                toggleDropdown: this.state.dropdown2,
                                extacssClass: '',
                                handler: this.handler.bind(this)
                            }
                            } />
                    </li>
                    <li id="visualizebtn"><a href="#" onClick={e => this.visualizeAlgoritm(e)}>{this.state.currAlgorithm}</a></li>
                    {/* <li><a href="#" onClick={e => this.handler(e, "clearBoard")}>Clear Board</a></li> */}
                    <li><a href="#" onClick={e => this.handler(e, "clearPaths")}>Clear Paths & walls</a></li>
                    <li className="dropdown">
                        <a href="" className="speed-dropbtn"
                            onClick={e => { this.handleDropDown(e) }}>speed : {this.state.speed}<i className="fa-solid fa-caret-down"></i></a>
                        <Dropdown
                            data={{
                                list: speed,
                                toggleDropdown: this.state.dropdown3,
                                extacssClass: 'horizontal',
                                handler: this.handler.bind(this)
                            }
                            } />
                    </li>
                </ul>
            </nav >
        );
    }

    //toggle dropdown
    handleDropDown(e) {
        e.preventDefault();
        if (e.target.matches('.algorithm-dropbtn'))
            this.setState({ dropdown1: !this.state.dropdown1 })
        if (e.target.matches('.maze-dropbtn'))
            this.setState({ dropdown2: !this.state.dropdown2 })
        if (e.target.matches('.speed-dropbtn'))
            this.setState({ dropdown3: !this.state.dropdown3 })
    }
    //window event to close Dropedown
    handleWindowClikcEvent(e) {
        if (!e.target.matches('.algorithm-dropbtn'))
            this.setState({ dropdown1: false })
        if (!e.target.matches('.maze-dropbtn'))
            this.setState({ dropdown2: false })
        if (!e.target.matches('.speed-dropbtn'))
            this.setState({ dropdown3: false })

    }
}