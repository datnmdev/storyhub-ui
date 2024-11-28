// src/pages/Author/AuthorUpdatePrice/index.tsx
import React, { useEffect, useState } from "react";
import styles from "./AuthorUpdatePrice.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { toast } from "react-toastify";
import { Price } from "../AllInterface/interface";

interface AuthorModalUpdatePriceProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    setAmount: (amount: string) => void;
    startTime: string;
    setStartTime: (startTime: string) => void;
}
const AuthorUpdatePrice: React.FC<AuthorModalUpdatePriceProps> = ({
    isOpen,
    onClose,
    amount,
    setAmount,
    startTime,
    setStartTime,
}) => {
    const [priceList, setPriceList] = useState<Price[]>([]);
    const { data: list } = useFetch<Price[]>(apis.priceApi.getAllPrices, {
        // queries: {
        //     storyId: storyId,
        // },
    });
    const handleOnClickDate = (date: Date) => {
        setStartTime(moment(date).format("YYYY-MM-DD"));
    };

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
        return true;
    };

    const handleUpdatePrice = (value: string) => {
        setAmount(value.replace(/\D/g, "").substring(0, 18).replace(/^0+/, ""));
    };
    const handleSubmit = () => {
        if (!checkValid()) return;
        onClose();
        toast.success("Cập nhật giá thành công.");
    };

    return (
        <div className={styles.modalUpdatePrice}>
            <header className={styles.modalHeaderUpdatePrice}>
                <h2>Cập nhật giá</h2>
                <button className={styles.closeButton} onClick={onClose}>
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
                    onChange={(date) => {
                        if (date) {
                            handleOnClickDate(date);
                        }
                    }}
                    minDate={new Date(Date.now())}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Lưu
            </button>
            <h3>Danh sách giá</h3>
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
                            <td>{entry.startTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorUpdatePrice;
