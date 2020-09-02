export const scroll = (elementToId: string): void => {
    const header = document.getElementById(elementToId);
    if (header !== null)
        header.scrollIntoView({behavior: "smooth"});
};
