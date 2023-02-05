import { url } from "../../constants/constants";
import {
    ColumnSettingsItemT,
    tableSettingsNameT,
} from "../../models/common-interfaces";
import {
    errorHandler,
    handleGetJson,
    token,
} from "../../utils/common.utils";

export const getColumnSettings = async (tableName: tableSettingsNameT) => {
    return await fetch(`${url}/settings/columns/${tableName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
        },
    })
        .then(handleGetJson)
        .then((res) => res)
        .catch(errorHandler);
};

export const getDefaultColumnSettings = async (
    tableName: tableSettingsNameT,
) => {
    return await fetch(`${url}/settings/columns/default/${tableName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
        },
    })
        .then(handleGetJson)
        .then((res) => res)
        .catch(errorHandler);
};

export const setColumnSettings = async (columns: ColumnSettingsItemT[]) => {
    return await fetch(`${url}/settings/columns`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(columns),
    })
        .then(handleGetJson)
        .then((res) => res)
        .catch(errorHandler);
};


