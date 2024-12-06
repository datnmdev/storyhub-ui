import React, { useEffect, useState } from "react";
import styles from "./ModeratorProfile.module.scss";
import DefaultAvatar from "@assets/avatars/user-default.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { User } from "@features/auth/auth.type";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Gender } from "@constants/auth.constants";
const ModeratorProfile: React.FC = () => {
    const uuid = uuidv4();
    const dispatch = useAppDispatch();
    const [fullName, setFullName] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [gender, setGender] = useState<Gender | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [previewImgURL, setPreviewImgURL] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [file, setFile] = useState<string | null>(null);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const {
        data: updateProfile,
        setRefetch: setUpdateProfileRefetch,
        error: updateProfileError,
        isLoading: isUpdatingProfile,
    } = useFetch<User>(
        apis.userApi.updateProfile,
        {
            body: {
                id: profile?.id,
                name: fullName,
                dob: birthDate,
                gender: gender,
                phone: phone,
                avatar: file ? `user/${profile?.id}/${fileName}` : profile?.avatar,
            },
        },
        false
    );

    const {
        data: uploadUrlUser,
        setRefetch: setUploadUrlUserRefetch,
        isLoading: isUploadingFileUser,
        error: uploadFileErrorUser,
    } = useFetch(
        apis.fileUploadApi.generateUrlUploadFileForProfile,
        {
            body: {
                userId: profile?.id,
                fileName: fileName,
            },
        },
        false
    );

    useEffect(() => {
        if (profile !== null) {
            setFullName(profile.name);
            setBirthDate(profile.dob);
            setGender(profile.gender ?? 0);
            setPhone(profile.phone);
            setPreviewImgURL(
                profile?.avatar
                    ? `https://s3bucket2024aws.s3.ap-southeast-1.amazonaws.com/${profile.avatar}`
                    : DefaultAvatar
            );
        }
    }, [profile]);

    const uploadFile = async (url: string) => {
        const uploadResult = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": fileType,
            },
            body: file,
        });
        if (uploadResult.ok) {
            console.log("Uploaded File:", uploadResult);
            setUpdateProfileRefetch({ value: true });
        } else {
            throw new Error("Upload ảnh truyện thất bại.");
        }
    };

    useEffect(() => {
        const uploadAndUpdateStory = async () => {
            if (uploadUrlUser) {
                await uploadFile(uploadUrlUser as string);
            } else if (uploadFileErrorUser) {
                toast.error("Upload ảnh truyện thất bại.");
            }
        };
        uploadAndUpdateStory();
    }, [uploadUrlUser, uploadFileErrorUser]);

    const handleOnchangeImg = async (event: any) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = window.URL.createObjectURL(file);
            setPreviewImgURL(objectUrl);
            setFileName(`${uuid}.${file.type.split("/")[1]}`);
            setFileType(file.type.split("/")[1]);
            setFile(file);
        }
    };

    const handleValidate = () => {
        if (!fullName) {
            toast.error("Họ và tên không được để trống");
            return false;
        }
        return true;
    };
    const handleOnClickDate = (date: Date) => {
        setBirthDate(date);
    };
    const handleUpdateProfile = () => {
        if (!handleValidate()) {
            return;
        }
        file && setUploadUrlUserRefetch({ value: true });
        !file && setUpdateProfileRefetch({ value: true });
    };

    useEffect(() => {
        if (updateProfile) {
            dispatch(authFeature.authAction.setUser(updateProfile));
            toast.success("Cập nhật hồ sơ thành công.");
        }
    }, [updateProfile]);
    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileTitle}>Hồ sơ cá nhân</h1>
            <div className={styles.profileCard}>
                <div className={styles.avatarSection}>
                    <input id="previewImg" type="file" hidden onChange={(event) => handleOnchangeImg(event)} />
                    <img src={previewImgURL || ""} alt="Avatar" className={styles.avatar} />
                    <button className="btn btn-success" onClick={() => document.getElementById("previewImg")?.click()}>
                        Thay đổi
                    </button>
                    <p className={styles.avatarNote}>Ảnh định dạng PNG, JPG, JPEG hoặc GIF</p>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formRow}>
                        <label className={styles.formLabel}>Họ và tên</label>
                        <input
                            type="text"
                            value={fullName ?? ""}
                            onChange={(e) => setFullName(e.target.value)}
                            className={styles.inputField}
                        />
                        <label className={styles.formLabel} style={{ marginLeft: "20px" }}>
                            Ngày sinh
                        </label>
                        <DatePicker
                            selected={birthDate ? new Date(birthDate) : undefined}
                            onChange={(date) => date && handleOnClickDate(date)}
                            className={styles.customDatePickerUser}
                            maxDate={new Date(Date.now())}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.formLabel}>Giới tính</label>
                        <select
                            value={gender ? gender : ""}
                            onChange={(e) => setGender(Number(e.target.value))}
                            className={styles.inputField}
                        >
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                            <option value="2">Khác</option>
                        </select>
                        <label className={styles.formLabel} style={{ marginLeft: "20px" }}>
                            Số điện thoại
                        </label>
                        <input
                            type="number"
                            value={phone ?? ""}
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-success"
                    style={{ float: "right" }}
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    );
};

export default ModeratorProfile;
