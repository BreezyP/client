import React from 'react';
import { connect } from 'react-redux';
import { fetchAllStreams } from "../../actions";

class StreamList extends React.Component{

    componentDidMount() {
        this.props.fetchAllStreams();
    }

    renderList(){
        return this.props.streams.map(stream => {
            return (
                <div key={stream.id}>
                    {stream.title}
                </div>
            );
        })
    }

    render() {
        console.log(this.props.streams);
        return <div>{this.renderList()}</div>;
    }
}

const mapStateToProps = (state) => {

    return { streams: Object.values(state.streams) }

};

export default connect(mapStateToProps, { fetchAllStreams })(StreamList);