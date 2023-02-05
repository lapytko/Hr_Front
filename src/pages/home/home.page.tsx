import {useEffect, useState} from "react";

//import * as styles from "./home.module.scss";
import { Col, message, Progress, Row, Skeleton } from "antd";
import { PieChart } from "bizcharts";
import { useAuth } from "../../components/Auth/Auth"
import { useTranslation } from "react-i18next";
import { isFailure } from "../../utils/common.utils";

import { url, tokenName } from "../../constants/constants";

const HomePage = () => {
    const {} = useAuth();
    const { t } = useTranslation();

    return (
        <>
       {/*<div className={`${styles.wrapper}`}>
                <Row justify="center" className={`${styles.row} `}>
                    <Col className={styles.col} style={{ width: "100%" }}>
                        <p className={styles.heading}>Причины вывода из оборота</p>
                    </Col>
                </Row>
            </div>*/}
        </>
    );
};

export default HomePage;
