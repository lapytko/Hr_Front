import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { message } from "antd";
import { ResponseDataObj } from "../models/common-interfaces";
import doApiRequest from "../services/documents/doApiRequest";
import { isFailure } from "../utils/common.utils";

interface GlobalSetting {
    id: string;
    key: string;
    name: string;
    value: string;
}

export interface NormalizedGlobalSettings {
    email?: string;
    smptServer?: string;
    password?: string;
    port?: string;
}

interface GlobalCtx {
    normalizedGlobalSettings: NormalizedGlobalSettings | null;
    globalSettings: GlobalSetting[] | null;
    loading: boolean;
    editGlobalSettings: (
        settings: GlobalSetting[],
        vals: Record<string, string>,
    ) => void;
    getGlobalSettings: () => void;
}

const Ctx = createContext<GlobalCtx>({} as GlobalCtx);

const initialData = {
    data: {
        normalizedGlobalSettings: null,
        globalSettings: null,
    },
    loading: false,
};

export function GlobalSettingProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}): JSX.Element {
    const [data, setData] = useState<
        ResponseDataObj<{
            normalizedGlobalSettings: NormalizedGlobalSettings | null;
            globalSettings: GlobalSetting[] | null;
        }>
    >(initialData);

    const getGlobalSettings = useCallback(async () => {
        setData({ ...initialData, loading: true });

        const res = await doApiRequest("/global-settings", "GET");

        if (!res?.isSuccess) {
            message.error(res.message || "global_settings_error");
            setData({ ...initialData });
        } else {
            const normalizedGlobalSettings = res.value.reduce(
                (res: any, item: GlobalSetting) => {
                    if (item.value && Object.keys(res).find((key) => key === item.key)) {
                        res[item.key] = item.value;
                    }
                    return res;
                },
                {
                    email: undefined,
                    smptServer: undefined,
                    password: undefined,
                    port: undefined,
                } as any,
            );
            setData({
                data: {
                    normalizedGlobalSettings,
                    globalSettings: res.value,
                },
                loading: false,
            });
        }
    }, []);

    useEffect(() => {
        getGlobalSettings();
    }, [getGlobalSettings]);

    const editGlobalSettings = async (
        settings: GlobalSetting[],
        vals: Record<string, string | number>,
    ) => {
        setData((data) => ({ ...data, loading: true }));

        if (vals.email) {
            const { email, smptServer, password, port } = vals;
            const checkEmailRes = await doApiRequest("/email/test", "POST", {
                email,
                smptServer,
                password,
                port,
            });

            if (!checkEmailRes?.value) {
                message.error(
                    `Ошибка в почтовый данных ` + checkEmailRes.message || "",
                );
                setData((data) => ({ ...data, loading: false }));
                return;
            }
        }

        const res = await doApiRequest("/global-settings", "POST", settings);

        if (isFailure(res)) {
            message.error(res.message || "global_settings_error");
            setData((data) => ({ ...data, loading: false }));
        } else {
            message.success("Новые настройки успешно сохранились");
            getGlobalSettings();
        }
    };

    const {
        data: { normalizedGlobalSettings, globalSettings },
        loading,
    } = data;
    return (
        <Ctx.Provider
            value={{
                normalizedGlobalSettings,
                globalSettings,
                loading,
                editGlobalSettings,
                getGlobalSettings,
            }}
        >
            {children}
        </Ctx.Provider>
    );
}

export default function useGlobalSettingsProvider() {
    return useContext(Ctx);
}
