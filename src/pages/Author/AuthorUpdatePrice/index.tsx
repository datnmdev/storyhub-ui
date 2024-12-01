import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { toast } from "react-toastify";
import { Price } from "../AllInterface/interface";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface AuthorModalUpdatePriceProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    setAmount: (amount: string) => void;
    startTime: string;
    setStartTime: (startTime: string) => void;
}
const AuthorUpdatePrice = ({
    isOpen,
    onClose,
    amount,
    setAmount,
    startTime,
    setStartTime,
}: AuthorModalUpdatePriceProps) => {
    const [priceList, setPriceList] = useState<Price[]>([]);
    const { data: list, setRefetch: setRefetchList } = useFetch<Price[]>(
        apis.priceApi.getAllPrices,
        {
            // queries: {
            //     storyId: storyId,
            // },
        },
        false
    );
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
        <Modal show={isOpen} onHide={onClose} animation={false} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật giá</Modal.Title>
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
                            selected={startTime ? new Date(startTime) : null}
                            onChange={(date) => {
                                if (date) {
                                    handleOnClickDate(date);
                                }
                            }}
                            minDate={new Date(Date.now())}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu
                </Button>
                <h3>Danh sách giá</h3>
                <Table striped bordered hover>
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
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default AuthorUpdatePrice;
