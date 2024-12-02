import React, { useState } from "react";
import styles from "./AuthorProfile.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
const AuthorProfile: React.FC = () => {
    const [fullName, setFullName] = useState("Trần Đức Bể");
    const [birthDate, setBirthDate] = useState("01/01/2002");
    const [gender, setGender] = useState("Nam");
    const [phone, setPhone] = useState("035405043");

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileTitle}>Hồ sơ cá nhân</h1>
            <div className={styles.profileCard}>
                <div className={styles.avatarSection}>
                    <img
                        src="https://via.placeholder.com/100" // Thay bằng link hình ảnh của bạn
                        alt="Avatar"
                        className={styles.avatar}
                    />
                    <button className="btn btn-success">Thay đổi</button>
                    <p className={styles.avatarNote}>
                        Ảnh không được quá 10 MB và ở định dạng PNG, JPG, JPEG hoặc GIF
                    </p>
                </div>
                <div className={styles.formGroup}>
                    <label>
                        Họ và tên
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={styles.inputField}
                        />
                    </label>
                    <label>
                        Ngày sinh
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className={styles.inputField}
                        />
                    </label>
                    <label>
                        Giới tính
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className={styles.inputField}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </label>
                    <label>
                        Số điện thoại
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.inputField}
                        />
                    </label>
                </div>
                <button className="btn btn-success">Cập nhật</button>
            </div>
        </div>
    );
};

export default AuthorProfile;