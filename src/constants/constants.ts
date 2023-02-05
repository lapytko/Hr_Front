// Auth
export const tokenName: string = "HRApp";

export const url: string =
    process.env.NODE_ENV === "development"
        ? "http://10.81.80.6:6162"
        : window.location.protocol === "http:"
            ? "/api"
            : "/api";

export const requireRule = { required: true, message: "Заполните это поле" };
