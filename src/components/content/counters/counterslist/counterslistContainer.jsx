import React from "react";
import Counterslist from "./counterslist";
import {connect} from "react-redux";
import {setCounters, setCurrentPage, setTotalCounters,toggleIsFetching} from "../../../../redux/counters-reducer";
import * as axios from "axios";

class CounterslistContainer extends React.Component{
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`http://195.161.62.108:3000/counters?page=${this.props.currentPage}&limit=${this.props.pageSize}`).then(response =>{

            this.props.setCounters(response)
            this.props.setTotalCounters(response)
            this.props.toggleIsFetching(false)
        })




    }
    changePage = (page) =>{


        this.props.setCurrentPage(page)
        this.props.toggleIsFetching(true)
        axios.get(`http://195.161.62.108:3000/counters?page=${page}&limit=${this.props.pageSize}`).then(response =>{

            this.props.setCounters(response)
            this.props.toggleIsFetching(false)
        })

    }
    render(){
      return <Counterslist
              countersListData={this.props.countersListData}
              pageSize={this.props.pageSize}
              totalCounters={this.props.totalCounters}
              currentPage={this.props.currentPage}
              isFetching={this.props.isFetching}
              changePage={this.changePage}
      />
    }
}

let mapStateToProps = (state) =>{
    return{
        countersListData: state.countersPage.counterslistData,
        pageSize: state.countersPage.pageSize,
        totalCounters: state.countersPage.totalCounters,
        currentPage: state.countersPage.currentPage,
        isFetching: state.countersPage.isFetching

    }
}


export default CounterslistContainer = connect(mapStateToProps, {setCounters, setCurrentPage,setTotalCounters,toggleIsFetching})(CounterslistContainer)

