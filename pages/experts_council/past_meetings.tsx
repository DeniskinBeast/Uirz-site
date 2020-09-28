import React, {Component} from "react";
// import {NextPageContext} from "next";
import ReactPaginate from "react-paginate";

import {NewsCardData} from "../../Types/NewsCardData";
import {scroll} from "../../Scripts/scroll";

import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {NewsCards} from "../../Components/NewsCards/NewsCards";
import {Footer} from "../../Components/Footer";
import {LoadingComponent} from "../../Components/Loading";
import {UpdateComponent} from "../../Components/UpdateComponent";
import {NewsFilter} from "../../Components/NewsFIlter/NewsFilter";
import {connectionErrorHandler, emptyContentErrorHandler} from "../../server/Handlers/errorHanlders";
import ErrorComponent from "../../Components/ErrorComponent";

interface ExpertsCouncilPastMeetingsPageState {
    meetings: NewsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    newsCount: number,
    error: boolean,
    errorMessage: string;
}

export default class ExpertsCouncilPastMeetingsPage extends Component<ExpertsCouncilPastMeetingsPageState> {
    // static getInitialProps(context: NextPageContext) {
    //     // @ts-ignore
    //     const page: string = context.query.uniNewsPage.toString();
    //     return {page: parseInt(page)};
    // }

    state: ExpertsCouncilPastMeetingsPageState = {
        meetings: [],
        page: 0,
        isUpdating: false,
        filteredYear: 0,
        newsCount: 0,
        error: false,
        errorMessage: ""
    };

    fetchPastMeetingsPage = (pageNumber: number): void => {
        fetch(`/api/v1/expertsCouncilPastMeetings/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(meetings => this.setState({meetings, isUpdating: false, filteredYear: 0, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchPastMeetingsPageCount = (): void => {
        fetch("/api/v1/expertsCouncilPastMeetingsCount")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchPastMeetingsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/expertsCouncilPastMeetingsByYear/${year}/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(meetings => this.setState({meetings, isUpdating: false, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchPastMeetingsCountByYear = (year: number): void => {
        fetch(`/api/v1/expertsCouncilPastMeetingsCountByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(newsCount => this.setState({newsCount, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year === 0)
        {
            this.fetchPastMeetingsPageCount();
            this.fetchPastMeetingsPage(pageNumber);
        }
        else {
            this.setState({filteredYear: year});
            this.fetchPastMeetingsCountByYear(year);
            this.fetchPastMeetingsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchPastMeetingsPageCount();
        this.fetchPastMeetingsPage(0);
    };

    render(): React.ReactElement {
        const {meetings, newsCount, isUpdating, filteredYear, page, error, errorMessage} = this.state;
        const newsPerPage = 6;
        const pagesCount = Math.ceil(newsCount / newsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}, {itemValue: 2020, label: "2020"}, {itemValue: 2019, label: "2019"},
            {itemValue: 2018, label: "2018"}, {itemValue: 2017, label: "2017"}, {itemValue: 2016, label: "2016"},
            {itemValue: 2015, label: "2015"}, {itemValue: 2014, label: "2014"}, {itemValue: 2013, label: "2013"},
            {itemValue: 2012, label: "2012"}, {itemValue: 2011, label: "2011"}, {itemValue: 2010, label: "2010"}];

        if (error)
            return (
                <>
                    <Layout title="Повестки прошедших заседаний Экспертного совета"/>
                    <Navbar/>
                    <div className="content">
                        <Header/>
                        <h1 id="instNews" className="text-center page__title">Повестки прошедших заседаний Экспертного совета</h1>
                        <div className="container">
                            <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                            <ErrorComponent errorMessage={errorMessage}/>
                        </div>
                    </div>
                    <Footer/>
                </>
            );

        return (
            <>
                <Layout title="Повестки прошедших заседаний Экспертного совета"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="instNews" className="text-center page__title">Повестки прошедших заседаний Экспертного совета</h1>
                    <div className="container">
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {meetings.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <NewsCards newsCards={meetings} cardsType="inst_news"/>
                        <ReactPaginate pageCount={pagesCount} pageRangeDisplayed={2} marginPagesDisplayed={2}
                                       containerClassName={"pagination justify-content-center"}
                                       pageClassName={"page-item"} pageLinkClassName={"page-link"} previousLinkClassName={"page-link"}
                                       previousClassName={"page-item"} nextLinkClassName={"page-link"} nextClassName={"page-item"}
                                       breakClassName={"page-item"} breakLinkClassName={"page-link"}
                                       previousLabel={"Назад"} nextLabel={"Вперед"}
                                       activeClassName={"active"} disabledClassName={"disabled"}
                                       forcePage={page}
                                       onPageChange={selectedItem => {
                                           this.setState({isUpdating: true});
                                           filteredYear !== 0 ? this.fetchPastMeetingsByYear(filteredYear, selectedItem.selected) : this.fetchPastMeetingsPage(selectedItem.selected);
                                           scroll("instNews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
