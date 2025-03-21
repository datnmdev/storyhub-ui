import apis from "@apis/index";
import Breadcrumb from "@components/Breadcrumb";
import { BreadcrumbProps } from "@components/Breadcrumb/Breadcrumb.type";
import themeFeature from "@features/theme";
import useFetch from "@hooks/fetch.hook";
import { useAppSelector } from "@hooks/redux.hook";
import paths from "@routers/router.path";
import classNames from "classnames";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Pagination as PaginationType } from "@components/Pagination/Pagination.type";
import Pagination from "@components/Pagination";
import LoadingWrapper from "@components/LoadingWrapper";
import moment from "moment";
import { GetInvoiceHistoryRes } from "./ReaderInvoiceHistoryPage.type";

function ReaderInvoiceHistoryPage() {
    const { t } = useTranslation();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const [queries, setQueries] = useState<PaginationType>({
        page: 1,
        limit: 16
    });
    const { data, isLoading, setRefetch } = useFetch<GetInvoiceHistoryRes>(apis.invoiceApi.getInvoice, { queries })

    const breadcrumbItems: BreadcrumbProps["items"] = [
        {
            label: t("reader.walletPage.breadcrumb.items.homePage"),
            path: paths.readerHomePage()
        },
        {
            label: t("reader.walletPage.breadcrumb.items.walletPage"),
            path: paths.readerWalletPage()
        }
    ]

    useEffect(() => {
        setRefetch({
            value: true
        })
    }, [queries.page])

    return (
        <div className="grow desktop:w-[var(--desktop-container-w)] mx-auto py-8">
            <div>
                <Breadcrumb
                    items={breadcrumbItems}
                />
            </div>

            <div className="flex justify-between items-stretch mt-2 min-h-[520px] space-x-4">
                <div className="w-[280px]">
                    <h3 className="font-semibold text-[1.4rem]">{t("reader.walletPage.sidebar.heading")}</h3>
                    <ul className="mt-2">
                        <li>
                            <Link
                                className="px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center hover:text-[var(--primary)]"
                                to={paths.readerWalletPage()}
                            >
                                <span className="text-[1.2rem]">
                                    <i className="fa-solid fa-wallet"></i>
                                </span>
                                <span>{t("reader.walletPage.sidebar.walletInfo")}</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center hover:text-[var(--primary)]"
                                to={paths.readerDepositeTransHistoryPage()}
                            >
                                <span className="text-[1.2rem]">
                                    <i className="fa-solid fa-building-columns"></i>
                                </span>
                                <span>{t("reader.walletPage.sidebar.depositeHistory")}</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center bg-[var(--primary)] text-[var(--white)]"
                                to={paths.readerInvoiceHistoryPage()}
                            >
                                <span className="text-[1.2rem]">
                                    <i className="fa-solid fa-money-bills"></i>
                                </span>
                                <span>{t("reader.walletPage.sidebar.paymentHistory")}</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="grow">
                    <LoadingWrapper
                        level="component"
                        isLoading={isLoading}
                        message={t("loading.getInvoiceHistory")}
                    >
                        <div className={classNames("h-full p-4 flex flex-col", themeValue === "light" ? "bg-[var(--light-gray)]" : "bg-[#242121]")}>
                            <div className="grow">
                                <table className="w-full">
                                    <thead className="bg-[var(--primary)] text-[var(--white)]">
                                        <tr>
                                            <th className="py-2">{t("reader.invoiceHistoryPage.content.invoiceNumber")}</th>
                                            <th className="py-2">{t("reader.invoiceHistoryPage.content.chapterId")}</th>
                                            <th className="py-2">{t("reader.invoiceHistoryPage.content.totalAmount")}</th>
                                            <th className="py-2">{t("reader.invoiceHistoryPage.content.createdAt")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data?.[0].map(row => {
                                            return (
                                                <tr 
                                                    key={row.id}
                                                    className="text-center border-b-[1px] border-solid border-[var(--gray)]"
                                                >
                                                    <td className="py-2">{row.id}</td>
                                                    <td className="py-2">{row.chapterId}</td>
                                                    <td className="py-2 text-red-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(row.totalAmount))}</td>
                                                    <td className="py-2">{moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center items-center mt-4">
                                <Pagination
                                    count={data?.[1] ? Math.ceil(data[1] / queries.limit) : 0}
                                    page={queries.page}
                                    onChange={(e, page) => setQueries({
                                        ...queries,
                                        page
                                    })}
                                />
                            </div>
                        </div>
                    </LoadingWrapper>
                </div>
            </div>
        </div>
    )
}

export default memo(ReaderInvoiceHistoryPage);