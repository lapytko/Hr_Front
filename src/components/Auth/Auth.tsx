import {
    useState,
    useEffect,
    createContext,
    useContext,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import {
    token,
        setCookie,
        setPropLocalStorage,
        removePropLocalStorage,
} from "../../utils/common.utils";
import { loginRequest, tokenExist } from "../../services/auth/auth.services";

import {
    IAuthContext,
    User,
} from "../../models/common-interfaces";

import { message, Modal } from "antd";
import {tokenName} from "../../constants/constants";

const AuthContext = createContext<IAuthContext>({
    user: null,
    loading: true,
    err: "",
    logIn: undefined,
    logOut: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = (props: any) => {
    //TODO: минимизировать обновления состояния
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const history = useNavigate();

    useEffect(() => {
        if (token()) {
            const getUser = async () => {
                try {
                    const { user } = await tokenExist(
                        token(),
                        history
                    );

                    setUser(user);
                    setLoading(false);
                } catch (err: any) {
                    message.error(err);
                }
            };
            getUser();
        } else setLoading(false);
    }, [history]);

    const logIn = useCallback(
        async (username: string, password: string) => {
            const resLogin = await loginRequest(username, password);

            if (!resLogin) {
                setErr("Ошибка авторизации, возможно проблема с сервером");
                history("/login");
            } else {
                const { user, status, statusCode, message: mes } = resLogin;

               /* if (!license.isValid) {
                    setErr("Закончился срок действия лицензии");
                    setCookie(tokenName, "", {
                        "max-age": -1,
                    });
                    return;
                }*/

                const validStatus = user?.isMobile ? 401 : statusCode || status;

                if (validStatus || !user) {
                    switch (validStatus) {
                        case 401: {
                            setErr(mes || "Неправильное имя пользователя или пароль");
                            break;
                        }
                        case 500: {
                            setErr(mes || "Внутренняя ошибка сервера");
                            break;
                        }
                        default: {
                            validStatus
                                ? setErr(
                                    `Ошибка ${validStatus}: ${mes || "Неизвестная ошибка"}`,
                                )
                                : setErr(mes || "Неизвестная ошибка");
                            break;
                        }
                    }
                } else {
                   /* license?.warning &&
                    Modal.warning({
                        title: "Внимание!",
                        content: license.warning,
                    });*/
                    setUser(user);
                    setErr("");
                    history("/");
                }
            }
        },
        [history],
    );

    const logOut = useCallback(() => {
        setCookie(tokenName, "", {
            "max-age": -1,
        });
        setUser(null);
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                logIn,
                logOut,
                loading,
                err
            }}
            {...props}
        />
    );
};

export { AuthProvider, useAuth, AuthContext };
