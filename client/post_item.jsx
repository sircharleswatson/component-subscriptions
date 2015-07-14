PostItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <div className="post">
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
      </div>
    )
  }
});
