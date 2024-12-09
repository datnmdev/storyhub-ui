import { memo } from "react";
import { TopStoryItemProps } from "./TopStoryItemProps.type";
import UrlUtils from "@utilities/url.util";
import { useTranslation } from "react-i18next";
import { StoryType } from "@constants/story.constants";
import NumberUtils from "@utilities/number.util";
import { Link } from "react-router-dom";
import paths from "@routers/router.path";
import classNames from "classnames";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";

function TopStoryItem({
    index,
    data
}: TopStoryItemProps) {
    const { t } = useTranslation();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);

    let strokeColor;
    switch (index) {
        case 0:
            strokeColor = "#4a90e2"
            break;

        case 1:
            strokeColor = "#25be9c"
            break;

        case 2:
            strokeColor = "#ff0000"
            break;

        default:
            strokeColor = themeValue === "light" ? "#000" : "#FFF"
            break;
    }

    return (
        <Link 
            className={classNames(
                "w-full flex justify-between items-center space-x-4 hover:bg-[var(--primary)] hover:text-[var(--white)] hover:cursor-pointer rounded-[4px] p-2 transition-all duration-200 ease-in-out",
                themeValue === "light" ? "shadow-[0_0__8px_rgb(151,126,245,0.25)]" : "dark__boxShadow"
            )}
            to={paths.readerStoryInfoPage(data.id)}
        >
            <div
                className="text-transparent font-[900] text-[2.6rem] w-[80px] flex justify-center items-center shrink-0"
                style={{
                    'WebkitTextStrokeWidth': '2px',
                    'WebkitTextStrokeColor': strokeColor
                }}>
                {index + 1}
            </div>

            <div className="grow flex justify-between space-x-4 shrink-0">
                <div className="self-stretch">
                    <img
                        className="w-[60px] h-[84px] object-cover object-center"
                        src={UrlUtils.generateUrl(data.coverImage)}
                        alt="Cover Image"
                    />
                </div>

                <div className="grow flex flex-col justify-between">
                    <h3 className="max-w-[480px] text-[1.2rem] font-[500] line-clamp-1">{data.title}</h3>

                    <div className="flex items-center">
                        <div className="grow space-x-1">
                            <span>{t("reader.rankPage.topViewSection.topStoryList.item.type.label")}</span>
                            <span className="font-[450]">{data.type === StoryType.COMIC ? t("reader.rankPage.topViewSection.topStoryList.item.type.comic") : t("reader.rankPage.topViewSection.topStoryList.item.type.novel")}</span>
                        </div>

                        <div className="grow space-x-1">
                            <span>{t("reader.rankPage.topViewSection.topStoryList.item.author")}</span>
                            <span className="font-[450]">{data.author.user.name}</span>
                        </div>
                    </div>

                    <div className="grow flex items-center space-x-1">
                        <span>{t("reader.rankPage.topViewSection.topStoryList.item.genre")}</span>
                        <span className="font-[450] w-[420px] line-clamp-1">
                            {data.genres.map((genre: any) => genre.name).join(', ')}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <div className="grow space-x-1">
                            <span>{t("reader.rankPage.topRatingSection.topStoryList.item.ratingSummary.ratio.label")}</span>
                            <span className="font-bold text-red-500">{t("reader.rankPage.topRatingSection.topStoryList.item.ratingSummary.ratio.content", { value: NumberUtils.roundToDecimal(data.ratingSummary.ratingCount > 0 ? data.ratingSummary.starsCount / data.ratingSummary.ratingCount : 0, 1) })}</span>
                        </div>

                        <div className="grow space-x-1">
                        <span>{t("reader.rankPage.topRatingSection.topStoryList.item.ratingSummary.ratingCount.label")}</span>
                        <span className="font-[450]">{t("reader.rankPage.topRatingSection.topStoryList.item.ratingSummary.ratingCount.content", { value: NumberUtils.formatNumberWithSeparator(String(data.ratingSummary.ratingCount)) })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default memo(TopStoryItem);