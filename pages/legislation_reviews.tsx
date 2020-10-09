import React, {Component} from "react";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {DocsCardData} from "../Types/DocsCardData";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {NewsFilter} from "../Components/NewsFIlter/NewsFilter";
import {LoadingComponent} from "../Components/Loading";
import {UpdateComponent} from "../Components/UpdateComponent";
import {scroll} from "../Scripts/scroll";
import ReactPaginate from "react-paginate";
import {connectionErrorHandler, emptyContentErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface LegislationReviewsPageState {
    reviews: DocsCardData[],
    page: number,
    years: {year: number}[],
    isUpdating: boolean,
    filteredYear: number,
    reviewsCount: number,
    error: boolean,
    errorMessage: string
}

export default class LegislationReviewsPage extends Component<LegislationReviewsPageState>  {
    state: LegislationReviewsPageState = {
        reviews: [],
        page: 0,
        years: [],
        isUpdating: false,
        filteredYear: 0,
        reviewsCount: 0,
        error: false,
        errorMessage: ""
    };

    fetchYearsArrange = (): void => {
        fetch("/api/v1/legislationReviewsYears")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(years => this.setState({years: years}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchReviewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/legislationReviews/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(reviews => this.setState({reviews, isUpdating: false, filteredYear: 0, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchReviewsCount = (): void => {
        fetch("/api/v1/legislationReviewsCount")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(reviewsCount => this.setState({reviewsCount}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchReviewsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/legislationReviewsByYear/${year}/${pageNumber}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(reviews => this.setState({reviews, isUpdating: false, page: pageNumber, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchReviewsCountByYear = (year: number): void => {
        fetch(`/api/v1/legislationReviewsCountByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(reviewsCount => this.setState({reviewsCount}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };


    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year === 0)
        {
            this.fetchReviewsCount();
            this.fetchReviewsPage(pageNumber);
        }
        else {
            this.setState({filteredYear: year});
            this.fetchReviewsCountByYear(year);
            this.fetchReviewsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchReviewsCount();
        this.fetchYearsArrange();
        this.fetchReviewsPage(this.state.page);
    }

    render(): React.ReactElement {
        const {reviews, years, reviewsCount, isUpdating, filteredYear, page, error, errorMessage} = this.state;
        const reviewsPerPage = 6;
        const pagesCount = Math.ceil(reviewsCount / reviewsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}].concat(years.map(year => Object({itemValue: year.year, label: year.year.toString()})));

        return (
            <>
                <Layout title="Тематические обзоры законодательства"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="legislation_reviews" className="text-center page__title">Тематические обзоры законодательства</h1>
                    <div className="container">
                        <NewsFilter filterName="Год" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {(reviews.length == 0 && !error) && <LoadingComponent/>}
                        {(isUpdating && !error) && <UpdateComponent/>}
                        {!error && <DocsCards docsCards={reviews}/>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
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
                                           filteredYear !== 0 ? this.fetchReviewsByYear(filteredYear, selectedItem.selected) : this.fetchReviewsPage(selectedItem.selected);
                                           scroll("legislation_reviews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
