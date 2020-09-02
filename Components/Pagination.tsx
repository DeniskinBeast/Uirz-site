import React from "react";
import Link from "next/link";
import {Link as ScrollLink} from "react-scroll/modules";


interface PaginationProps {
    pagesCount: number,
    label: string,
    pageHref: string,
    pageHrefAs: string,
    scrollTo: string;
}

function renderPaginationElement(pageHref: string, pageHrefAs: string, scrollTo: string, pageNumber: string) {
    return (
        <li className="page-item">
            <Link href={pageHref} as={pageHrefAs + pageNumber}>
                <ScrollLink className="page-link" activeClass="active" to={scrollTo} smooth={true}>{pageNumber}</ScrollLink>
            </Link>
        </li>
    )
}

export function Pagination({pagesCount, label, pageHref, pageHrefAs, scrollTo}: PaginationProps) {
    const pages = [];
    for (let i = 0; i <= Math.floor(pagesCount); i++)
        pages.push("" + i);

    return (
        <nav aria-label={label}>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {pages.map(page => renderPaginationElement(pageHref, pageHrefAs, scrollTo, page))}
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
