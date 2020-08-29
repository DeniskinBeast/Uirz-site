import React, {Component} from "react";

import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {NewsCards} from "../../Components/NewsCards/NewsCards";

import {NewsCardData} from "../../Types/NewsCardData";
import {Footer} from "../../Components/Footer";
import {NextPageContext} from "next";
import Link from "next/link";
import {Link as ScrollLink} from "react-scroll/modules";

interface LawNewsPageProps {
    page: number;
}

interface LawNewsPageState {
    lawNews: NewsCardData[],
    page: number;
}

export default class LawNewsPage extends Component<LawNewsPageProps, LawNewsPageState> {
    static getInitialProps(context: NextPageContext) {
        // @ts-ignore
        const page: string = context.query.lawNewsPage.toString();
        return {page: parseInt(page)};
    }

    state: LawNewsPageState = {
        lawNews: [],
        page: 0
    };

    fetchLawNewsPage = (pageNumber: number): void => {
        fetch(`/api/v1/lawNews/${pageNumber}`)
            .then(response => response.json())
            .then(lawNews => this.setState({lawNews: lawNews, page: pageNumber}))
    };

    componentDidMount(): void {
        this.fetchLawNewsPage(this.props.page);
    };

    componentDidUpdate(prevProps: Readonly<LawNewsPageProps>): void {
        if (this.props.page !== prevProps.page) {
            this.fetchLawNewsPage(this.props.page);
        }
    }

    render(): React.ReactElement {
        const {lawNews} = this.state;

        return (
            <>
                <Layout title="Новости законодательства"/>
                <Navbar />
                <div className="content">
                    <Header />
                    <h1 id="lawNews" className="text-center page__title">Новости законодательства</h1>
                    <div className="container">
                        <NewsCards newsCards={lawNews}/>
                        <nav aria-label="Law News pagination">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <Link href="/lawNews/[lawNewsPage]" as="/lawNews/0">
                                        <ScrollLink href="" className="page-link" activeClass="active" to="lawNews" smooth={true}>1</ScrollLink>
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link href="/lawNews/[lawNewsPage]" as="/lawNews/1">
                                        <ScrollLink href="" className="page-link" activeClass="active" to="lawNews" smooth={true}>2</ScrollLink>
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link href="/lawNews/[lawNewsPage]" as="/lawNews/2">
                                        <ScrollLink href="" className="page-link" activeClass="active" to="lawNews" smooth={true}>3</ScrollLink>
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link href="/lawNews/[lawNewsPage]" as="/lawNews/3">
                                        <ScrollLink href="" className="page-link" activeClass="active" to="lawNews" smooth={true}>4</ScrollLink>
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
                </div>
                <Footer/>
            </>
        );
    }
}
