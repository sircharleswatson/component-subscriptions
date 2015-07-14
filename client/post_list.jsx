PostList = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      loaded: new ReactiveVar(0),
      limit: new ReactiveVar(5)
    };
  },
  getMeteorData() {
    var subscription = Meteor.subscribe('posts', this.state.limit.get());

    if (subscription.ready()) {
      console.log("> Received "+this.state.limit.get()+" posts. \n\n");
      this.state.loaded.set(this.state.limit.get());
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }

    return {
      loadedPosts: this.getPosts().fetch(),
      hasMorePosts: this.getPosts().count() >= this.state.limit.get(),
      subReady: subscription.ready()
    };
  },
  loadMore(event) {
    event.preventDefault()

    var limit = this.state.limit.get();

    limit += 5;
    this.state.limit.set(limit);

  },
  getPosts() {
    return Posts.find();
  },
  render() {
    // Iterate through all posts and create a post item for each of them
    let posts = this.data.loadedPosts.map(function (post) {
      return <PostItem
            key={post._id}
            _id={post._id}
            title={post.title}
            body={post.body}
            />
    });
    return (
      <div>
        {posts}
        {this.data.subReady ?
          <div>
            {this.data.hasMorePosts ?
              <a className="load-more" href="#" onClick={this.loadMore}>
                Load More
              </a> : "" }
          </div> : <Loading />
        }
      </div>
    )
  }
})
