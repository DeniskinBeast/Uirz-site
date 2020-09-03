//TODO Как-нибудь победить прокрутку в сафари
export const scroll = (elementToId: string): void => {
    const vendor = navigator.vendor;
    const header = document.getElementById(elementToId);
    if (header !== null)
        if (vendor == "Apple Computer, Inc.")
            window.scrollTo({top: header.offsetTop, left: header.offsetLeft, behavior: "smooth"});
        else
            header.scrollIntoView({behavior: "smooth"});
};
