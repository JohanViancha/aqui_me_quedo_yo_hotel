import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, InputNumber, Space } from "antd";
import React from "react";

const Buscador = ({ onClickSearch }) => {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  return (
    <Card bordered={false} className="card-reservation">
      <Form className="form-reservation" name="control-hooks">
        <Form.Item label="Fecha" className="form-reservation__item">
          <RangePicker
            placeholder={["Ingreso", "Salida"]}
            renderExtraFooter={() => "extra footer"}
            format={dateFormat}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="travelers"
          label="Viajeros"
          className="form-reservation__item"
        >
          <div className="card-reservation__travelers">
            <InputNumber placeholder="Adultos" min={1} max={10} />
            <InputNumber placeholder="Niños" min={1} max={10} />
          </div>
        </Form.Item>

        <Form.Item
          name="rooms"
          label="Habitaciones"
          className="form-reservation__item"
        >
          <InputNumber placeholder="Habitaciones" min={1} max={10} />
        </Form.Item>

        <Form.Item className="form-reservation__item">
          <Space>
            <Button type="primary" htmlType="submit" onClick={onClickSearch}>
              <SearchOutlined />
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Buscador;
