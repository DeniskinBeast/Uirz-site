export const connectionErrorHandler = (response: Response): Response => {
    if (!response.ok) {
        console.log(response.url + " " + response.statusText + " " + response.status);
        throw Error("Не удалось подключиться к серверу, пожалуйста, проверьте ваше интернет соединение.");
    }

    return response;
};

export const emptyContentErrorHandler = (content: any): any => {
    if (content === null)
        throw Error("По данному запросу ничего не найдено.");

    return content;
};

export const catchHandler = (err: Error): void => {
    console.log(err.message);
};
