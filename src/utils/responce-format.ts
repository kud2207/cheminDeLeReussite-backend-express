import { ApiResponce } from "../interfaces/responce-interface";

const sendResponse = <T>(
    { res, success, status, message, data }: ApiResponce<T>,
): void => {
    res.status(status).json({
        success,
        status,
        message,
        data,
    } as ApiResponce<T>);
}

export { sendResponse };
