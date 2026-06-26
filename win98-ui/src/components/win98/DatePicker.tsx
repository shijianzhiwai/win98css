"use client";

import DatePicker, { type DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "../../lib/cn";

export type Win98DatePickerProps = DatePickerProps;

/**
 * react-datepicker 的 Win98 皮肤封装。
 * 不改动库源代码：仅透传全部原生 props,并注入作用域类名,
 * 由 win98.css 中的 `.win98-datepicker` / `.win98-datepicker-popper` 覆盖样式。
 * 日期、时间、范围、多选、内联、月份/年份选择等库支持的能力均原样保留。
 */
export function Win98DatePicker(props: Win98DatePickerProps) {
  return (
    <DatePicker
      showPopperArrow={false}
      {...props}
      className={cn("border-inverted win98-datepicker-input", props.className)}
      calendarClassName={cn("win98-datepicker", props.calendarClassName)}
      popperClassName={cn("win98-datepicker-popper", props.popperClassName)}
      // 用 fixed 定位策略:弹层相对视口绝对定位,不会撑高文档,
      // 从而避免打开时整页出现/消失滚动条导致的跳动。
      popperProps={{ strategy: "fixed", ...props.popperProps }}
    />
  );
}
