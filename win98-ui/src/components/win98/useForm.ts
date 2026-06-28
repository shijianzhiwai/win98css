"use client";

import { useCallback, useMemo, useRef, useState, type FormEvent } from "react";

export type Win98FormValues = Record<string, unknown>;

export type Win98FormErrors<T> = Partial<Record<keyof T, string>>;

export type Win98FormTouched<T> = Partial<Record<keyof T, boolean>>;

/** 单字段校验器：返回错误文案表示不通过，返回 undefined 表示通过 */
export type Win98FieldValidator<T> = (
  value: T[keyof T],
  values: T,
) => string | undefined;

export type Win98FieldRule<T> = {
  /** 必填，传字符串作为自定义错误文案 */
  required?: boolean | string;
  /** 一个或多个自定义校验器，按顺序执行，返回首个错误 */
  validate?: Win98FieldValidator<T> | Win98FieldValidator<T>[];
};

export type Win98FormRules<T> = Partial<Record<keyof T, Win98FieldRule<T>>>;

export type UseWin98FormOptions<T extends Win98FormValues> = {
  initialValues: T;
  /** 声明式逐字段规则 */
  rules?: Win98FormRules<T>;
  /** 整体校验，返回错误对象（与 rules 合并，优先保留 rules 的错误） */
  validate?: (values: T) => Win98FormErrors<T>;
  onSubmit?: (values: T) => void | Promise<void>;
  /** 输入时即时校验，默认 true */
  validateOnChange?: boolean;
  /** 失焦时校验，默认 true */
  validateOnBlur?: boolean;
};

function isEmptyValue(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export type Win98FormHelpers<T extends Win98FormValues> = {
  values: T;
  errors: Win98FormErrors<T>;
  touched: Win98FormTouched<T>;
  /** 当前是否整体有效（无错误） */
  isValid: boolean;
  isSubmitting: boolean;
  /** 提交次数，>0 表示尝试过提交（用于展示全部错误） */
  submitCount: number;
  setFieldValue: (name: keyof T, value: T[keyof T]) => void;
  setFieldTouched: (name: keyof T, touched?: boolean) => void;
  setValues: (values: Partial<T>) => void;
  /** 仅当字段被触碰过或已尝试提交时返回错误，便于控制报错时机 */
  getFieldError: (name: keyof T) => string | undefined;
  handleSubmit: (e?: FormEvent) => void;
  reset: () => void;
};

export function useWin98Form<T extends Win98FormValues>(
  options: UseWin98FormOptions<T>,
): Win98FormHelpers<T> {
  const {
    initialValues,
    rules,
    validate,
    onSubmit,
    validateOnChange = true,
    validateOnBlur = true,
  } = options;

  const initialRef = useRef(initialValues);
  const [values, setValuesState] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Win98FormTouched<T>>({});
  const [submitCount, setSubmitCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const runValidation = useCallback(
    (current: T): Win98FormErrors<T> => {
      const errors: Win98FormErrors<T> = {};

      if (rules) {
        (Object.keys(rules) as (keyof T)[]).forEach((name) => {
          const rule = rules[name];
          if (!rule) return;
          const value = current[name];

          if (rule.required && isEmptyValue(value)) {
            errors[name] =
              typeof rule.required === "string" ? rule.required : "此项为必填";
            return;
          }
          const validators = rule.validate
            ? Array.isArray(rule.validate)
              ? rule.validate
              : [rule.validate]
            : [];
          for (const fn of validators) {
            const msg = fn(value, current);
            if (msg) {
              errors[name] = msg;
              break;
            }
          }
        });
      }

      if (validate) {
        const extra = validate(current);
        (Object.keys(extra) as (keyof T)[]).forEach((name) => {
          if (extra[name] && !errors[name]) errors[name] = extra[name];
        });
      }

      return errors;
    },
    [rules, validate],
  );

  const errors = useMemo(() => runValidation(values), [runValidation, values]);
  const isValid = Object.keys(errors).length === 0;

  const setFieldValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValuesState((prev) => ({ ...prev, [name]: value }));
    if (validateOnChange) setTouched((prev) => ({ ...prev, [name]: true }));
  }, [validateOnChange]);

  const setValues = useCallback((next: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...next }));
  }, []);

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    if (!validateOnBlur && !isTouched) return;
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, [validateOnBlur]);

  const getFieldError = useCallback(
    (name: keyof T) => {
      if (touched[name] || submitCount > 0) return errors[name];
      return undefined;
    },
    [errors, touched, submitCount],
  );

  const reset = useCallback(() => {
    setValuesState(initialRef.current);
    setTouched({});
    setSubmitCount(0);
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      setSubmitCount((c) => c + 1);
      const currentErrors = runValidation(values);
      if (Object.keys(currentErrors).length > 0) {
        // 标记全部字段为已触碰，暴露所有错误，并阻止提交
        const allTouched: Win98FormTouched<T> = {};
        (Object.keys(values) as (keyof T)[]).forEach((k) => {
          allTouched[k] = true;
        });
        setTouched(allTouched);
        return;
      }
      if (!onSubmit) return;
      const result = onSubmit(values);
      if (result instanceof Promise) {
        setIsSubmitting(true);
        result.finally(() => setIsSubmitting(false));
      }
    },
    [onSubmit, runValidation, values],
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    submitCount,
    setFieldValue,
    setFieldTouched,
    setValues,
    getFieldError,
    handleSubmit,
    reset,
  };
}
