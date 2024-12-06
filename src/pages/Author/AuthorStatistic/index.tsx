import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./AuthorStatistic.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "features/auth";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
const AuthorStatistic: React.FC = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [type, setType] = useState<number>(0);

    const profile = useAppSelector(authFeature.authSelector.selectUser);

    const { data: totalRevenueByTime, setRefetch: setRefetchTotalRevenueByTime } = useFetch<any[]>(
        apis.statisticApi.getAllRevenueByTime,
        {
            queries: {
                authorId: profile?.id,
                type: type,
                startDate,
                endDate,
            },
        },
        false
    );

    useEffect(() => {
        if (profile) {
            setRefetchTotalRevenueByTime({ value: true });
        }
    }, [profile]);

    const handleDate = (date: Date, type: number) => {
        if (type == 1) {
            setStartDate(moment(date).format("YYYY-MM-DD HH:mm:ss"));
        } else {
            setEndDate(moment(date).format("YYYY-MM-DD HH:mm:ss"));
        }
    };
    const handleCheckData = () => {
        if (!startDate) {
            toast.error("Vui lòng chọn thời gian bắt đầu thống kê.");
            return false;
        }
        if (!endDate) {
            toast.error("Vui lòng chọn thời gian kết thúc thống kê.");
            return false;
        }
        if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
            toast.error("Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu.");
            return false;
        }
        return true;
    };
    const handleStatistic = () => {
        if (!handleCheckData()) return;
        setRefetchTotalRevenueByTime({ value: true });
    };

    // Sample data for the chart
    const options = {
        title: {
            //text: 'Thống kê Doanh thu và Tác giá nhận được',
            text: "Thống kê danh thu theo thời gian",
        },
        xAxis: {
            categories: totalRevenueByTime
                ? totalRevenueByTime.map((item: any) => moment(item.createdAt).format("DD/MM/YYYY"))
                : [],
        },
        yAxis: {
            title: {
                text: "Giá trị (VNĐ)",
            },
        },
        series: [
            {
                name: "Tổng doanh thu",
                data: totalRevenueByTime ? totalRevenueByTime.map((item: any) => item.totalAmount) : [],
                type: "column",
            },
        ],
    };

    return (
        <div className={styles.containerStatistic}>
            <span className={styles.statisticTitle}>Thống kê</span>
            <div className={styles.bodytop}>
                <div className={styles.filtersType}>
                    <span className={styles.customType} style={{ fontWeight: "400" }}>
                        {" "}
                        Loại thời gian
                    </span>
                    <select
                        value={type}
                        onChange={(e) => setType(Number(e.target.value))}
                        className={styles.customSelect}
                    >
                        <option value="0">Thống kê theo ngày</option>
                        <option value="1">Thống kê theo tháng</option>
                        <option value="2">Thống kê theo năm</option>
                    </select>
                </div>
                <div className={styles.customDate}>
                    <span style={{ fontWeight: "400" }}>Thời gian bắt đầu</span>
                    <DatePicker
                        selected={startDate ? new Date(startDate) : undefined}
                        onChange={(date) => date && handleDate(date, 1)}
                        className="form-control ml-8"
                        minDate={new Date("2020-01-01 00:00:00")}
                        maxDate={new Date(Date.now())}
                    />
                    <span style={{ fontWeight: "400", paddingLeft: "50px" }}>Thời gian kết thúc</span>
                    <DatePicker
                        selected={endDate ? new Date(endDate) : undefined}
                        onChange={(date) => date && handleDate(date, 2)}
                        className="form-control ml-8"
                        minDate={new Date("2020-01-01 00:00:00")}
                        maxDate={new Date(Date.now())}
                    />
                </div>
                <div>
                    <button className="btn btn-success" onClick={handleStatistic}>
                        Thống kê ngay
                    </button>
                </div>
            </div>

            {/* <div className={styles.statistics}>
                <div className={styles.totalRevenue}>
                    <h2>Tổng doanh thu</h2>
                    <p>12,000,000,000</p>
                </div>
                <div className={styles.totalReceived}>
                    <h2>Tác giá nhận được</h2>
                    <p>8,600,000,000</p>
                </div>
            </div> */}
            <div className={styles.chart}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
};

export default AuthorStatistic;
