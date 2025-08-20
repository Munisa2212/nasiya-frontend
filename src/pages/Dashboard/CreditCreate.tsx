import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Checkbox, DatePicker, Form, Input, Select, Space } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import Heading from "../../components/Heading"
import { useState } from "react"
import UploadImage from "../../components/UploadImage"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import dayjs, { Dayjs } from "dayjs";

const CreditCreate = () => {
  const navigate = useNavigate()
  const [today, setToday] = useState(false)
  const [buttonClick, setButtonClick] = useState(false)
  const [form] = Form.useForm()
  const [cookie] = useCookies(['token'])
  const { id } = useParams()
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  const onFinish = (values: any) => {
    const start_date = new Date(values.date).toISOString()
    const payload = {
      debtor_id: +id,
      start_date,
      duration: +(values.deadline).split(' ')[0],
      product_name: values.name,
      note: values.note,
      total_amount: +values.sum,
      images: values.images || [],
    };

    instance
      .post("/credit", payload, { headers: { Authorization: `Bearer ${cookie.token}` } })
      .then(() => navigate(-1));
  };
  return (
    <div className="containers">
      <div className="flex text-center gap-17 items-center mb-[32px]">
        <Button
          type="default"
          size="large"
          icon={<ArrowLeftOutlined />}
          className="text-[25px]"
          onClick={() => navigate(-1)}
        />
        <Heading children="Nasiya yaratish" tag="h1" />
      </div>

      <Form
        form={form}
        className="flex flex-col gap-3"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          images: []
        }}
      >
        <Form.Item label="Mahsulot nomi" name="name" rules={[{ required: true, message: "Mahsulot nomi kiriting" }]}>
          <Input className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Ismni kiriting" />
        </Form.Item>

        <Form.Item label="Sana" required>
          <div className="flex justify-between items-center gap-2">
            <Form.Item
              name="date"
              noStyle
              rules={[{ required: true, message: "Sanani kiriting" }]}
            >
              <DatePicker
                className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]"
                placeholder="Sanani kiriting"
                value={dateValue}
                onChange={(date) => {
                  setToday(false);
                  setDateValue(date);
                }}
              />
            </Form.Item>

            <Checkbox
              checked={today}
              onChange={(e) => {
                const checked = e.target.checked;
                setToday(checked);
                if (checked) {
                  const todayDayjs = dayjs(); 
                  setDateValue(todayDayjs);
                  form.setFieldsValue({ date: todayDayjs });
                } else {
                  setDateValue(null);
                  form.setFieldsValue({ date: null });
                }
              }}
            >
              Bugungi
            </Checkbox>
          </div>
        </Form.Item>

        
        <Form.Item label="Summa" name="sum" rules={[{ required: true, message: "Summani kiriting" }]}>
          <Input className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Summani kiriting" />
        </Form.Item>

        <Form.Item label="Muddat" name="deadline" rules={[{ required: true, message: "Muddati kiriting" }]}>
          <Select placeholder="Qarz muddatini tanlang"
            options={Array.from({ length: 12 }, (_, i) => ({
              label: `${i + 1} oy`,
              value: `${i + 1} oy`,
            }))}
          />
        </Form.Item>

        {!buttonClick && (
          <Button
            type="default"
            size="large"
            onClick={() => setButtonClick(true)}
            className="!text-blue-500 !border-blue-500"
          >
            Eslatma qo'shish
          </Button>
        )}

        {buttonClick && (
          <Form.Item label="Eslatma" name="note">
            <Input.TextArea rows={4} className="!bg-[#F6F6F6] !rounded-[8px]" placeholder="Eslatmani kiriting" />
          </Form.Item>
        )}
        <Form.Item label="Rasm biriktirish" name="images">
          <UploadImage />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit" className="!mb-[40px] !bg-blue-500 !border-blue-500">
          Saqlash
        </Button>
      </Form>
    </div>
  )
}

export default CreditCreate