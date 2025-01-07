import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Constants } from "@/constants";
import { useMangadex } from "@/contexts/mangadex";
import { ReadingHistory } from "@/types";
import { ExtendChapter } from "@/types/mangadex";
import { Utils } from "@/utils";
import Link from "next/link";
import { TextLink } from "./link";
import { twMerge } from "tailwind-merge";

export const MangaTile = (props: {
  id: string;
  title: string;
  thumbnail: string;
  chapters: ExtendChapter[];
  readedChapters: ReadingHistory;
}) => {
  const { mangaStatistics } = useMangadex();
  const readedChaptersId = props.readedChapters?.chapterId ?? null;
  return (
    <div className="group">
      <figure className="clearfix">
        <div className="relative mb-2">
          <Link
            title={props.title}
            href={Constants.Routes.nettrom.manga(props.id)}
          >
            <AspectRatio
              ratio={Constants.Nettrom.MANGA_COVER_RATIO}
              className="overflow-hidden rounded-lg group-hover:shadow-lg"
            >
              <div className="absolute bottom-0 left-0 z-[1] h-3/5 w-full bg-gradient-to-t from-neutral-900 from-[15%] to-transparent transition-all duration-500 group-hover:h-3/4"></div>
              <img
                src={props.thumbnail}
                className="lazy h-full w-full object-cover transition duration-500 group-hover:scale-[102%]"
                data-original={props.thumbnail}
                alt={props.title}
              />
            </AspectRatio>
          </Link>
          <div className="absolute bottom-0 left-0 z-[2] w-full px-2 py-1.5">
            <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight text-white transition group-hover:line-clamp-4">
              {props.title}
            </h3>
            <span className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <i className="fa fa-star"></i>
                {Utils.Number.formatViews(
                  Math.round(
                    (mangaStatistics[props.id]?.rating?.bayesian || 0) * 10,
                  ) / 10,
                )}
              </span>
              <span className="flex items-center gap-1">
                <i className="fa fa-comment" />
                {Utils.Number.formatViews(
                  mangaStatistics[props.id]?.comments?.repliesCount || 0,
                )}
              </span>
              <span className="flex items-center gap-1">
                <i className="fa fa-heart" />
                {Utils.Number.formatViews(
                  mangaStatistics[props.id]?.follows || 0,
                )}
              </span>
            </span>
          </div>
        </div>
        <figcaption>
          <ul className="flex flex-col gap-1">
            {props.chapters.slice(0, 3).map((chapter) => {
              const isRead = readedChaptersId === chapter.id;
              return (
                <li
                  className="flex items-center justify-between gap-x-2 text-xs"
                  key={chapter.id}
                >
                  <TextLink
                    withoutIcon
                    href={Constants.Routes.nettrom.chapter(chapter.id)}
                    title={Utils.Mangadex.getChapterTitle(chapter)}
                    className={twMerge(
                      "text-xs",
                      isRead
                        ? "flex-grow truncate whitespace-nowrap text-web-titleDisabled transition hover:text-web-titleLighter"
                        : "flex-grow truncate whitespace-nowrap text-web-title transition hover:text-web-titleLighter",
                    )}
                  >
                    {Utils.Mangadex.getChapterTitle(chapter)}
                  </TextLink>
                  <span className="whitespace-nowrap text-muted-foreground">
                    {isRead
                      ? "ĐÃ ĐỌC"
                      : Utils.Date.formatNowDistance(
                          new Date(chapter.attributes.readableAt),
                        )}
                  </span>
                </li>
              );
            })}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};
