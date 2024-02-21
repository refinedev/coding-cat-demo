import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";
import { CATEGORIES_LIST_QUERY, POST_EDIT_MUTATION } from "./queries";

export const BlogPostEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    meta: { gqlMutation: POST_EDIT_MUTATION },
    redirect: false,
  });

  const { selectProps } = useSelect({
    resource: "categories",
    meta: { gqlQuery: CATEGORIES_LIST_QUERY },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps}>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="DRAFT">Draft</Select.Option>
            <Select.Option value="PUBLISHED">Published</Select.Option>
            <Select.Option value="REJECTED">Rejected</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="categoryId" label="Category">
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
