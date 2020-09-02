import React, {Component} from "react";
import {NextPageContext} from "next";
import ReactPaginate from "react-paginate";

import {NewsCardData} from "../../Types/NewsCardData";
import {scroll} from "../../Scripts/scroll";

import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {NewsCards} from "../../Components/NewsCards/NewsCards";
import {Footer} from "../../Components/Footer";
import {LoadingComponent} from "../../Components/Loading";

interface UniNewsPageProps {
    page: number;
}

interface UniNewsPageState {
    uniNews: NewsCardData[],
    page: number,
    newsCount: number;
}

export default class UniNewsPage extends Component<UniNewsPageProps, UniNewsPageState> {
    static getInitialProps(context: NextPageContext) {
        // @ts-ignore
        const page: string = context.query.uniNewsPage.toString();
        return {page: parseInt(page)};
    }

    state: UniNewsPageState = {
        uniNews: [],
        page: 0,
        newsCount: 0
    };

    fetchUniNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/uniNews/${pageNumber}`)
            .then(response => response.json())
            .then(uniNews => this.setState({uniNews}))
    };

    fetchUniNewsPageCount = (): void => {
        fetch("/api/v1/uniNewsCount")
            .then(response => response.json())
            .then(newsCount => this.setState({newsCount}))
    };

    componentDidMount(): void {
        this.fetchUniNewsPageCount();
        this.fetchUniNewsPage(this.props.page);
    };

    componentDidUpdate(prevProps: Readonly<UniNewsPageProps>): void {
        if (this.props.page !== prevProps.page) {
            this.fetchUniNewsPage(this.props.page);
        }
    }

    render(): React.ReactElement {
        const {uniNews, newsCount} = this.state;
        const newsPerPage = 6;
        const pagesCount = newsCount / newsPerPage;

        return (
            <>
                <Layout title="Новости института"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 id="instNews" className="text-center page__title">Новости института</h1>
                    <div className="container">
                        {uniNews.length == 0 && <LoadingComponent/>}
                        <NewsCards newsCards={uniNews}/>
                        <ReactPaginate pageCount={pagesCount} pageRangeDisplayed={2} marginPagesDisplayed={2}
                                       containerClassName={"pagination justify-content-center"}
                                       pageClassName={"page-item"} pageLinkClassName={"page-link"} previousLinkClassName={"page-link"}
                                       previousClassName={"page-item"} nextLinkClassName={"page-link"} nextClassName={"page-item"}
                                       breakClassName={"page-item"} breakLinkClassName={"page-link"}
                                       previousLabel={"Назад"} nextLabel={"Вперед"}
                                       activeClassName={"active"} disabledClassName={"disabled"}
                                       onPageChange={selectedItem => {
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
