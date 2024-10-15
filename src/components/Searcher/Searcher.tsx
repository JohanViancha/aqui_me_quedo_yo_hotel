import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, InputNumber, Space } from "antd";
import React from "react";
import "./Searcher.css";

const Searcher = ({ onClickSearch }) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  const onClick = () => {};

  return (
    <Card bordered={false} className="card-reservation">
      <Form form={form} className="form-reservation" name="control-hooks">
        <Form.Item
          rules={[{ required: true, message: "Campo requerido" }]}
          label="Fecha"
          className="form-reservation__item"
          style={{ width: "100%" }}
          name="date"
        >
          <RangePicker
            placeholder={["Ingreso", "Salida"]}
            renderExtraFooter={() => "extra footer"}
            format={dateFormat}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Adultos"
          className="form-reservation__item"
          style={{ width: "100%" }}
          name="adults"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <InputNumber
            placeholder="Niños"
            min={1}
            max={10}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Niños"
          className="form-reservation__item"
          style={{ width: "100%" }}
          name="children"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <InputNumber
            placeholder="Niños"
            min={1}
            max={10}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="rooms"
          label="Hab."
          className="form-reservation__item"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <InputNumber
            placeholder="Habitaciones"
            min={1}
            max={10}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item className="form-reservation__item">
          <Space>
            <Button type="primary" htmlType="submit" onClick={onClick}>
              <SearchOutlined />
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Searcher;
