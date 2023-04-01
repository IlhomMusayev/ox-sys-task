import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Space, Table } from "antd";
import VariationsApi from "api/VariationsApi";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { logout } from "utils/auth-provider";

const initial_filter = {
  page: 1,
  size: 10,
};
const Variations = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState(initial_filter);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      VariationsApi.GetVariations(filter)
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          if (
            err.response.data.code === 401 &&
            err.response.data.code === 403
          ) {
            logout();
            window.location.reload();
          }
          setLoading(false);
          message.warning("Internet server error");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.warning("Something went wrong! Please try again later.");
    }
  }, [filter]);

  // Search filter
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  // Reset search filter
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };
  // Search filter column
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          border: "1px solid dodgerblue",
          color: "dodgerblue",
          padding: "8px 10px",
          background: "white",
          borderRadius: "5px",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
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
      ...getColumnSearchProps("name"),
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

  // Table
  return (
    <Table
      bordered
      dataSource={data?.items}
      columns={columns}
      rowClassName="editable-row"
      onChange={(p, _, sort) => {
        const f = {
          page: p.current,
          size: p.pageSize,
        };
        setFilter(f);
      }}
      pagination={{
        current: filter.page,
        total: data?.total_count,
        pageSize: filter.size,
      }}
      loading={loading}
    />
  );
};
export default Variations;
