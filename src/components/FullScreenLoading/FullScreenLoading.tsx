import { Spin } from "antd";

const FullScreenLoading: React.FC = () => {
    return (
        <div className="loading-page flex-row --row-center">
            <Spin size="large" />
        </div>
    );
};

export default FullScreenLoading;
