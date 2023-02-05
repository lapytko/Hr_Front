import { defTableSettings } from "../constants/tableDefaultParameters";


interface UserFunction {}

interface UserMenu {
    id: string;
    name: string;
    position: number;
    title: string;
    url: string | null;
    items: UserMenu[] | null;
    iconSource: string;
}

interface UserRole {
    id: string;
    name: string;
    description: string | null;
    normalizedName: string;
}

interface counterData {
    url: string;
    count: number;
}

interface User {
    fio: string;
    id: string;
    lastUserIdChangePassword: string | null;
    userName: string;
    email: string | null;
    name: string | null;
    middle: string | null;
    surname: string | null;
    description: string | null;
    canChange: boolean;
    canUnloadOrders: boolean;
    functions: UserFunction;
    menus: UserMenu[];
    roles: UserRole[];
    isMobile: boolean;
}

interface UserCardData {
    visible: boolean;
    userId: string;
}

interface IAuthContext {
    user: User | null;
    loading: boolean;
    err: any;
    logIn: ((userName: string, password: string) => Promise<void>) | undefined;
    logOut: () => void;
}
    interface queryParamsT {
    offset: number;
    limit: number;
    sort: { dir: sortDirT; field: string }[];
    filter: { logic: logicT; filters: filterObjectT[] } | {};
    isSync?: boolean;
    groupId?: null | string;
}

interface filterObjectT {
    logic: logicT;
    filters: fieldFilterObject[];
}

interface fieldFilterObject {
    field: string;
    value: string | number | boolean;
    operator: operatorT;
}

type operatorT = "=" | "contains" | ">=" | "=<" | ">" | "<";

type logicT = "and" | "or";

type sortDirT = "asc" | "desc";

interface TemplateForSelect {
    id: string;
    name: string;
    isDefault: boolean;
}

interface SearchProps {
    column: string;
    text: string;
}

interface ResponseDataObj<T> {
    data: T;
    loading: boolean;
}

export type infoFieldT =
    | {
    title: string;
    value: string;
}
    | {
    title: string;
    value: string;
}[][]
    | undefined;

export interface infoSectionT {
    innerArrayLabel?: string;
    title?: string;
    fields: infoFieldT[];
}

interface OnTableChange {
    (pagination: any, filters: any, sorter: any, extra: any): void;
}

interface ColumnSettingsItemT {
    id?: string;
    tableName?: tableSettingsNameT;
    index?: number;
    columnName: string;
    title: string;
    isHidden?: boolean;
    canBeHidden?: boolean;
}

type tableSettingsNameT = keyof typeof defTableSettings;
interface tableDataT {
    tableColumns: ColumnSettingsItemT[];
    title: string;
    tableName: tableSettingsNameT;
}

interface TableData<T> {
    count: number;
    items: T[];
}

export type {
    TableData,
    counterData,
    queryParamsT,
    IAuthContext,
    User,
    UserCardData,
    UserRole,
    UserFunction,
    UserMenu,
    SearchProps,
    ResponseDataObj,
    OnTableChange,
    TemplateForSelect,
    ColumnSettingsItemT,
    tableSettingsNameT,
    tableDataT,
};
