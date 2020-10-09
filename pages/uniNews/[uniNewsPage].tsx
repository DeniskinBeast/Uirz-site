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

interface UniNewsPageState {
    uniNews: NewsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    years: {year: number}[],
    newsCount: number,
    error: boolean,
    errorMessage: string;
}

export default class UniNewsPage extends Component<UniNewsPageState> {
    // static getInitialProps(context: NextPageContext) {
    //     // @ts-ignore
    //     const page: string = context.query.uniNewsPage.toString();
    //     return {page: parseInt(page)};
    // }

    state: UniNewsPageState = {
        uniNews: [],
        page: 0,
        isUpdating: false,
        filteredYear: 0,
        years: [],
        newsCount: 0,
        error: false,
        errorMessage: ""
    };

    fetchYearsArrange = (): void => {
        fetch("/api/v1/uniNewsYears")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(years => this.setState({years: years}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchUniNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/uniNews/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(uniNews => this.setState({uniNews, isUpdating: false, filteredYear: 0, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchUniNewsPageCount = (): void => {
        fetch("/api/v1/uniNewsCount")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchUniNewsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/uniNewsByYear/${year}/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(uniNews => this.setState({uniNews, isUpdating: false, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchUniNewsCountByYear = (year: number): void => {
        fetch(`/api/v1/uniNewsCountByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year === 0)
        {
            this.fetchUniNewsPageCount();
            this.fetchUniNewsPage(pageNumber);
        }
        else {
            this.setState({filteredYear: year});
            this.fetchUniNewsCountByYear(year);
            this.fetchUniNewsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchUniNewsPageCount();
        this.fetchUniNewsPage(this.state.page);
        this.fetchYearsArrange();
    };

    render(): React.ReactElement {
        const {uniNews, newsCount, isUpdating, filteredYear, years, page, error, errorMessage} = this.state;
        const newsPerPage = 6;
        const pagesCount = Math.ceil(newsCount / newsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}].concat(years.map(year => Object({itemValue: year.year, label: year.year.toString()})));

        if (error)
            return (
                <>
                    <Layout title="Новости института"/>
                    <Navbar/>
                    <div className="content">
                        <Header/>
                        <h1 id="instNews" className="text-center page__title">Новости института</h1>
                        <div className="container">
                            <NewsFilter filterName="Год" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                            <ErrorComponent errorMessage={errorMessage}/>
                        </div>
                    </div>
                    <Footer/>
                </>
            );

        return (
            <>
                <Layout title="Новости института"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="instNews" className="text-center page__title">Новости института</h1>
                    <div className="container">
                        <NewsFilter filterName="Год" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {uniNews.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <NewsCards newsCards={uniNews} cardsType="inst_news"/>
                        <ReactPaginate pageCount={pagesCount} pageRangeDisplayed={2} marginPagesDisplayed={2}
                                       containerClassName={"pagination justify-content-center"}
                                       pageClassName={"page-item"} pageLinkClassName={"page-link"} previousLinkClassName={"page-link"}
                                       previousClassName={"page-item"} nextLinkClassName={"page-link"} nextClassName={"page-item"}
                                       breakClassName={"page-item"} breakLinkClassName={"page-link"}
                                       previousLabel={"Назад"} nextLabel={"Вперед"}
                                       activeClassName={"active page-item_active"} disabledClassName={"disabled"}
                                       forcePage={page}
                                       onPageChange={selectedItem => {
                                           this.setState({isUpdating: true});
                                           filteredYear !== 0 ? this.fetchUniNewsByYear(filteredYear, selectedItem.selected) : this.fetchUniNewsPage(selectedItem.selected);
                                           scroll("instNews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
