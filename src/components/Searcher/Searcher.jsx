import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { ReservationContext } from "../../context/useReservationContext";
import "./Searcher.css";

// eslint-disable-next-line react/prop-types
const Searcher = ({ onClickSearch, shouldReset }) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const {
    setCanReservate,
    setTypeRoom,
    setChild,
    setIspet,
    setAdults,
    setRangeDate,
  } = useContext(ReservationContext);
  const dateFormat = "DD/MM/YYYY";

  const onClick = () => {
    setChild(form.getFieldValue("children")),
      setIspet(form.getFieldValue("pets")),
      setTypeRoom(form.getFieldValue("hab")),
      setAdults(form.getFieldValue("adults"));
    setRangeDate(form.getFieldValue("date"));
    onClickSearch(
      form.getFieldValue("date"),
      form.getFieldValue("adults"),
      form.getFieldValue("children"),
      form.getFieldValue("type"),
      form.getFieldValue("pets")
    );
    setCanReservate(true);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  useEffect(() => {
    if (shouldReset) {
      form.resetFields(["date", "adults", "children", "type", "pets"]);
    }
  }, [shouldReset, form]);

  return (
    <Card bordered={false} className="card-reservation">
      <Form
        form={form}
        className="form-reservation"
        name="control-hooks"
        layout="vertical"
        size="default"
        onFinish={onClick}
        labelAlign="left"
      >
        <Form.Item
          rules={[{ required: true, message: "Campo requerido" }]}
          label="Fecha"
          className="form-reservation__item"
          name="date"
        >
          <RangePicker
            placeholder={["Ingreso", "Salida"]}
            renderExtraFooter={() => "extra footer"}
            format={dateFormat}
            disabledDate={disabledDate}
            onChange={() => setCanReservate(false)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Adultos"
          className="form-reservation__item"
          name="adults"
          rules={[
            { required: true, message: "Campo requerido" },
            { type: "number", message: "Solo son números" },
          ]}
        >
          <InputNumber
            placeholder="Adultos"
            min={1}
            max={10}
            style={{ width: "200px" }}
            onChange={() => setCanReservate(false)}
          />
        </Form.Item>

        <Form.Item
          label="Niños"
          className="form-reservation__item"
          name="children"
        >
          <InputNumber
            style={{ width: "200px" }}
            placeholder="Niños"
            min={0}
            max={10}
            onChange={() => setCanReservate(false)}
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Tip Hab."
          className="form-reservation__item"
          initialValue={"todos"}
        >
          <Select
            style={{ width: "200px" }}
            placeholder="Buscar tipo de habitación"
            options={[
              { value: "todos", label: "Todos" },
              { value: "estándar", label: "Habitación Estándar" },
              { value: "privada", label: "Habitación Privada" },
              { value: "suite", label: "Habitación Suite" },
              { value: "deluxe", label: "Habitación Deluxe" },
              { value: "familiar", label: "Habitación Familiar" },
            ]}
            onChange={() => setCanReservate(false)}
          />
        </Form.Item>
        <Form.Item
          name="pets"
          label="Mascotas"
          className="form-reservation__item pets"
          initialValue={0}
        >
          <Select
            style={{ width: "200px" }}
            placeholder="Permiten mascotas en hab"
            options={[
              { value: 0, label: "Indiferente" },
              { value: 1, label: "Permiten mascotas" },
              { value: 2, label: "No permiten mascotas" },
            ]}
            onChange={() => setCanReservate(false)}
          />
        </Form.Item>

        <Form.Item className="form-reservation__item">
          <Space>
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Searcher;
