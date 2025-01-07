import { FC, useRef } from "react";
import { useChapterContext } from "@/contexts/chapter";
import { Select } from "../Select";
import { twMerge } from "tailwind-merge";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Button } from "../Button";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaEllipsisV,
  FaList,
} from "react-icons/fa";
import useScrollOffset from "@/hooks/useScrollOffset";
import Link from "next/link";
import { Constants } from "@/constants";
import { useInViewport } from "react-in-viewport";

export const ChapterControlBar: FC<{}> = (props) => {
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
  const scrollDirection = useScrollDirection();
  const { isAtBottom, isAtTop } = useScrollOffset();
  const staticBarRef = useRef(null);
  const { inViewport: isStaticBarVisible } = useInViewport(
    staticBarRef,
    {},
    { disconnectOnLeave: false },
    {},
  );

  return (
    <>
      <div
        ref={staticBarRef}
        className="mx-auto flex max-w-[600px] items-center justify-center gap-2 py-5"
      >
        <Button
          disabled={!canPrev}
          onClick={() => prev()}
          icon={<FaArrowLeft />}
          className="h-10 shrink-0 rounded-lg"
        >
          Chương trước
        </Button>
        <Select
          classNames={{
            trigger: "grow rounded-lg",
            content: "max-h-[500px] w-[95vw] sm:w-full",
          }}
          value={chapterId || "Đang tải..."}
          onValueChange={(value) => {
            goTo(value);
          }}
          items={chapters.map((item) => {
            return {
              label:
                item.volume !== "none"
                  ? `Tập ${item.volume} Chương ${item.chapter}`
                  : item.chapter !== "none"
                    ? `Chương ${item.chapter}`
                    : "Oneshot",
              value: item.id,
            };
          })}
        ></Select>
        <Button
          disabled={!canNext}
          icon={<FaArrowRight />}
          onClick={() => next()}
          className="h-10 shrink-0 rounded-lg"
        >
          Chương sau
        </Button>
      </div>
      <div
        className={twMerge(
          `fixed bottom-0 left-0 z-10 mx-auto flex w-full translate-y-0 flex-nowrap items-center justify-center gap-x-1 transition-all duration-500`,
          scrollDirection === "down" && !isAtBottom && "translate-y-full",
          isStaticBarVisible && "translate-y-full",
        )}
      >
        <div
          className={twMerge(
            "flex w-full items-center gap-2 bg-neutral-900 p-2 shadow-2xl sm:max-w-[500px] sm:rounded-t-xl",
          )}
        >
          <Button
            disabled={isAtTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            icon={<FaArrowUp />}
            variant={"ghost"}
            className="h-10 w-10 shrink-0 rounded-full bg-transparent"
          ></Button>
          <Link href={Constants.Routes.nettrom.manga(manga?.id || "")}>
            <Button
              variant={"ghost"}
              className="h-10 w-10 shrink-0 bg-transparent"
              icon={<FaList />}
            ></Button>
          </Link>
          <Button
            disabled={!canPrev}
            onClick={() => prev()}
            icon={<FaArrowLeft />}
            className="h-10 w-10 shrink-0 rounded-lg"
          ></Button>
          <Select
            classNames={{
              trigger: "grow rounded-lg",
              content: "max-h-[500px] w-[95vw] sm:w-full",
            }}
            value={chapterId || "Đang tải..."}
            onValueChange={(value) => {
              goTo(value);
            }}
            items={chapters.map((item) => {
              return {
                label:
                  item.volume !== "none"
                    ? `Tập ${item.volume} Chương ${item.chapter}`
                    : item.chapter !== "none"
                      ? `Chương ${item.chapter}`
                      : "Oneshot",
                value: item.id,
              };
            })}
          ></Select>
          <Button
            disabled={!canNext}
            icon={<FaArrowRight />}
            onClick={() => next()}
            className="h-10 w-10 shrink-0 rounded-lg"
          ></Button>
          <Button
            onClick={() => alert("Chức năng này đang được phát triển")}
            variant={"ghost"}
            className="h-10 w-10 shrink-0 bg-transparent"
            icon={<FaEllipsisV />}
          ></Button>
        </div>
        {/* <div className="flex items-center justify-center gap-x-1">
          <Link className="home hidden md:block" href="/" title="Trang chủ">
            <i className="fa fa-home" />
          </Link>
          <Link
            className="home backward hidden md:block"
            href={`${Constants.Routes.nettrom.manga(manga?.id || "")}#nt_listchapter`}
            title={mangaTitle}
          >
            <i className="fa fa-list" />
          </Link>
          {shouldFloat && (
            <a
              className="home changeserver"
              href="#"
              title="Lên trên cùng"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <i className="fa fa-arrow-circle-up" />
            </a>
          )}
        </div>
        <div className="flex items-center justify-center gap-x-1">
          <a
            className={`prev a_prev ${canPrev ? "" : "disabled"}`}
            onClick={() => prev()}
          >
            <i className="fa fa-chevron-left" />
          </a>
          <select
            name="ctl00$mainContent$ddlSelectChapter"
            id="ctl00_mainContent_ddlSelectChapter"
            className="select-chapter min-w-[100px] md:min-w-[200px]"
            value={chapterId || "Đang tải..."}
            onChange={(event) => {
              goTo(event.target.value);
            }}
          >
            {chapters.length > 0 ? (
              chapters.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.volume !== "none"
                    ? `Tập ${item.volume} Chương ${item.chapter}`
                    : item.chapter !== "none"
                      ? `Chương ${item.chapter}`
                      : "Oneshot"}
                </option>
              ))
            ) : (
              <option>Đang tải...</option>
            )}
          </select>
          <a
            className={`next a_next ${canNext ? "" : "disabled"}`}
            onClick={() => next()}
          >
            <i className="fa fa-chevron-right" />
          </a>
        </div>
        <a
          className="follow-link btn btn-success"
          href={Constants.Routes.nettrom.scanlationGroup(
            chapter?.scanlation_group?.id || "",
          )}
        >
          <i className="fa fa-heart" /> <span>Nhóm dịch</span>
        </a> */}
      </div>
    </>
  );
};
