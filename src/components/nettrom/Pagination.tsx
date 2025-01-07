import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

export default function Pagination(props: ReactPaginateProps) {
  if (!props.pageCount || props.pageCount <= 1) return <></>;
  return (
    <div id="ctl00_mainContent_ctl00_divPager" className="pagination-outter">
      <ReactPaginate
        breakLabel="..."
        breakLinkClassName="text-muted-foreground min-w-10 h-10 flex items-center justify-center transition hover:bg-muted rounded-lg cursor-pointer pointer-events-none"
        nextLabel={<ChevronRight size={20} />}
        pageRangeDisplayed={5}
        previousLabel={<ChevronLeft size={20} />}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        pageLinkClassName="text-center flex items-center justify-center transition hover:bg-muted rounded-lg cursor-pointer min-w-10 h-10"
        containerClassName="text-sm flex items-center gap-1"
        activeLinkClassName="bg-web-title text-white pointer-events-none"
        disabledLinkClassName="text-muted-foreground pointer-events-none"
        previousLinkClassName="w-10 h-10 flex items-center justify-center text-center transition hover:text-web-title hover:-translate-x-0.5 rounded-lg cursor-pointer"
        nextLinkClassName="w-10 h-10 flex items-center justify-center text-center transition hover:text-web-title hover:translate-x-0.5 rounded-lg cursor-pointer"
        breakClassName="text-center"
        {...props}
      />
    </div>
  );
}
