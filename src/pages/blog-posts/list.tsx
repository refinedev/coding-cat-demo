import {
  useTable,
  List,
  FilterDropdown,
  useSelect,
  EditButton,
  DateField,
  TagField,
} from "@refinedev/antd";

import { Table, Select } from "antd";
import { CATEGORIES_LIST_QUERY, POSTS_LIST_QUERY } from "./queries";

export const BlogPostsList = () => {
  const { tableProps } = useTable({
    meta: { gqlQuery: POSTS_LIST_QUERY },
    sorters: {
      initial: [{ field: "updatedAt", order: "desc" }],
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionValue: "title",
    meta: { gqlQuery: CATEGORIES_LIST_QUERY },
  });

  return (
    <List>
      <Table {...tableProps}>
        <Table.Column dataIndex={"id"} title={"ID"} sorter />
        <Table.Column dataIndex={"title"} title={"Title"} />
        <Table.Column
          dataIndex={"status"}
          title={"Status"}
          filters={[
            { text: "Draft", value: "DRAFT" },
            { text: "Published", value: "PUBLISHED" },
            { text: "Rejected", value: "REJECTED" },
          ]}
          filterMultiple={false}
          render={(status) => <TagField value={status} />}
        />
        <Table.Column
          dataIndex={["category", "title"]}
          title={"Category"}
          filterDropdown={(props) => {
            return (
              <FilterDropdown {...props}>
                <Select placeholder="Select a category" {...selectProps} />
              </FilterDropdown>
            );
          }}
        />
        <Table.Column
          dataIndex={"createdAt"}
          title={"Created At"}
          render={(createdAt) => <DateField value={createdAt} format="LLL" />}
        />
        <Table.Column
          dataIndex={"id"}
          title={"Actions"}
          render={(id) => <EditButton recordItemId={id} hideText />}
        />
      </Table>
    </List>
  );
};
