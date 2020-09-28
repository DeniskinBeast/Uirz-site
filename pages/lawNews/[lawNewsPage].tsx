import React, {Component} from "react";
// import {NextPageContext} from "next";
import ReactPaginate from "react-paginate";

import {NewsCardData} from "../../Types/NewsCardData";

import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {NewsCards} from "../../Components/NewsCards/NewsCards";
import {Footer} from "../../Components/Footer";
import {LoadingComponent} from "../../Components/Loading";
import {scroll} from "../../Scripts/scroll";
import {UpdateComponent} from "../../Components/UpdateComponent";
import {NewsFilter} from "../../Components/NewsFIlter/NewsFilter";
import {connectionErrorHandler, emptyContentErrorHandler} from "../../server/Handlers/errorHanlders";
import ErrorComponent from "../../Components/ErrorComponent";

interface LawNewsPageState {
    lawNews: NewsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    newsCount: number,
    error: boolean,
    errorMessage: string;
}

export default class LawNewsPage extends Component<LawNewsPageState> {
    // static getInitialProps(context: NextPageContext) {
    //     // @ts-ignore
    //     const page: string = context.query.lawNewsPage.toString();
    //     return {page: parseInt(page)};
    // }

    state: LawNewsPageState = {
        lawNews: [],
        page: 0,
        isUpdating: false,
        filteredYear: 0,
        newsCount: 0,
        error: false,
        errorMessage: ""
    };

    fetchLawNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/lawNews/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(lawNews => this.setState({lawNews: lawNews, page: pageNumber, isUpdating: false, filteredYear: 0, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchLawNewsPageCount = (): void => {
        fetch("/api/v1/lawNewsCount")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchLawNewsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/lawNewsByYear/${year}/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(lawNews => this.setState({lawNews, isUpdating: false, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchLawNewsCountByYear = (year: number): void => {
        fetch(`/api/v1/lawNewsCountByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year == 0)
        {
            this.fetchLawNewsPageCount();
            this.fetchLawNewsPage(pageNumber);
        }
        else {
            this.setState({filteredYear: year});
            this.fetchLawNewsCountByYear(year);
            this.fetchLawNewsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchLawNewsPageCount();
        this.fetchLawNewsPage(this.state.page);
    };

    render(): React.ReactElement {
        const {lawNews, newsCount, isUpdating, filteredYear, page, error, errorMessage} = this.state;
        const newsPerPage = 6;
        const pagesCount = Math.ceil(newsCount / newsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}, {itemValue: 2020, label: "2020"}, {itemValue: 2019, label: "2019"},
            {itemValue: 2018, label: "2018"}, {itemValue: 2017, label: "2017"}, {itemValue: 2016, label: "2016"},
            {itemValue: 2015, label: "2015"}, {itemValue: 2014, label: "2014"}, {itemValue: 2013, label: "2013"},
            {itemValue: 2012, label: "2012"}, {itemValue: 2011, label: "2011"}, {itemValue: 2010, label: "2010"}];

        if (error)
            return (
                <>
                    <Layout title="Новости законодательства"/>
                    <Navbar />
                    <div className="content">
                        <Header />
                        <h1 id="lawNews" className="text-center page__title">Новости законодательства</h1>
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
                <Layout title="Новости законодательства"/>
                <Navbar />
                <div className="content">
                    <Header />
                    <h1 id="lawNews" className="text-center page__title">Новости законодательства</h1>
                    <div className="container">
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {lawNews.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <NewsCards newsCards={lawNews} cardsType="law_news"/>
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
                                           filteredYear !== 0 ? this.fetchLawNewsByYear(filteredYear, selectedItem.selected) : this.fetchLawNewsPage(selectedItem.selected);
                                           scroll("lawNews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}
