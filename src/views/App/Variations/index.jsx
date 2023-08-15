import { message, Table } from "antd";
import VariationsApi from "api/VariationsApi";
import { useEffect, useState } from "react";
import { logout } from "utils/auth-provider";

const initial_filter = {
  page: 1,
  size: 20,
};
const Variations = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState(initial_filter);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      VariationsApi.GetVariations(filter)
        .then((data) => {
          setData(data);
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
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      message.warning("Something went wrong! Please try again later.");
    }
  }, [filter]);

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

  // Table
  return (
    <div>
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
    </div>
  );
};
export default Variations;
