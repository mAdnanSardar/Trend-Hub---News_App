import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
static defualtProps={
  country:'us',
  pageSize:8,
  category: 'general',
}
static propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
    document.title= `Trend Hub - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  async updateNews(){
    this.props.setProgress(10)
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
  this.setState({loading: true})
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({ articles: parsedData.articles, totalResults : parsedData.totalResults ,
    loading: false });
    this.props.setProgress(100);
  //  console.log(this.state.page)
  }
  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=402da3e427564d068ec7950621075be9&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles, totalResults : parsedData.totalResults ,
    //   loading: false });
  // this.setState({page: this.state.page +1})
 //  console.log("this is component did mount")
    this.updateNews()
  }

  clickedNextBtn = async () => {
   // if (!(this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize))) {    
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=402da3e427564d068ec7950621075be9&page=${this.state.page +1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ 
    //     page: this.state.page +1,
    //     articles: parsedData.articles,
    //     loading: false
    //  });
 // }
    this.setState({page: this.state.page+1})
    this.updateNews();
    };
  clickedPrevBtn = async () => {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=402da3e427564d068ec7950621075be9&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ 
    //     page: this.state.page -1,
    //     articles: parsedData.articles,
    //     loading: false
    //  });
    this.setState({page: this.state.page-1})
    this.updateNews()
  };

  fetchMoreData = async() => {
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=402da3e427564d068ec7950621075be9&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    this.setState({page: this.state.page+1})
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults});

  };


  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px' , marginTop:'90px'}}>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {/* {this.state.loading && <Spinner/>} */}
          { this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="containner d-flex justify-content-between">
          <button
            disabled={this.state.page<=1} 
            type="button"
            className="btn btn-dark"
            onClick={this.clickedPrevBtn}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.clickedNextBtn}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
