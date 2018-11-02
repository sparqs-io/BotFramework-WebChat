import * as React from 'react';

type TimeStuff = (timestamp:number) => [string, number];

const timeStuff:TimeStuff = (timestamp:number) => {
    const milliseconds = Date.now() - timestamp;
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    if (minutes < 1)
        return ["Now", 60 * 1000];
    if (minutes === 1)
        return [`1 minute`, 60 * 1000];
    if (hours < 1)
        return [`${minutes} minutes`, 60 * 1000];
    if (hours === 1)
        return [`1 hour`, 60 * 60 * 1000];
    if (hours < 5)
        return [`${hours} hours`, 60 * 60 * 1000 * (5 - hours)];
    if (hours <= 24)
        return ["today", 60 * 60 * 1000 * (24 - hours)];
    if (hours <= 48)
        return ["yesterday", 60 * 60 * 1000 * (48 - hours)];
    return [new Date (milliseconds).toLocaleDateString(), null]; 
}

const customTimeStuff: TimeStuff = (timestamp: number) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return [new Date(this.props.activity.timestamp).toLocaleTimeString("de-DE", options), null];
}

interface Props {
    timestamp: number
}

export class Timestamp extends React.Component<Props, {}> {
    private nextRender:number;
    constructor(props:Props) {
        super();
        this.nextRender = null;
    }

    private setNextRender(timestamp:number) {
        const ts = customTimeStuff(timestamp);
        if (ts[1])
            this.nextRender = setTimeout(() => {
                this.forceUpdate();
                this.setNextRender(timestamp);
            }, ts[1])
    }

    componentDidMount() {
        this.setNextRender(this.props.timestamp);
    }

    componentWillUnmount() {
        clearTimeout(this.nextRender);
    }

    render() {
        return <div className="wc-time">{ customTimeStuff(this.props.timestamp)[0] }</div>;
    }
}
