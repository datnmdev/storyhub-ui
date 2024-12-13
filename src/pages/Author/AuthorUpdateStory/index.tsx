import { useState, useEffect } from "react";
import styles from "./AuthorUpdateStory.module.scss";
import AuthorUpdatePrice from "./updatePrice";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import { Country, Genre, Story } from "../AllInterface/interface";
import { useLocation, useNavigate } from "react-router-dom";
import TextEditor from "@components/TextEditorforAuthor";
import paths from "@routers/router.path";
import { useSelector } from "react-redux";
import { AppRootState } from "@store/store.type";
const AuthorUpdateStory = () => {
    const uuid = uuidv4();
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState<string>("");
    const [aliasTitle, setAliasTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreResult, setGenreResult] = useState<number[]>([1]);
    const [countryId, setCountryId] = useState<number>(1);
    const [genreId, setGenreId] = useState<number>(1);
    const [type, setType] = useState<number>(1);
    const [status, setStatus] = useState<number>(0);
    const [showPrice, setShowPrice] = useState(false);
    const [amount, setAmount] = useState<string>("0");
    const [startTime, setStartTime] = useState<string>("");
    const [previewImgURL, setPreviewImgURL] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [file, setFile] = useState<string | null>(null);
    const { data: countryList } = useFetch<Country[]>(apis.countryApi.getCountryList);
    const { data: genreList } = useFetch<Genre[]>(apis.genreApi.getGenreList);
    const { story } = location.state as { story: Story };
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const webSocketService = useSelector((state: AppRootState) => state.webSocket.service);
    useEffect(() => {
        if (story) {
            setTitle(story.title);
            setAliasTitle(
                Array.isArray(story.aliases) ? story.aliases.map((alias) => alias.name).join(", ") : story.aliases
            );
            setDescription(story.description);
            setNotes(story.note);
            setCountryId(story.countryId);
            setType(story.type);
            setStatus(story.status);
            setGenreResult(story.genres.map((genre) => genre.id));
            setAmount(
                story?.prices && story?.prices.length > 0
                    ? story?.prices[story?.prices.length - 1]?.amount.toString()
                    : "0"
            );
            setStartTime(story?.prices?.[story?.prices?.length - 1]?.startTime ?? "");
            setPreviewImgURL(
                story?.coverImage.startsWith("/url-resolver")
                    ? `${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${story.coverImage}`
                    : story.coverImage
            );
        }
        if (Array.isArray(countryList) && Array.isArray(genreList)) {
            setCountries(countryList);
            setGenres(genreList);
        }
    }, [story, countryList, genreList]);
    const {
        data: uploadUrl,
        setRefetch: setUploadUrlRefetch,
        isLoading: isUploadingFile,
        error: uploadFileError,
    } = useFetch(
        apis.fileUploadApi.generateUrlUploadFileForStory,
        {
            body: {
                fileName,
                storyId: story?.id,
            },
        },
        false
    );
    const {
        data: updateStory,
        setRefetch: setUpdateStoryRefetch,
        error: updateStoryError,
        isLoading: isUpdatingStory,
    } = useFetch(
        apis.storyApi.updateStory,
        {
            body: {
                id: story?.id,
                title,
                description: description ? description : "",
                note: notes ? notes : "",
                type,
                status: status,
                countryId,
                authorId: profile?.id,
                ...(story.genres.length !== genreResult.length
                    ? {
                          genres: genreResult,
                      }
                    : {}),
                ...(aliasTitle !==
                (Array.isArray(story.aliases) ? story.aliases.map((alias) => alias.name).join(", ") : story.aliases)
                    ? {
                          alias: aliasTitle,
                      }
                    : {}),
                ...(story?.prices[story?.prices.length - 1]?.amount.toString() !== amount
                    ? {
                          price: {
                              amount: amount,
                              startTime: startTime,
                              storyId: story?.id,
                          },
                      }
                    : {}),
            },
        },
        false
    );

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
    const checkValid = () => {
        if (!title) {
            toast.error("Vui lòng nhập tên truyện.");
            return false;
        }
        if (!description) {
            toast.error("Vui lòng nhập mô tả.");
            return false;
        }
        if (!countryId) {
            toast.error("Vui lòng chọn quốc gia.");
            return false;
        }
        if (!genreId) {
            toast.error("Vui lòng chọn thể loại.");
            return false;
        }
        if (!file && !previewImgURL) {
            toast.error("Vui lòng chọn ảnh truyện.");
            return false;
        }
        if (!amount) {
            toast.error("Vui lòng điền giá truyện.");
            return false;
        }
        if (!startTime) {
            toast.error("Vui lòng chọn ngày áp dụng giá.");
            return false;
        }
        return true;
    };
    const handleGetGenre = (genreId: number) => {
        setGenreId(genreId);
        if (genreId && !genreResult.includes(genreId)) {
            setGenreResult([...genreResult, genreId]);
        }
    };

    const handleRemoveGenre = (id: number) => {
        setGenreResult(genreResult.filter((genreId) => genreId !== id));
    };

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

            navigate(paths.authorStoryDetail(story?.id.toString() ?? ""), { state: story?.id });
            toast.success("Cập nhật truyện thành công.");
        } else {
            throw new Error("Upload ảnh truyện thất bại.");
        }
    };

    useEffect(() => {
        const uploadAndUpdateStory = async () => {
            if (uploadUrl) {
                await uploadFile(uploadUrl as string);
            } else if (uploadFileError) {
                toast.error("Upload ảnh truyện thất bại.");
            }
        };
        uploadAndUpdateStory();
    }, [uploadUrl, uploadFileError]);

    const handleSubmit = async () => {
        if (!checkValid()) {
            return;
        }
        setUpdateStoryRefetch({ value: true });
    };

    useEffect(() => {
        if (updateStory) {
            file && setUploadUrlRefetch({ value: true });
            if (!file) {
                navigate(paths.authorStoryDetail(story?.id.toString() ?? ""), { state: story?.id });
                toast.success("Cập nhật truyện thành công.");
            }
        }
    }, [updateStory, updateStoryError]);
    return (
        <div className={styles.containerUpdateStory}>
            <span className={styles.titleUpdateStory}>Cập nhật truyện</span>
            <div className={styles.formContainer}>
                {/* Form Inputs */}
                <div className={styles.formFields}>
                    <label>
                        <span>Tên truyện:</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>
                        <span>Tên khác:</span>
                        <input type="text" value={aliasTitle} onChange={(e) => setAliasTitle(e.target.value)} />
                    </label>
                    <label>
                        <span>Loại truyện:</span>
                        <div
                            className={styles.radioGroup}
                            onChange={(e) => setType(Number((e.target as HTMLInputElement).value))}
                        >
                            <label>
                                <input type="radio" name="type" value="1" defaultChecked={type === 1} /> Truyện tranh
                            </label>
                            <label>
                                <input type="radio" name="type" value="0" defaultChecked={type === 0} /> Truyện chữ
                            </label>
                        </div>
                    </label>
                    <label>
                        <span>Tóm tắt nội dung:</span>
                        <TextEditor
                            value={description}
                            height={240}
                            placeholder="Nhập tóm tắt nội dung"
                            disabled={false}
                            onChange={(value) => setDescription(value)}
                        />
                    </label>
                    <label>
                        <span>Ghi chú:</span>
                        <TextEditor
                            value={notes}
                            height={240}
                            placeholder="Nhập ghi chú"
                            disabled={false}
                            onChange={(value) => setNotes(value)}
                        />
                    </label>
                    <label>
                        <span>Quốc gia:</span>
                        <select value={countryId} onChange={(e) => setCountryId(Number(e.target.value))}>
                            {countries?.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Trạng thái:</span>
                        <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                            {story.status === 0 && <option value="0">Chưa phát hành</option>}
                            {story.status === 2 && <option value="2">Phát hành</option>}
                            {story.status !== 0 && <option value="4">Hoàn thành</option>}
                            {story.status === 0 && <option value="6">Xóa</option>}
                        </select>
                    </label>
                    <label>
                        <span>Thể loại:</span>
                        <select value={genreId} onChange={(e) => handleGetGenre(Number(e.target.value))}>
                            {genres?.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className={styles.genreList}>
                        {genres
                            .filter((genre) => genreResult.includes(genre.id))
                            .map((genre) => (
                                <span key={`${genre.id}-${genre.name}`} className={styles.genreItem}>
                                    {genre.name}
                                    <button className={styles.removeGenre} onClick={() => handleRemoveGenre(genre.id)}>
                                        &times;
                                    </button>
                                </span>
                            ))}
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={styles.btnPrimary} disabled={isUpdatingStory} onClick={handleSubmit}>
                            Lưu
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className={styles.imageContainer}>
                    <input id="previewImg" type="file" hidden onChange={(event) => handleOnchangeImg(event)} />
                    <img
                        className={styles.imageUpdateStory}
                        onClick={() => document.getElementById("previewImg")?.click()}
                        style={{ backgroundImage: `url(${previewImgURL})` }}
                    />

                    <span>giá: {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    <button className={styles.btnSuccess} onClick={() => setShowPrice(true)}>
                        Cập nhật giá
                    </button>
                </div>
                <AuthorUpdatePrice
                    isOpen={showPrice}
                    onClose={() => setShowPrice(false)}
                    amount={amount}
                    setAmount={setAmount}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    storyId={story?.id ?? 0}
                />
            </div>
        </div>
    );
};

export default AuthorUpdateStory;
