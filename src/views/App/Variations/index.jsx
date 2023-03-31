import { Table } from "antd";
import VariationsApi from "api/VariationsApi";
import { useEffect, useState } from "react";
const initial_filter = {
  page: 1,
  limit: 10,
};
const Variations = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState(initial_filter);

  useEffect(async () => {
    await VariationsApi.GetVariations()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
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
      editable: true,
    },
  ];

  return (
    <Table
      bordered
      dataSource={data?.items}
      columns={columns}
      rowClassName="editable-row"
      onChange={(p, _, sort) => {
        const f = {
          page: p.current,
          limit: p.pageSize,
        };
        setFilter(f);
      }}
      pagination={{
        current: filter.page,
        total: data?.total_count,
        pageSize: filter.limit,
      }}
    />
  );
};
export default Variations;
