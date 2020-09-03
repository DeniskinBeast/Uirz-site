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

interface LawNewsPageState {
    lawNews: NewsCardData[],
    page: number,
    isUpdating: boolean,
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
        newsCount: 0
    };

    fetchLawNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/lawNews/${pageNumber}`)
            .then(response => response.json())
            .then(lawNews => this.setState({lawNews: lawNews, page: pageNumber, isUpdating: false}))
    };

    fetchLawNewsPageCount = (): void => {
        fetch("/api/v1/lawNewsCount")
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    componentDidMount(): void {
        this.fetchLawNewsPageCount();
        this.fetchLawNewsPage(this.state.page);
    };

    render(): React.ReactElement {
        const {lawNews, newsCount, isUpdating} = this.state;
        const newsPerPage = 6;
        const pagesCount = newsCount / newsPerPage;

        return (
            <>
                <Layout title="Новости законодательства"/>
                <Navbar />
                <div className="content">
                    <Header />
                    <h1 id="lawNews" className="text-center page__title">Новости законодательства</h1>
                    <div className="container">
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
                                       onPageChange={selectedItem => {
                                           this.setState({isUpdating: true});
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
