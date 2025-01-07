"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLastUpdates } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import { ExtendChapter } from "@/types/mangadex";
import { Constants } from "@/constants";
import { FaClock } from "react-icons/fa";
import { DataLoader } from "@/components/DataLoader";
import { Utils } from "@/utils";
import useReadingHistory from "@/hooks/useReadingHistory";
import Pagination from "../Pagination";
import { MangaTile } from "../common/manga-tile";

export default function NewUpdates({
  title,
  groupId,
}: {
  title?: string;
  groupId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = Number(params.get("page")) || 0;
  const [totalPage, setTotalPage] = useState(0);
  const { history } = useReadingHistory();
  const { chapters, isLoading, error, total } = useLastUpdates({
    page,
    groupId,
  });
  const { mangas, updateMangas, updateMangaStatistics } = useMangadex();
  const updates: Record<string, ExtendChapter[]> = {};

  if (chapters) {
    for (const chapter of chapters) {
      const mangaId = chapter.manga?.id;
      if (!mangaId) continue;
      if (!updates[mangaId]) {
        updates[mangaId] = [];
      }
      updates[mangaId].push(chapter);
    }
  }

  useEffect(() => {
    if (chapters?.length > 0) {
      updateMangas({
        ids: chapters.filter((c) => !!c?.manga?.id).map((c) => c.manga!.id),
      });
    }
  }, [chapters]);

  useEffect(() => {
    if (chapters?.length > 0) {
      updateMangaStatistics({
        manga: chapters.filter((c) => !!c?.manga?.id).map((c) => c.manga!.id!),
      });
    }
  }, [chapters]);

  useEffect(() => {
    if (!total) return;
    setTotalPage(Math.floor(total / Constants.Mangadex.LAST_UPDATES_LIMIT));
  }, [total]);

  return (
    <div className="Module Module-163" id="new-updates">
      <div className="ModuleContent">
        <div className="items">
          <div className="relative">
            <h1 className="my-0 mb-4 flex items-center gap-2 text-xl text-web-title">
              <FaClock />
              <span>{title ?? "Truyện mới cập nhật"}</span>
            </h1>
          </div>
          <DataLoader isLoading={isLoading} error={"ABC"}>
            <div className={`grid grid-cols-2 gap-4 lg:grid-cols-4`}>
              {Object.entries(updates).map(([mangaId, chapterList]) => {
                const coverArt = Utils.Mangadex.getCoverArt(mangas[mangaId]);
                const mangaTitle = Utils.Mangadex.getMangaTitle(
                  mangas[mangaId],
                );
                const readedChapters = history[mangaId];
                return (
                  <MangaTile
                    id={mangaId}
                    key={mangaId}
                    thumbnail={coverArt}
                    title={mangaTitle}
                    chapters={chapterList}
                    readedChapters={readedChapters}
                  />
                );
              })}
            </div>
          </DataLoader>
        </div>
        <div className="mb-10 mt-5 flex justify-center">
          <Pagination
            onPageChange={(event) => {
              router.push(`${pathname}?page=${event.selected}#new-updates`);
            }}
            pageCount={totalPage}
            forcePage={page}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
          />
        </div>
      </div>
    </div>
  );
}
