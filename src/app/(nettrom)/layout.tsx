import Link from "next/link";
import { Inter } from "next/font/google";
import { Constants } from "@/constants";
import "@/styles/nettrom/index.scss";
import { twMerge } from "tailwind-merge";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { TextLink } from "@/components/nettrom/common/link";
import SlidingHeader from "@/components/nettrom/layout/header-2";
import { TopMenu } from "@/components/nettrom/layout/top-menu";

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - Truyện tranh chất lượng cao không quảng cáo`,
  description: `Đọc truyện miễn phí, chất lượng cao và tham gia ủng hộ nhóm dịch trên ${Constants.APP_NAME}`,
  applicationName: Constants.APP_NAME,
  authors: [{ name: "TruyenDex", url: "https://github.com/zennomi/truyendex" }],
  keywords: [
    "truyện tranh",
    "manga",
    "manhwa",
    "manhua",
    "nettruyen",
    "nettrom",
    "blogtruyen",
    "truyendex",
  ],
  metadataBase: new URL(Constants.APP_URL),
  other: {
    referrer: "same-origin",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function NettromLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const copyrightYear = new Date().getFullYear();

  return (
    <LayoutWrapper id="nettrom">
      <NextTopLoader
        zIndex={1000}
        easing="ease-in-out"
        speed={400}
        height={4}
        showSpinner={false}
        template={`
        <div class="bar bg-web-title" role="bar"><div class="peg"></div></div> 
  <div class="spinner text-web-title" role="spinner"><div class="spinner-icon"></div></div>`}
      />
      <Suspense>
        {/* <Header /> */}
        <SlidingHeader />
      </Suspense>
      <TopMenu />

      <main
        className={twMerge("bg-muted text-sm text-foreground", inter.className)}
      >
        <div className="container">{children}</div>
      </main>
      <footer className="border-t bg-[#000]">
        <div className="container pb-10 pt-10">
          <div className="grid gap-4 sm:grid-cols-[1fr_3fr]">
            <div
              className="copyright text-muted-foreground"
              itemType="http://schema.org/Organization"
            >
              <Link itemProp="url" href="/" className="mb-4 block">
                <img
                  itemProp="logo"
                  src={"/nettruyen/images/logo.png"}
                  className="h-10"
                  alt={`${Constants.APP_NAME} - Truyện tranh Online`}
                />
              </Link>
              <p className="text-sm">
                Copyright © {copyrightYear}{" "}
                <Link
                  href="/"
                  className="text-web-title transition hover:!bg-transparent hover:bg-web-titleLighter hover:underline"
                >
                  {Constants.APP_NAME}
                </Link>
              </p>
            </div>
            <div>
              <div className="">
                <h4 className="mb-4 text-muted-foreground">Từ khóa</h4>
                <ul className="flex flex-wrap gap-2 text-sm">
                  <li>
                    <TextLink target="_self" href="/">
                      Truyện tranh
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      Truyen tranh online
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      Đọc truyện tranh
                    </TextLink>
                  </li>
                  <li>
                    <TextLink
                      target="_self"
                      href={`${Constants.Routes.nettrom.search}?order[followedCount]=desc#results`}
                    >
                      Truyện tranh hot
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      Truyện tranh hay
                    </TextLink>
                  </li>
                  <li>
                    <TextLink
                      target="_self"
                      href={`${Constants.Routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}
                    >
                      Truyện ngôn tình
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      Mangadex
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      Manga
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      Manhua
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      truyenqq
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      mi2manga
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      doctruyen3q
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      toptruyen
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      cmanga
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      vlogtruyen
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      blogtruyen
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      truyentranhaudio
                    </TextLink>
                  </li>
                  <li>
                    <TextLink target="_self" href="/">
                      vcomi
                    </TextLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </LayoutWrapper>
  );
}
