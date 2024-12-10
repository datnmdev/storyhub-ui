import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import styles from "./AuthorCreatePrice.module.scss";
interface AuthorModalCreatePriceProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    setAmount: (amount: string) => void;
    startTime: string;
    setStartTime: (startTime: string) => void;
}
const AuthorCreatePrice = ({
    isOpen,
    onClose,
    amount,
    setAmount,
    startTime,
    setStartTime,
}: AuthorModalCreatePriceProps) => {
    const handleOnClickDate = (date: Date) => {
        setStartTime(moment(date).format("YYYY-MM-DD HH:mm:ss"));
    };

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
        toast.success("Tạo giá thành công.");
    };

    return (
        <div className={styles.modalUpdatePrice}>
            <header className={styles.modalHeaderUpdatePrice}>
                <span className={styles.customHeader}>Tạo giá</span>
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
                    onChange={(date) => date && handleOnClickDate(date)}
                    minDate={new Date(Date.now())}
                />
            </div>
            <button className={styles.btnSuccess} onClick={handleSubmit}>
                Lưu
            </button>
        </div>
    );
};

export default AuthorCreatePrice;
