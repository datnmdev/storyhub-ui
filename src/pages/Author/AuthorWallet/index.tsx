import React from "react";
import styles from "./AuthorWallet.module.scss";
const AuthorWallet: React.FC = () => {
    return (
        <div className={styles.walletContainer}>
            <div className={styles.leftPanel}>
                <h1 className={styles.walletTitle}>Ví tiền của tôi</h1>
                <div className={styles.balanceSection}>
                    <span className={styles.balanceLabel}>Số dư khả dụng</span>
                    <span className={styles.balanceAmount}>10.000 đ</span>
                </div>
                <div className={styles.transactionHistory}>
                    <h2 className={styles.historyTitle}>Lịch sử giao dịch</h2>
                    <ul className={styles.historyList}>
                        <li>Rút tiền: 1.000 đ - 01/01/2023</li>
                        <li>Gửi tiền: 5.000 đ - 02/01/2023</li>
                        <li>Rút tiền: 2.000 đ - 03/01/2023</li>
                    </ul>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.accountInfo}>
                    <h2 className={styles.accountInfoTitle}>Thông tin tài khoản</h2>
                    <label>
                        Ngân hàng
                        <input type="text" defaultValue="ABC" className={styles.inputField} />
                    </label>
                    <label>
                        Số tài khoản
                        <input type="text" defaultValue="**** **** **** 1234" className={styles.inputField} />
                    </label>
                    <label>
                        Chủ sở hữu
                        <input type="text" defaultValue="Trần Đức Bể" className={styles.inputField} />
                    </label>
                </div>
                <button className={styles.btnSuccess}>Cập nhật tài khoản</button>
            </div>
        </div>
    );
};

export default AuthorWallet;
