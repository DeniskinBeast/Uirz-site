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

interface LegislationReviewsPageState {
    reviews: DocsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    reviewsCount: number
}

export default class LegislationReviewsPage extends Component<LegislationReviewsPageState>  {
    state: LegislationReviewsPageState = {
        reviews: [],
        page: 0,
        isUpdating: false,
        filteredYear: 0,
        reviewsCount: 0
    };

    fetchReviewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/legislationReviews/${pageNumber}`)
            .then(response => response.json())
            .then(reviews => this.setState({reviews, isUpdating: false, filteredYear: 0, page: pageNumber}))
    };

    fetchReviewsCount = (): void => {
        fetch("/api/v1/legislationReviewsCount")
            .then(response => response.json())
            .then(reviewsCount => this.setState({reviewsCount}));
    };

    fetchReviewsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/legislationReviewsByYear/${year}/${pageNumber}`)
            .then(response => response.json())
            .then(reviews => this.setState({reviews, isUpdating: false, filteredYear: year, page: pageNumber}))
    };

    fetchReviewsCountByYear = (year: number): void => {
        fetch(`/api/v1/legislationReviewsCountByYear/${year}`)
            .then(response => response.json())
            .then(reviewsCount => this.setState({reviewsCount}));
    };


    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year == 0)
        {
            this.fetchReviewsCount();
            this.fetchReviewsPage(pageNumber);
        }
        else {
            this.fetchReviewsCountByYear(year);
            this.fetchReviewsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchReviewsCount();
        this.fetchReviewsPage(this.state.page);
    }

    render(): React.ReactElement {
        const {reviews, reviewsCount, isUpdating, filteredYear, page} = this.state;
        const reviewsPerPage = 6;
        const pagesCount = Math.ceil(reviewsCount / reviewsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}, {itemValue: 2010, label: "2010"}, {itemValue: 2009, label: "2009"}];

        return (
            <>
                <Layout title="Тематические обзоры законодательства"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="legislation_reviews" className="text-center page__title">Тематические обзоры законодательства</h1>
                    <div className="container">
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {reviews.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <DocsCards docsCards={reviews}/>
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
                                           if (filteredYear !== 0)
                                               this.fetchReviewsByYear(filteredYear, selectedItem.selected);
                                           else
                                               this.fetchReviewsPage(selectedItem.selected);
                                           scroll("legislation_reviews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
