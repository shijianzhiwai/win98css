import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type Win98ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  segmented?: boolean;
};

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function Win98Progress({
  value,
  segmented = false,
  className,
  ...props
}: Win98ProgressProps) {
  const percent = clampPercent(value);

  return (
    <div
      className={cn("progress-indicator", segmented && "segmented", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      {...props}
    >
      <span className="progress-indicator-bar" style={{ width: `${percent}%` }} />
    </div>
  );
}
