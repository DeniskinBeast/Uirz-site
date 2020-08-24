import React, {Component} from "react";
import {NextPageContext} from "next";
import Link from "next/link";
import {Link as ScrollLink} from "react-scroll";

import {NewsCardData} from "../../Types/NewsCardData";
import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {NewsCards} from "../../Components/NewsCards/NewsCards";
import {Footer} from "../../Components/Footer";

interface UniNewsPageProps {
    page: number;
}

interface UniNewsPageState {
    uniNews: NewsCardData[],
    page: number;
}

export default class UniNewsPage extends Component<UniNewsPageProps, UniNewsPageState> {
    static getInitialProps(context: NextPageContext) {
        // @ts-ignore
        const page: string = context.query.uniNewsPage.toString();
        return {page: parseInt(page)};
    }

    state: UniNewsPageState = {
        uniNews: [],
        page: 0
    };

    fetchUniNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/uniNews/${pageNumber}`)
            .then(response => response.json())
            .then(uniNews => this.setState({uniNews}))
    };

    componentDidMount(): void {
        this.fetchUniNewsPage(this.props.page);
    };

    componentDidUpdate(prevProps: Readonly<UniNewsPageProps>): void {
        if (this.props.page !== prevProps.page) {
            this.fetchUniNewsPage(this.props.page);
        }
    }

    render(): React.ReactElement {
        const {uniNews} = this.state;

        return (
            <>
                <Layout title="Новости института"/>
                <Navbar/>
                <Header/>
                <h1 id="instNews" className="text-center page__title">Новости института</h1>
                <div className="container">
                    <NewsCards newsCards={uniNews}/>
                    <nav aria-label="Law News pagination">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            <li className="page-item">
                                <Link href="/uniNews/[uniNewsPage]" as="/uniNews/0">
                                    <ScrollLink href="" className="page-link" activeClass="active" to="instNews" smooth={true}>1</ScrollLink>
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link href="/uniNews/[uniNewsPage]" as="/uniNews/1">
                                    <ScrollLink href="" className="page-link" activeClass="active" to="instNews" smooth={true}>2</ScrollLink>
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link href="/uniNews/[uniNewsPage]" as="/uniNews/2">
                                    <ScrollLink href="" className="page-link" activeClass="active" to="instNews" smooth={true}>3</ScrollLink>
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link href="/uniNews/[uniNewsPage]" as="/uniNews/3">
                                    <ScrollLink href="" className="page-link" activeClass="active" to="instNews" smooth={true}>4</ScrollLink>
                                </Link>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Footer/>
            </>
        )
    }
}
