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

interface UniNewsPageState {
    uniNews: NewsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    newsCount: number;
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
        newsCount: 0
    };

    fetchUniNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/uniNews/${pageNumber}`)
            .then(response => response.json())
            .then(uniNews => this.setState({uniNews, isUpdating: false, filteredYear: 0, page: pageNumber}))
    };

    fetchUniNewsPageCount = (): void => {
        fetch("/api/v1/uniNewsCount")
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    fetchUniNewsByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/uniNewsByYear/${year}/${pageNumber}`)
            .then(response => response.json())
            .then(uniNews => this.setState({uniNews, isUpdating: false, filteredYear: year, page: pageNumber}))
    };

    fetchUniNewsCountByYear = (year: number): void => {
        fetch(`/api/v1/uniNewsCountByYear/${year}`)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year === 0)
        {
            this.fetchUniNewsPageCount();
            this.fetchUniNewsPage(pageNumber);
        }
        else {
            this.fetchUniNewsCountByYear(year);
            this.fetchUniNewsByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchUniNewsPageCount();
        this.fetchUniNewsPage(this.state.page);
    };

    render(): React.ReactElement {
        const {uniNews, newsCount, isUpdating, filteredYear, page} = this.state;
        const newsPerPage = 6;
        const pagesCount = Math.ceil(newsCount / newsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}, {itemValue: 2020, label: "2020"}, {itemValue: 2019, label: "2019"},
            {itemValue: 2018, label: "2018"}, {itemValue: 2017, label: "2017"}, {itemValue: 2016, label: "2016"},
            {itemValue: 2015, label: "2015"}, {itemValue: 2014, label: "2014"}, {itemValue: 2013, label: "2013"},
            {itemValue: 2012, label: "2012"}, {itemValue: 2011, label: "2011"}, {itemValue: 2010, label: "2010"}];

        return (
            <>
                <Layout title="Новости института"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="instNews" className="text-center page__title">Новости института</h1>
                    <div className="container">
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {uniNews.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <NewsCards newsCards={uniNews}/>
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
                                               this.fetchUniNewsByYear(filteredYear, selectedItem.selected);
                                           else
                                               this.fetchUniNewsPage(selectedItem.selected);
                                           scroll("instNews");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
