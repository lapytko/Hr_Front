import {
        tokenName,
        url,
} from "../constants/constants";
import {
    queryParamsT,
    tableDataT,
    tableSettingsNameT,
    UserMenu,
} from "../models/common-interfaces";

import { message } from "antd";
import moment, {isMoment, Moment} from "moment";
import { useEffect, useState } from "react";
import { getColumnSettings } from "../services/common/common.services";
import { defTableSettings } from "../constants/tableDefaultParameters";
import { TFunction } from "i18next";
import capitalizeFirstLetter from "./capitalizeFirstLetter";



function token(): string | null {
    const crmCookie = document.cookie
        .split(" ")
        .map((item) => (item.split("=")[0] === tokenName ? item : null))
        .filter((item) => !!item);
    return crmCookie[0] ? crmCookie[0].slice(tokenName.length + 1) : null;
}

function setCookie(name: string, value: string, options: any) {
    options = {
        path: "/",
        samesite: "strict",
        ...options,
    };

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
        value,
    )}`;

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function setPropLocalStorage(name: string, value: string) {
    return localStorage.setItem(name, value);
}

function removePropLocalStorage(name: string) {
    return localStorage.removeItem(name);
}

function getPropLocalStorage(name: string): string {
    return localStorage.getItem(name) || "";
}

const toBase64 = (file: any): Promise<any> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const fullCopyObject = (obj: any) => JSON.parse(JSON.stringify(obj));

const unificationSubName = (subjectName: string): string => {
    return subjectName
        ? subjectName
            .split(", ")
            .map((x) => x.split("=")[1])
            .join("")
            .replace(" ", "")
        : "";
};

const saveFile = (fileObj: any) => {
    if (fileObj?.href) {
        const link = document.createElement("a");
        link.href = url + "/" + fileObj.href;
        link.download = "";
        link.click();
        link.remove();
    } else {
        const link = document.createElement("a");
        link.href = `data:${fileObj.contentType};base64,${fileObj.fileContents}`;
        link.download = fileObj.fileDownloadName;
        link.click();
        link.remove();
    }
};

const defaultSelection: any = [];

const defQueryParams: queryParamsT = {
    offset: 0,
    limit: 20,
    sort: [
        {
            field: "updateDate",
            dir: "desc",
        },
    ],
    filter: {},
    isSync: true,
};

const defUsersQueryParams: queryParamsT = {
    offset: 0,
    limit: 20,
    sort: [],
    filter: {},
    isSync: true,
};

const defLabelQueryParams: queryParamsT = {
    offset: 0,
    limit: 10,
    sort: [],
    filter: {},
    isSync: true,
};

const defDraftsQueryParams: queryParamsT = {
    offset: 0,
    limit: 20,
    sort: [{ dir: "desc", field: "creationDate" }],
    filter: {},
    isSync: true,
};

const defPostMarkingParams: queryParamsT = {
    offset: 0,
    limit: 20,
    sort: [{ dir: "desc", field: "createdAt" }],
    filter: {},
    isSync: true,
};

const defEduDocumentsQueryParams: queryParamsT = {
    offset: 0,
    limit: 10,
    sort: [{ field: "date", dir: "desc" }],
    filter: {},
    isSync: true,
};

const defCodesQueryParams: queryParamsT = {
    offset: 0,
    limit: 10,
    sort: [],
    filter: {},
    isSync: true,
};
const createFiltersArr = (filters: any) => {
    return Object.entries(filters)
        .filter((f: any) => f[1])
        .map((f: any) => {
            if (f[1][0] !== null && f[1][0] !== undefined) {
                // processing date range picker
                if (isMoment(f[1][0][0]) && isMoment(f[1][0][1])) {
                    return {
                        logic: "and",
                        filters: [
                            {
                                field: f[0],
                                value: f[1][0][0]
                                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                                    .format(),
                                operator: ">=",
                            },
                            {
                                field: f[0],
                                value: f[1][0][1]
                                    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                                    .format(),
                                operator: "<=",
                            },
                        ],
                    };
                }

                if (moment.isMoment(f[1][0][0])) {
                    return {
                        field: f[0],
                        value: f[1][0][0]
                            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                            .format(),
                        operator: ">=",
                    };
                }

                if (moment.isMoment(f[1][0][1])) {
                    return {
                        field: f[0],
                        value: f[1][0][1]
                            .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                            .format(),
                        operator: "<=",
                    };
                }

                // processing number range picker
                if (
                    typeof f[1][0][0] === "number" &&
                    typeof f[1][0]?.[1] === "number"
                ) {
                    return {
                        logic: "and",
                        filters: [
                            {
                                field: f[0],
                                value: f[1][0][0],
                                operator: ">=",
                            },
                            {
                                field: f[0],
                                value: f[1][0][1],
                                operator: "<=",
                            },
                        ],
                    };
                }

                if (typeof f[1][0][0] === "number") {
                    return {
                        field: f[0],
                        value: f[1][0][0],
                        operator: ">=",
                    };
                }

                if (typeof f[1][0][1] === "number") {
                    return {
                        field: f[0],
                        value: f[1][0][1],
                        operator: "<=",
                    };
                }
            }

            if (f[1][0] === null && (f[0] === "groupId" || f[0] === "group.id")) {
                return {
                    field: f[0],
                    value: null,
                    operator: "=",
                };
            }
        });
};

const createFilterObject = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any,
) => {
    const { pageSize, current } = pagination;

    return {
        limit: pageSize,
        offset: extra.action === "filter" ? 0 : (current - 1) * pageSize,
        sort: sorter.order
            ? [
                {
                    field: sorter.field,
                    dir: sorter.order.slice(0, -3),
                },
            ]
            : [],
        filter: filters.length
            ? {
                logic: "and",
                filters: filters,
            }
            : {},
    };
};

const disabledDate = (curDate: Moment): boolean => {
    return moment(moment.now()) < curDate;
};

const getDateInDeclNum = (declNum: string): Moment | null => {
    const dateStringBlank: string = declNum.split("/")[1] ?? "_";

    if (dateStringBlank.includes("_")) return null;

    const dateString: string =
        dateStringBlank
            .match(/.{1,2}/g)
            ?.reverse()
            .join("-") ?? "";

    return dateString ? moment("20" + dateString) : null;
};

const getCustomsCode = (declNum: string): string | null => {
    const code: string = declNum.split("/")[0];

    if (code.includes("_")) return null;

    // if (code) return null;
    // const code: string = code.match(/.{1,2}/g);

    return code || null;
};

const someRecordHaveStatus = (
    rows: any[],
    status: number,
): number | undefined => {
    if (
        !rows[0]?.status === undefined ||
        !rows[0]?.status === null ||
        rows.length === 0
    )
        return undefined;

    return rows.some((row) => row.status === status) ? status : undefined;
};

const getExpandableProps = (
    recordStatus: number | undefined,
):
    | {
    expandedRowRender: (record: any) => JSX.Element;
    rowExpandable: (record: any) => boolean;
}
    | undefined => {
    if (!recordStatus) return undefined;

    return {
        expandedRowRender: (record: any) => (
            <div style={{ maxWidth: "80vw" }}>
                {record.statusDescription &&
                    record.statusDescription.split("\n").map((item: string) => (
                        <>
              <span
                  style={{
                      whiteSpace: "break-spaces",
                      wordBreak: "break-all",
                  }}
              >
                {item}
              </span>
                            <br />
                        </>
                    ))}
            </div>
        ),
        rowExpandable: (record: any) => record.status === recordStatus,
    };
};

const trimForm = (form: Record<any, any>) => {
    for (let field in form) {
        if (typeof form[field] === "string") {
            form[field] = form[field].trim();
        }
    }

    return form;
};

function getRightFormWord(value: number, wordForm: string[]) {
    value = Math.abs(value) % 100;
    let num = value % 10;
    if (value > 10 && value < 20) return wordForm[2];
    if (num > 1 && num < 5) return wordForm[1];
    if (num === 1) return wordForm[0];
    return wordForm[2];
}

const arrayMoveMutable = (array: any[], fromIndex: number, toIndex: number) => {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

        const [item] = array.splice(fromIndex, 1);
        array.splice(endIndex, 0, item);
    }
};

const arrayMoveImmutable = (
    array: any[],
    fromIndex: number,
    toIndex: number,
) => {
    const newArray = [...array];
    arrayMoveMutable(newArray, fromIndex, toIndex);
    return newArray;
};

/*const useGetTableSettings  = (tableName: tableSettingsNameT, title: string) => {
    const [currentSettings, setCurrentSettings] = useState<tableDataT>({
        title: "",
        tableName: "tableName",
        tableColumns: [],
    });
    useEffect(() => {
        getInitialSettings();
    }, [tableName]);

    const getInitialSettings = async () => {
        try {
            const { value, isSuccess } = await getColumnSettings(tableName);
            if (isSuccess && value && value.length) {
                setCurrentSettings({ title, tableName, tableColumns: value });
            } else {
                setCurrentSettings({
                    title,
                    tableName,
                    tableColumns: defTableSettings[tableName],
                });
            }
        } catch (err) {
            console.log(err);
            setCurrentSettings({
                title,
                tableName,
                tableColumns: defTableSettings[tableName],
            });
        }
    };
    const updateColumnStates = () => {
        getInitialSettings();
    };
    return { currentSettings, updateColumnStates };
};*/

const sendMessageToExtension = (message: string) => {
    window.postMessage({ type: "FROM_PAGE", text: message }, "*");
};

const sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const checkIfExternalAppLaunched = async () => {
    await sleep(500);
    return !document.hasFocus();
};

const calculateExpirationTime = (timeString: string | null) => {
    const HOURS_EXPIRATION_CLIENT_TOKEN = 10;

    if (!timeString) return null;

    return (
        moment(timeString).add(HOURS_EXPIRATION_CLIENT_TOKEN, "h").valueOf() -
        moment().valueOf() || null
    );
};

const getAvailableRoutes = (menus: UserMenu[] | undefined) => {
    const routes = new Set(["/", "/documents/signature-test"]);
    menus?.forEach((menuItem) => {
        if (menuItem.url) {
            routes.add(menuItem.url);
        }
        if (menuItem.items) {
            const innerItems = Array.from(getAvailableRoutes(menuItem.items));
            innerItems.forEach((item) => routes.add(item));
        }
    });
    return routes;
};

const isFailure = (res: {
    isSuccess: boolean;
    message: any;
    value: any;
    abort?: boolean;
}) => {
    return res?.message || !res?.isSuccess || !res?.value || res?.abort;
};

const rubToPennies = (rub: number) => Math.round(rub * 100);

const errorHandler = (err: any) => {
    if (err.message === "401") {
        window.location.replace("/login?expired");
    }
    return {
        ...err,
        message:
            err.message === "Failed to fetch"
                ? "Нет соединения с сервером"
                : err.message,
    };
};

const handleGetJson = (res: Response) => {
    return res.json();
};

export const handleError = (error: any, t: TFunction) => {
    if (error.message) {
        //ошибка от ЧЗ или бэка
        message.error(
            error.value?.errors ? error.value.errors.join(", ") : error.message,
        );
        return;
    }

    message.error(
        //ошибка при валидации формы
        error.errorFields?.[0]?.errors?.[0] ??
        //ошибка от бэка
        error?.value ??
        error?.result?.value ??
        capitalizeFirstLetter(t("anErrorOccurredOnTheServer")),
    );
};

export {
    handleGetJson,
    errorHandler,
    setCookie,
    token,
    getPropLocalStorage,
    setPropLocalStorage,
    removePropLocalStorage,
    fullCopyObject,
    toBase64,
    unificationSubName,
    getAvailableRoutes,
    saveFile,
    sendMessageToExtension,
    defaultSelection,
    defQueryParams,
    defUsersQueryParams,
    defEduDocumentsQueryParams,
    defLabelQueryParams,
    defDraftsQueryParams,
    defCodesQueryParams,
    defPostMarkingParams,
    createFiltersArr,
    createFilterObject,
    getDateInDeclNum,
    disabledDate,
    someRecordHaveStatus,
    getExpandableProps,
    trimForm,
    getRightFormWord,
    arrayMoveMutable,
    arrayMoveImmutable,
    //useGetTableSettings,
    checkIfExternalAppLaunched,
    calculateExpirationTime,
    isFailure,
    rubToPennies,
};
