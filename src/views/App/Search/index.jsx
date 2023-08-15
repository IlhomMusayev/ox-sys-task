import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Table } from "antd";
import VariationsApi from "api/VariationsApi";
import { useEffect, useState } from "react";

const Search = () => {
  const [data, setData] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      setLoading(true);

      VariationsApi.GetVariations({
        page: 1,
        size: 10000,
      })
        .then((data) => {
          setData(data);
          setSearchResult(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      message.warning("Something went wrong! Please try again later.");
    }
  }, []);

  // Table columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      width: "25%",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: "25%",
      render: (_, record) => {
        return (
          <span>{new Date(record.lastUpdateTime).toLocaleString("ru")}</span>
        );
      },
    },
  ];

  const onSearch = async (values) => {
    const filteredUsers = data.items.filter((user) =>
      user?.name?.toLowerCase().includes(values.name.toLowerCase())
    );

    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));

    setSearchResult({
      items: filteredUsers,
      total_count: filteredUsers.length,
    });
  };

  // Table
  return (
    <div>
      <Form
        onFinish={onSearch}
        layout="inline"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 30,
          marginBottom: 30,
        }}
        form={form}
      >
        <Form.Item name="name">
          <Input
            placeholder="Search name"
            prefix={<SearchOutlined />}
            onPressEnter={onSearch}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table
        bordered
        dataSource={searchResult?.items}
        columns={columns}
        rowClassName="editable-row"
        loading={loading}
      />
    </div>
  );
};
export default Search;
