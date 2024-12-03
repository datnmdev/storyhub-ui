import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import WhiteCoinIcon from "@assets/icons/static/white-coin.png";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { StarBorderRounded, StarRounded } from "@mui/icons-material";
import IconButton from "@components/IconButton";
import SpeakerIcon from "@assets/icons/static/speaker.png";
import useFetchAll from "@hooks/fetchAll.hook";
import apis from "@apis/index";
import UrlUtils from "@utilities/url.util";
import { StoryStatus, StoryType } from "@constants/story.constants";
import NumberUtils from "@utilities/number.util";
import useFetch from "@hooks/fetch.hook";
import { Story } from "@pages/ReaderHomePage/components/NewUpdateStorySection/NewUpdateStorySection.type";

function StoryInfoSection() {
    const { t } = useTranslation();
    const { storyId } = useParams();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const { data: storyData } = useFetch<[Story[], number]>(apis.storyApi.getStoryWithFilter, {
        queries: {
            page: 1,
            limit: 1,
            storyId
        }
    })
    const { data, setRefetch } = useFetchAll([
        [
            apis.storyApi.getStoryWithFilter,
            {
                queries: {
                    page: 1,
                    limit: 1,
                    id: storyId
                }
            }
        ],
        [
            apis.priceApi.getCurrentPrice,
            {
                queries: {
                    storyId
                }
            }
        ],
        [
            apis.aliasApi.getAliasByStoryId,
            {
                queries: {
                    storyId
                }
            }
        ],
        [
            apis.authorApi.getAuthorById,
            {
                params: {
                    authorId: storyData?.[0][0].authorId
                }
            }
        ],
        [
            apis.followApi.getFollowerCount,
            {
                queries: {
                    storyId
                }
            }
        ],
        [
            apis.viewApi.getViewCountOfStory,
            {
                params: {
                    storyId
                }
            }
        ],
        [
            apis.countryApi.getCountryById,
            {
                params: {
                    countryId: storyData?.[0][0].countryId
                }
            }
        ],
        [
            apis.ratingApi.getRatingSummary,
            {
                queries: {
                    storyId
                }
            }
        ],
        [
            apis.storyApi.getGenres,
            {
                queries: {
                    storyId
                }
            }
        ]
    ], false);

    useEffect(() => {
        if (storyData) {
            setRefetch({
                value: true
            })
        }
    }, [storyData])

    if (data) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-start space-x-4">
                    <div>
                        <img
                            className={classNames(
                                "w-[220px] h-[340px] object-cover object-center rounded-[4px]",
                                themeValue === "light" ? "light__boxShadow" : "dark__boxShadow"
                            )}
                            src={UrlUtils.generateUrl(data[0][0][0].coverImage)}
                            alt="Cover Image"
                        />
                    </div>

                    <div className="grow">
                        <div>
                            <h3 className="text-[1.4rem] font-[450]">{data[0][0][0].title}</h3>
                        </div>

                        <div className="flex items-stretch mt-2 space-x-2">
                            <div className="bg-red-500 px-3 py-1.5 text-[var(--white)] rounded-[8px] border-[1px] border-solid border-red-500">
                                {data[0][0][0].type === StoryType.COMIC ? t("reader.storyInfoPage.storyInfoSection.storyType.comic") : t("reader.storyInfoPage.storyInfoSection.storyType.novel")}
                            </div>

                            <div
                                className={classNames(
                                    "bg-black px-3 py-1.5 text-[var(--white)] rounded-[8px] flex items-center space-x-1 border-[1px] border-solid",
                                    themeValue === "light" ? "border-black" : "border-white"
                                )}
                            >

                                <span>
                                    <img
                                        className="w-6"
                                        src={WhiteCoinIcon}
                                        alt="Coin Icon"
                                    />
                                </span>

                                <span>
                                    {t("reader.storyInfoPage.storyInfoSection.ortherInfo.priceCount", { value: NumberUtils.formatNumberWithSeparator(String(data[1])) })}
                                </span>
                            </div>
                        </div>

                        <div className="mt-2 space-y-1">
                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-solid fa-plus"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.alias.label")}
                                    </span>
                                </div>

                                <div>
                                    {data[2].length > 0 ? data[2].map((alias: any) => alias.name).join('') : t("reader.storyInfoPage.storyInfoSection.alias.notData")}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-solid fa-user"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.author")}
                                    </span>
                                </div>

                                <div>
                                    <Link
                                        className="hover:text-[var(--primary)]"
                                        to="#"
                                    >
                                        {data[3].name}
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-solid fa-repeat"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.status.label")}
                                    </span>
                                </div>

                                <div>
                                    {data[0][0][0].status === StoryStatus.PUBLISHING ? t("reader.storyInfoPage.storyInfoSection.status.publishing") : t("reader.storyInfoPage.storyInfoSection.status.finished")}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-regular fa-heart"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.followerCount.label")}
                                    </span>
                                </div>

                                <div>
                                    {t("reader.storyInfoPage.storyInfoSection.followerCount.content", { value: NumberUtils.formatNumberWithSeparator(String(data[4])) })}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-regular fa-eye"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.viewCount.label")}
                                    </span>
                                </div>

                                <div>
                                    {t("reader.storyInfoPage.storyInfoSection.viewCount.content", { value: NumberUtils.formatNumberWithSeparator(String(data[5])) })}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-solid fa-globe"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.country")}
                                    </span>
                                </div>

                                <div>
                                    {data[6].name}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="min-w-40 space-x-2">
                                    <span className="text-[1.2rem]">
                                        <i className="fa-regular fa-star"></i>
                                    </span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.rating.label")}
                                    </span>
                                </div>

                                <div className="space-x-2">
                                    <span className="px-4 py-2 bg-[var(--primary)] rounded-[4px] text-[var(--white)] font-bold">
                                        {data[7].ratingCount === 0 ? (0).toFixed(1) : (data[7].starCount / (data[7].ratingCount * 5)).toFixed(1)}
                                    </span>

                                    <span className="text-[1.2rem]">-</span>

                                    <span>
                                        {t("reader.storyInfoPage.storyInfoSection.rating.content", { value: NumberUtils.formatNumberWithSeparator(String(data[7].ratingCount)) })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center">
                            <div className="mr-2">
                                <Rating
                                    defaultValue={0}
                                    precision={0.1}
                                    icon={(<StarRounded fontSize="inherit" />)}
                                    emptyIcon={(
                                        <StarBorderRounded
                                            fontSize="inherit"
                                            sx={{
                                                color: "var(--gray)"
                                            }}
                                        />
                                    )}
                                    sx={{
                                        fontSize: "2.8rem",
                                        padding: 0,
                                        "& .MuiRating-icon": {
                                            width: '2.2rem'
                                        },
                                        marginLeft: -1
                                    }}
                                />
                            </div>

                            <div>
                                ({t("reader.storyInfoPage.storyInfoSection.rating.status.notEvaluated", { value: 5 })})
                            </div>
                        </div>

                        <div className="mt-2 space-x-2">
                            {data[8].map((genre: any) => {
                                return (
                                    <Link
                                        key={genre.id}
                                        className="border-[2px] border-solid border-[var(--primary)] px-4 py-2 rounded-[4px] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--white)] transition-colors duration-200 ease-in-out"
                                        to="#"
                                    >
                                        {genre.name}
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="mt-6 flex items-center space-x-2">
                            <IconButton
                                icon={(<i className="fa-solid fa-book-open text-[1.4rem]"></i>)}
                                bgColor="#8bc24a"
                                width={130}
                                height={42}
                                borderRadius="4px"
                                color="var(--white)"
                            >
                                {t("reader.storyInfoPage.storyInfoSection.btn.readFromBeginning")}
                            </IconButton>

                            <IconButton
                                icon={(<i className="fa-regular fa-heart text-[1.4rem]"></i>)}
                                bgColor="#ff3860"
                                width={130}
                                height={42}
                                borderRadius="4px"
                                color="var(--white)"
                            >
                                {t("reader.storyInfoPage.storyInfoSection.btn.follow")}
                            </IconButton>
                        </div>
                    </div>
                </div>

                <div className="bg-[#eee2fe] rounded-[4px] p-4">
                    <div className="flex items-center">
                        <span>
                            <img
                                className="w-12"
                                src={SpeakerIcon}
                                alt="Speaker Icon"
                            />
                        </span>

                        <span className="font-[450] text-red-500 text-[1.2rem]">
                            {t("reader.storyInfoPage.storyInfoSection.note.label")}
                        </span>
                    </div>

                    <div
                        className="mt-2 text-[var(--black)] text-justify"
                        dangerouslySetInnerHTML={{
                            __html: data[0][0][0].note ?? t("reader.storyInfoPage.storyInfoSection.note.notData")
                        }}
                    />
                </div>

                <div>
                    <div className="flex items-center text-[var(--primary)] font-[450] space-x-2">
                        <span className="text-[1.8rem]">
                            <i className="fa-solid fa-circle-info"></i>
                        </span>

                        <span className="text-[1.2rem]">
                            {t("reader.storyInfoPage.storyInfoSection.contentIntroduction.label")}
                        </span>
                    </div>

                    <div
                        className="mt-2 text-justify"
                        dangerouslySetInnerHTML={{
                            __html: data[0][0][0].description ? data[0][0][0].description : t("reader.storyInfoPage.storyInfoSection.contentIntroduction.notData")
                        }}
                    />
                </div>
            </div>
        )
    }

    return null;
}

export default memo(StoryInfoSection);