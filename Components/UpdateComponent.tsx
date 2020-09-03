import React from "react";

export function UpdateComponent() {
    return (
        <>
            <div className="overlay">
                <div className="spinner-border text-primary updating-spinner" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
}
