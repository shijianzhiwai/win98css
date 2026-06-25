import { cn } from "../../lib/cn";
import { Win98Button } from "./Button";

export function getPageCount(total: number, pageSize: number): number {
  if (pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(total / pageSize));
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number): T[] {
  const pageCount = getPageCount(rows.length, pageSize);
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = (safePage - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

export type Win98TablePaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Win98TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  className,
}: Win98TablePaginationProps) {
  const pageCount = getPageCount(total, pageSize);
  const currentPage = Math.min(Math.max(page, 1), pageCount);

  return (
    <nav
      className={cn("table-pagination", className)}
      aria-label="表格分页"
    >
      <div className="table-pagination-actions">
        <Win98Button
          type="button"
          className="table-pagination-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          aria-label="第一页"
        >
          «
        </Win98Button>
        <Win98Button
          type="button"
          className="table-pagination-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="上一页"
        >
          ‹
        </Win98Button>
        <span className="table-pagination-status">
          第 {currentPage} / {pageCount} 页 · 共 {total} 条
        </span>
        <Win98Button
          type="button"
          className="table-pagination-btn"
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="下一页"
        >
          ›
        </Win98Button>
        <Win98Button
          type="button"
          className="table-pagination-btn"
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(pageCount)}
          aria-label="最后一页"
        >
          »
        </Win98Button>
      </div>
    </nav>
  );
}
