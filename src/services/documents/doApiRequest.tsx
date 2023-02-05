import { url as baseUrl } from "../../constants/constants";
import {
    token,
} from "../../utils/common.utils";
import { message } from "antd";

async function doApiRequest(
    apiRoute: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    body?: any,
): Promise<any> {
    const baseHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
    };

    const reqParams: any = {
        headers: baseHeaders,
        method,
    };

    if ((method === "POST" || method === "PUT") && body) {
        reqParams.body = JSON.stringify(body);
    }

    const addHeader = (key: string, value: string) => {
        reqParams.headers[key] = value;
    };

    let res: any;

    try {
        res = await fetch(`${baseUrl}${apiRoute}`, reqParams);
        if (res.status === 401) {
            message.error("Токен устарел, необходимо повторно залогиниться");
            document.location.replace("/login?expired");
        }
        if (res.status !== 404) {
            res = await res.json();
        }
    } catch (e) {
        console.error(e);
    }

    return res;
}

export default doApiRequest;
