"use client";

import CommentSection from "@/components/nettrom/binh-luan/comment-section";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import Manga from "@/components/nettrom/truyen-tranh/manga";
import useAppStore from "@/stores/app.store";
import { useLayoutEffect } from "react";

export default function TruyenTranh({
  params,
}: {
  params: { mangaId: string };
}) {
  const appStore = useAppStore();

  useLayoutEffect(() => {
    appStore.setShowTopMenu(true);
  }, []);

  return (
    <div className="grid gap-[40px] lg:grid-cols-[2fr_1fr]">
      <div>
        <Manga mangaId={params.mangaId} />
        <CommentSection typeId={params.mangaId} type="series" />
      </div>
      <div>
        <TopTitles />
      </div>
    </div>
  );
}
