import { twMerge } from "tailwind-merge";
import NextLink, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { ArrowUpRight } from "lucide-react";

export const TextLink: React.FC<
  LinkProps &
    PropsWithChildren & {
      className?: string;
      title?: HTMLAnchorElement["title"];
      withoutIcon?: boolean;
      target?: HTMLAnchorElement["target"];
    }
> = (props) => {
  return (
    <NextLink
      {...props}
      title={props.title}
      className={twMerge(
        "text-sm text-web-title underline-offset-4 transition hover:text-web-titleLighter hover:underline",
        props.className,
      )}
    >
      {props.children}{" "}
      {!props.withoutIcon && <ArrowUpRight size={16} className="inline" />}
    </NextLink>
  );
};
