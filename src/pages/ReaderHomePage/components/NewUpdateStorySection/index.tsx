import apis from "@apis/index";
import Pagination from "@components/Pagination";
import StoryItem from "@components/StoryItem";
import useFetch from "@hooks/fetch.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetNewUpdatedStoriesQueries, GetNewUpdatedStoriesResData } from "./NewUpdateStorySection.type";

function NewUpdateStorySection() {
    const { t } = useTranslation();
    const [queries, setQueries] = useState<GetNewUpdatedStoriesQueries>({
        orderBy: [
            ["updated_at", "DESC"]
        ],
        page: 1,
        limit: 18
    });
    const { data, isLoading, setRefetch } = useFetch<GetNewUpdatedStoriesResData>(apis.storyApi.getStoryWithFilter, {
        queries
    })

    useEffect(() => {
        setRefetch({
            value: true
        })
    }, [queries])

    if (isLoading || data === null) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-[1.4rem] font-semibold">
                {t("reader.homePage.newUpdatedSection.title")}
            </h3>
            <div>
                <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-4">
                        {data[0].map(story => {
                            return (
                                <StoryItem
                                    key={story.id}
                                    data={story} 
                                />
                            )
                        })}
                    </div>

                    <div className="flex justify-center items-center">
                        <Pagination
                            page={queries.page}
                            count={Math.ceil(data[1] / queries.limit)}
                            onChange={(e, page) => setQueries({
                                ...queries,
                                page
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(NewUpdateStorySection);