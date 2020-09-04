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

interface LawNewsPageState {
    lawNews: NewsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    newsCount: number;
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
        newsCount: 0
    };

    fetchLawNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/lawNews/${pageNumber}`)
            .then(response => response.json())
            .then(lawNews => this.setState({lawNews: lawNews, page: pageNumber, isUpdating: false, filteredYear: 0}))
    };

    fetchLawNewsPageCount = (): void => {
        fetch("/api/v1/lawNewsCount")
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    fetchLawNewsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/lawNewsByYear/${year}/${pageNumber}`)
            .then(response => response.json())
            .then(lawNews => this.setState({lawNews, isUpdating: false, filteredYear: year, page: pageNumber}))
    };

    fetchLawNewsCountByYear = (year: number): void => {
        fetch(`/api/v1/lawNewsCountByYear/${year}`)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year == 0)
        {
            this.fetchLawNewsPageCount();
            this.fetchLawNewsPage(pageNumber);
        }
        else {
            this.fetchLawNewsCountByYear(year);
            this.fetchLawNewsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchLawNewsPageCount();
        this.fetchLawNewsPage(this.state.page);
    };

    render(): React.ReactElement {
        const {lawNews, newsCount, isUpdating, filteredYear, page} = this.state;
        const newsPerPage = 6;
        const pagesCount = Math.ceil(newsCount / newsPerPage);

        return (
            <>
                <Layout title="Новости законодательства"/>
                <Navbar />
                <div className="content">
                    <Header />
                    <h1 id="lawNews" className="text-center page__title">Новости законодательства</h1>
                    <div className="container">
                        <NewsFilter fetchFunc={this.filterByYear}/>
                        {lawNews.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <NewsCards newsCards={lawNews}/>
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
                                               this.fetchLawNewsByYear(filteredYear, selectedItem.selected);
                                           else
                                               this.fetchLawNewsPage(selectedItem.selected);
                                           scroll("lawNews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}
