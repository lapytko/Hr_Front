import { url, tokenName } from "../../constants/constants";
import { handleGetJson, setCookie } from "../../utils/common.utils";

async function loginRequest(username: string, password: string) {
    return await fetch(`${url}/account/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password: password }),
    })
        .then(handleGetJson)
        .then((res) => {
            if (!res.status) {
                setCookie(tokenName, res.token, {
                    expires: new Date(res.expiration).toUTCString(),
                });
            }
            return { ...res };
        })
        .catch((err) => {
            console.log(err);
        });
}

async function tokenExist(
    token: string | null,
    history: any,
) {
    return await fetch(`${url}/account/token-valid`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then(handleGetJson)
        .catch((err) => {
            console.log(err);
            setCookie(tokenName, "", {
                "max-age": -1,
            });
            history.push("/login");
        });
}

export { tokenExist, loginRequest };
