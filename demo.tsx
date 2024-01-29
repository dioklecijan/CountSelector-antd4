/**
 * Input control for selecting number between min and max or null.
 * Default Select control doesn't allow null value.
 * CountSelector maps null into "" option for internal use and
 * returns back null when "" is selected.
 * Prop `anyOption` adds null value option.
 */

import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Checkbox, Form, Select } from 'antd';
import type { SelectProps } from 'antd/lib/select';

type ICountSelectorProps = SelectProps<any> & {
  min?: number;
  max?: number;
  /** allow Unselected (value=null) */
  anyOption?: boolean;

  /**
   * If initial value is null and anyOption is false, selected value is null.
   * If you change selecton you can't change back to the null value.
   */
  value?: number | null;
  onChange?: (value: number | null) => void;
};

export const CountSelector = ({
  min = 0,
  max = 2,
  anyOption = true,
  onChange,
  value,
}: ICountSelectorProps) => {
  const options = React.useMemo(() => {
    const arr: { value: any; label: string }[] = [];
    if (anyOption || value === null)
      arr.push({ value: '', label: 'Unselected' });
    for (let i = min; i <= max; i++) arr.push({ value: i, label: String(i) });
    return arr;
  }, [min, max, anyOption, value]);

  const changeHandler = React.useCallback(
    (value: number | '') => {
      if (onChange) onChange(value === '' ? null : value);
    },
    [onChange]
  );

  return (
    <Select onChange={changeHandler} value={value === null ? '' : value}>
      {options.map((o) => (
        <Select.Option value={o.value} key={o.value}>
          {o.label}
        </Select.Option>
      ))}
    </Select>
  );
};

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onValuesChange = (changed, all) => {
    console.log('Changed:', changed);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // change initialValues.username to see effect (null, 1, 2...)
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ username: null }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Username" name="username">
          <CountSelector min={1} max={15} anyOption={false} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
