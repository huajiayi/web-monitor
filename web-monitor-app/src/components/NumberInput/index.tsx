import type { InputProps } from 'antd';
import { Input } from 'antd';
import React, { useCallback, useState } from 'react';

interface NumberInputProps extends InputProps {
  style?: React.CSSProperties;
  min?: number;
  max?: number;
  suffix?: React.ReactNode;
}

const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<any>> =
  React.forwardRef((props, ref) => {
    const {
      style,
      value,
      onChange,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      suffix
    } = props;
    const [ctrlValue, setCtrlValue] = useState(value);

    const handleChange = useCallback(
      (e) => {
        const num = e.target.value;
        // 不允许输入+号
        if (num.indexOf('+') >= 0) {
          return;
        }

        if (num === '') {
          setCtrlValue(undefined);
          onChange?.(undefined);
        }

        // 必须输入数字
        if (isNaN(Number.parseInt(num))) {
          return;
        }

        if (num < min) {
          setCtrlValue(min);
          onChange?.(min);
          return;
        }

        if (num > max) {
          setCtrlValue(max);
          onChange?.(max);
          return;
        }

        // min >= 0时，不允许输入负号
        if (min >= 0 && num < 0) {
          return;
        }

        setCtrlValue(Number.parseInt(num));
        onChange?.(Number.parseInt(num));
      },
      [ctrlValue, min, max],
    );

    return (
      <Input
        ref={ref}
        {...props}
        type="number"
        style={style}
        value={ctrlValue}
        onChange={handleChange}
        suffix={suffix}
      />
    );
  });

export default NumberInput;
