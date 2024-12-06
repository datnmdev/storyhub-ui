import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
        <Modal show={isOpen} onHide={onClose} animation={false} backdrop="static" centered>
            <Modal.Header closeButton onClick={() => checkValid()}>
                <Modal.Title>Tạo giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group style={{ marginBottom: "10px" }}>
                        <Form.Label>Giá truyện/chương</Form.Label>
                        <Form.Control
                            type="text"
                            value={amount}
                            onChange={(e) => handleUpdatePrice(e.target.value)}
                            placeholder="Giá truyện/chương"
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "10px" }}>
                        <Form.Label>Ngày áp dụng</Form.Label>
                        <br />
                        <DatePicker
                            className="form-control"
                            selected={startTime ? new Date(startTime) : undefined}
                            onChange={(date) => date && handleOnClickDate(date)}
                            minDate={new Date(Date.now())}
                        />
                    </Form.Group>
                </Form>
                <div style={{ textAlign: "right" }}>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AuthorCreatePrice;
