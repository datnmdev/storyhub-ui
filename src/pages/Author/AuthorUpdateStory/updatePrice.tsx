import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { toast } from "react-toastify";
import { Price } from "../AllInterface/interface";
import styles from "./AuthorUpdatePrice.module.scss";
interface AuthorModalUpdatePriceProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    setAmount: (amount: string) => void;
    startTime: string;
    setStartTime: (startTime: string) => void;
    storyId: number;
}
const AuthorUpdatePrice = ({
    isOpen,
    onClose,
    amount,
    setAmount,
    startTime,
    setStartTime,
    storyId,
}: AuthorModalUpdatePriceProps) => {
    const [priceList, setPriceList] = useState<Price[]>([]);
    const { data: list, setRefetch: setRefetchList } = useFetch<Price[]>(
        apis.priceApi.getAllPrices,
        {
            queries: {
                storyId: storyId,
            },
        },
        false
    );

    const handleOnClickDate = (date: Date) => {
        setStartTime(moment(date).format("YYYY-MM-DD HH:mm:ss"));
        console.log("startTime", startTime);
    };

    useEffect(() => {
        if (storyId !== 0) {
            setRefetchList({ value: true });
        }
    }, [storyId]);

    useEffect(() => {
        if (list) {
            setPriceList(list);
        }
    }, [list]);
    if (!isOpen) return null;
    const checkValid = () => {
        if (!amount) {
            toast.error("Vui lòng điền giá.");
            return false;
        }
        if (!startTime) {
            toast.error("Vui lòng chọn ngày áp dụng.");
            return false;
        }
        onClose();
        return true;
    };

    const handleUpdatePrice = (value: string) => {
        setAmount(value.replace(/\D/g, "").substring(0, 18).replace(/^0+/, ""));
    };
    const handleSubmit = () => {
        if (!checkValid()) return;

        toast.success("Tạo giá mới thành công.");
    };

    return (
        <div className={styles.modalUpdatePrice}>
            <header className={styles.modalHeaderUpdatePrice}>
                <span className={styles.customHeader}>Cập nhật giá</span>
                <button className={styles.closeButton} onClick={() => checkValid()}>
                    &times;
                </button>
            </header>
            <div className={styles.formGroup}>
                <label>Giá truyện/chương</label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => handleUpdatePrice(e.target.value)}
                    placeholder="Giá truyện/chương"
                />
            </div>
            <div className={styles.formGroup}>
                <label>Ngày áp dụng</label>
                <DatePicker
                    className="form-control"
                    selected={startTime ? new Date(startTime) : null}
                    onChange={(date) => date && handleOnClickDate(date)}
                    minDate={new Date(Date.now())}
                />
            </div>
            <button className={styles.btnSuccess} onClick={handleSubmit}>
                Lưu
            </button>

            <h3>Danh sách giá</h3>
            <div className={styles.customTable}>
                <table className={styles.priceTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Giá</th>
                            <th>Ngày áp dụng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceList.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.amount}</td>
                                <td>{moment(entry.startTime).format("DD/MM/YYYY HH:mm:ss")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuthorUpdatePrice;
