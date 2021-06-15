import { Button, Card, Input, Form } from 'antd';
import type { Dispatch } from 'umi';
import { connect, FormattedMessage, formatMessage } from 'umi';
import type { FC } from 'react';
import React from 'react';

const FormItem = Form.Item;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch;
}

const BasicForm: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: Record<string, any>) => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

 

  return (
    <Card bordered={false}>
      <Form
        hideRequiredMark
        style={{ marginTop: 8 }}
        form={form}
        name="basic"
        initialValues={{ public: '1' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="formandbasic-form.title.label" />}
          name="title"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'formandbasic-form.title.required' }),
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'formandbasic-form.title.placeholder' })} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="formandbasic-form.title.label" />}
          name="title"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'formandbasic-form.title.required' }),
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'formandbasic-form.title.placeholder' })} />
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            <FormattedMessage id="formandbasic-form.form.submit" />
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default connect(({ loading }: { loading: { effects: Record<string, boolean> } }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
