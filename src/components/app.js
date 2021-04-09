import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAppsIfNeeded } from '../redux/actions'

import {Helmet} from "react-helmet";

import Card from './card'
class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAppsIfNeeded())
  }


  render() {
    const { isFetching, apps } = this.props
    const totalapps = apps.length;

    return (
       <>
       <Helmet> 
                <title>This is SSR content</title>
                <meta
      name="description"
      content="Nơi giúp bạn tiết kiệm thời gian cho việc tiếp cận tin tức nhanh nhất, chính xác nhất"
    />
    <meta property="og:type" content="website" />
    <meta
      name="og:title"
      property="og:title"
      content={this.props.title || "Trang Chủ | Nhà bao Việc"}
    />
    <meta
      name="og:description"
      property="og:description"
      content={
        "Nhà bao Việc | " + this.props.description ||
        "Nơi giúp bạn tiết kiệm thời gian cho việc tiếp cận tin tức nhanh nhất, chính xác nhất"
      }
    /><meta property="og:image" content="media/netflix.jpg"/>
    <meta property="og:site_name" content="" />
    <meta property="og:url" content={this.props.url || ""} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="" />
    <meta
      name="twitter:description"
      content={
        "Nhà bao Việc | " + this.props.description ||
        "Nơi giúp bạn tiết kiệm thời gian cho việc tiếp cận tin tức nhanh nhất, chính xác nhất"
      }
    />
    <meta name="twitter:site" content="" />
    <meta name="twitter:creator" content="" />
    <meta name="twitter:image" content={this.props.image || ""} />
            </Helmet>
         {isFetching && totalapps === 0 && <h2>Loading...</h2>}
         {!isFetching && totalapps === 0 && <h2>Empty.</h2>}
         <Card apps={apps} totalapps={totalapps} />
       </>
    );
  }
}
 
function mapStateToProps({ isFetching, apps }) {
  return {
    isFetching,
    apps
  }
}
 
export default connect(mapStateToProps)(App)
