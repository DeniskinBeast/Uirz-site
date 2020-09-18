import React from "react";

interface ErrorProps {
    errorMessage: string
}

export default function ErrorComponent({errorMessage}: ErrorProps) {
    return (
        <div className="container">
            <h2 className="text-center page__title">
                Произошла ошибка
            </h2>
            <p className="text-center">{errorMessage}</p>
        </div>
    )
}
