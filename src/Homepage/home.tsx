import React, { Component, useEffect } from "react";
import { Container, Segment, Tab } from "semantic-ui-react";

import { LogoNoBG, TeavanaTitleSVG } from "../Images/index";

import './home.css';

class Wobble extends Component {

    componentDidMount = () => {
        let ele: any = document.querySelectorAll(".wobble");
        setInterval(() => {
            let tl, tr, br, bl;
            let max = 200,
                min = 350;

            tl = Math.floor(Math.random() * (max - min) + min);
            tr = Math.floor(Math.random() * (max - min) + min);
            br = Math.floor(Math.random() * (max - min) + min);
            bl = Math.floor(Math.random() * (max - min) + min);

            let borderRadius = `${tl}px ${tr}px ${br}px ${bl}px `;
            ele[0].style.borderRadius = borderRadius;
            // this.ele[1].style.borderRadius = borderRadius;
        }, 3750);
    };

    render() {
        return (
            <div className="wobbleContainer">
                
                <div className="wobble" />
                <img src={LogoNoBG} className='wobbleImage' alt="Teavana's Logo" />
            </div>
        )
    }
}

class TeavanaTitle extends Component<any> {
    private titleRef: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);

        this.titleRef = React.createRef<HTMLDivElement>();

        this.setTextAnimation = this.setTextAnimation.bind(this);
    }

    /* ripped  */
    setTextAnimation(delay: any, duration: any, strokeWidth: any, timingFunction: any, strokeColor: any, repeat: any) {
        let paths = this.titleRef.current!.querySelectorAll("path");
        let mode = repeat ? 'infinite' : 'forwards';
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const length = path.getTotalLength();

            path.style.strokeDashoffset = `${length}px`;
            path.style.strokeDasharray = `${length}px`;
            path.style.strokeWidth = `${strokeWidth}px`;
            path.style.stroke = `${strokeColor}`;
            //path.style.animation = `${duration}s svg-text-anim ${mode} ${timingFunction}`;
            path.style.animationName = 'svg-text-anim';
            path.style.animationDuration = `${duration}s`; 
            path.style.animationTimingFunction = `${timingFunction}`; 
            path.style.animationDelay = `${i * delay}s`;
            path.style.animationDirection = 'normal';
            path.style.animationIterationCount = `${mode}`;
            path.style.animationFillMode = `forwards`;
            path.style.animationPlayState = 'running'; 
            
        }
    }

    componentDidMount = () => this.setTextAnimation(0.5, 5.5, 1, 'ease-in', '#1b1c1d', false);

    render() {

        return (
            <div className='teavanaTitle' ref={this.titleRef}  >
                {TeavanaTitleSVG}
            </div>
        )
    }
}

class Home extends Component<{ projects: any[] }, { activeIndex: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            activeIndex: 'armour-app'
        }
    }

    getProjectPanes() {
        let projects: any[] = [];
        this.props.projects.forEach(project => (
            projects.push({
                menuItem: { key: project.key, content: project.name },
                render: () => <Tab.Pane attached style={{ backgroundColor: 'rgb(254, 98, 98)' }} >{project.preview}</Tab.Pane>
            })
        ));

        return (projects)
    }

    handleTabChange(e: any, d: any) {
        console.log(d);
        this.setState({ activeIndex: d.panes[d.activeIndex].menuItem.key });
    }

    static headerPopup = 'Currently each project is within the single repository, this will be changed at a later date and repo links will be provided';

    render() {
        return (
            <Container>
                <Wobble />
                <br />
                <br />
                <br />
                <TeavanaTitle />
            </Container>
        );
    }
}

export default Home;