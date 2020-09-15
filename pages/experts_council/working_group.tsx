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

interface ExpertsCouncilWorkingGroupPageState {
    meetings: NewsCardData[],
    page: number,
    isUpdating: boolean,
    filteredYear: number,
    newsCount: number;
}

export default class ExpertsCouncilWorkingGroupPage extends Component<ExpertsCouncilWorkingGroupPageState> {
    // static getInitialProps(context: NextPageContext) {
    //     // @ts-ignore
    //     const page: string = context.query.uniNewsPage.toString();
    //     return {page: parseInt(page)};
    // }

    state: ExpertsCouncilWorkingGroupPageState = {
        meetings: [],
        page: 0,
        isUpdating: false,
        filteredYear: 0,
        newsCount: 0
    };

    fetchWorkingGroupPage = (pageNumber: number): void => {
        fetch(`/api/v1/expertsCouncilWorkingGroup/${pageNumber}`)
            .then(response => response.json())
            .then(meetings => this.setState({meetings, isUpdating: false, filteredYear: 0, page: pageNumber}))
    };

    fetchWorkingGroupPageCount = (): void => {
        fetch("/api/v1/expertsCouncilWorkingGroupCount")
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    fetchWorkingGroupByYear = (year: number, pageNumber: number): void => {
        fetch(`/api/v1/expertsCouncilWorkingGroupByYear/${year}/${pageNumber}`)
            .then(response => response.json())
            .then(meetings => this.setState({meetings, isUpdating: false, filteredYear: year, page: pageNumber}))
    };

    fetchWorkingGroupCountByYear = (year: number): void => {
        fetch(`/api/v1/expertsCouncilWorkingGroupCountByYear/${year}`)
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    filterByYear = (year: number, pageNumber: number): void => {
        this.setState({isUpdating: true});
        if (year === 0)
        {
            this.fetchWorkingGroupPageCount();
            this.fetchWorkingGroupPage(pageNumber);
        }
        else {
            this.fetchWorkingGroupCountByYear(year);
            this.fetchWorkingGroupByYear(year, pageNumber);
        }
    };

    componentDidMount(): void {
        this.fetchWorkingGroupPageCount();
        this.fetchWorkingGroupPage(0);
    };

    render(): React.ReactElement {
        const {meetings, newsCount, isUpdating, filteredYear, page} = this.state;
        const newsPerPage = 6;
        const pagesCount = Math.ceil(newsCount / newsPerPage);
        const filterItems = [{itemValue: 0, label: "Все"}, {itemValue: 2020, label: "2020"}];

        return (
            <>
                <Layout title="Повестки прошедших рабочих групп"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="working_group" className="text-center page__title">Повестки прошедших рабочих групп</h1>
                    <div className="container">
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={filterItems}/>
                        {meetings.length == 0 && <LoadingComponent/>}
                        {isUpdating && <UpdateComponent/>}
                        <NewsCards newsCards={meetings} cardsType="working_group"/>
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
                                               this.fetchWorkingGroupByYear(filteredYear, selectedItem.selected);
                                           else
                                               this.fetchWorkingGroupPage(selectedItem.selected);
                                           scroll("working_group");
                                       }}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
