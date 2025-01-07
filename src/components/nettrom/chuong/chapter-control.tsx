import Link from "next/link";
import { format } from "date-fns";
import { useChapterContext } from "@/contexts/chapter";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";
import { Alert } from "../Alert";
import { useMemo } from "react";
import { Button } from "../Button";
import { FaClock } from "react-icons/fa";

export default function ChapterControl() {
  const {
    manga,
    chapter,
    canNext,
    canPrev,
    next,
    prev,
    chapters,
    goTo,
    others,
    chapterId,
  } = useChapterContext();

  const mangaTitle = useMemo(() => {
    return Utils.Mangadex.getMangaTitle(manga);
  }, [manga]);
  const chapterTitle = useMemo(() => {
    return Utils.Mangadex.getChapterTitle(chapter);
  }, [chapter]);

  return (
    <div className="pt-10">
      <div className="py-4">
        <Alert
          classNames={{
            alert:
              "[&>svg]:text-blue-500 text-blue-500 bg-blue-100 rounded-t-none",
          }}
          title=" TruyenDex là một website mã nguồn mở, trong quá trình trải nghiệm
            rất mong nhận được phản hồi từ mọi người!"
          action={
            <Link
              className="no-underline hover:no-underline"
              href={Constants.Routes.report}
              target="_blank"
              rel="nofollow"
            >
              <Button className="bg-blue-500 hover:bg-blue-600">
                Góp ý/Phản hồi
              </Button>
            </Link>
          }
        ></Alert>
      </div>
      <DataLoader
        isLoading={!chapter}
        loadingText="Đang tải thông tin chương..."
      >
        <div className="flex flex-col gap-0">
          {/* <ul
          className="mb-2 inline-flex items-center gap-4"
          itemType="http://schema.org/BreadcrumbList"
        >
          {[
            {
              href: Constants.Routes.nettrom.index,
              name: "Trang chủ",
              position: 1,
            },
            {
              href: Constants.Routes.nettrom.search,
              name: "Truyện Tranh",
              position: 2,
            },
          ].map((item, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <>
                <li
                  key={index}
                  itemProp="itemListElement"
                  itemType="http://schema.org/ListItem"
                >
                  <Link
                    href={item.href}
                    className="text-web-title transition hover:text-web-titleLighter"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <meta
                    itemProp="position"
                    content={item.position.toString()}
                  />
                </li>
                {!isLast && (
                  <li
                    className="text-muted-foreground"
                    key={"divider_" + index}
                  >
                    /
                  </li>
                )}
              </>
            );
          })}
        </ul> */}
          <h1 className="mb-2">
            <Link
              className="text-base text-web-title transition hover:text-web-titleLighter"
              href={Constants.Routes.nettrom.manga(manga?.id || "")}
            >
              {mangaTitle}
            </Link>
            <p className="my-0 text-2xl text-foreground">{chapterTitle} </p>
          </h1>
          <p className="mb-5">
            <span className="text-muted-foreground">
              <FaClock className="mr-2 inline" />
              Cập nhật lúc:{" "}
              <span className="">
                {chapter &&
                  format(
                    new Date(chapter.attributes.publishAt),
                    "HH:mm dd/MM/yyyy",
                  )}
              </span>
            </span>
          </p>
          <i></i>
        </div>
        <div className="reading-control">
          {others.length > 0 && (
            <div className="mrb5">
              Chuyển sang đọc bản dịch nhóm khác
              <div className="mrt10">
                {others.map((other, idx) => (
                  <Link
                    rel="nofollow"
                    key={other}
                    data-server={1}
                    className="loadchapter btn btn-primary btn-success mrb5"
                    href={Constants.Routes.nettrom.chapter(other)}
                  >
                    Nhóm {idx}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DataLoader>
    </div>
  );
}
