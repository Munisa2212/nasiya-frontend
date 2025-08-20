
"use client"

import { Button, Form, Input, Space } from "antd"
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import React, { use, useEffect } from "react"
import { Path } from "../../hooks/Path"
import Heading from "../../components/Heading"
import UploadImage from "../../components/UploadImage"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import { useQuery } from "@tanstack/react-query"

const DebtorCreate = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [buttonClick, setButtonClick] = React.useState(false)
  const [cookie] = useCookies(['token'])
  const {id} = useParams()

  const { data } = useQuery({
    queryKey: ["get-debtor", id],
    queryFn: () =>
      instance
        .get(`/debtor/${id}`, {
          headers: { Authorization: `Bearer ${cookie.token}` },
        })
        .then((res) => res.data),
    enabled: !!id, 
    refetchOnMount: false,
  });

  console.log(data)
    useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        images: data.debtor_image.map((item: any) => item.image),
        phone: data.debtor_phone.map((item: any) => item.phone),
        address: data.address,
        note: data.note
      });
    }
  }, [data, form]);

  const onFinish = (values: any) => {
    if(id){
      instance
      .patch(`/debtor/${id}`, values, { headers: { Authorization: `Bearer ${cookie.token}` } })
      .then(() => navigate(Path.debtor));
      return
    }
    const payload = {
      ...values,
      phone: values.phone || [],
      image: values.image || [],
    };

    instance
      .post("/debtor", payload, { headers: { Authorization: `Bearer ${cookie.token}` } })
      .then(() => navigate(Path.debtor));
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
        <Heading children="Mijoz yaratish" tag="h1" />
      </div>

      <Form
        form={form}
        className="flex flex-col gap-2"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          phone: [""],
          images: []
        }}
      >
        <Form.Item label="Ismi" name="name" rules={[{ required: true, message: "Ismni kiriting" }]}>
          <Input className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Ismni kiriting" value={id ? data?.name : ""} />
        </Form.Item>

        <Form.Item label="Telefon raqami">
          <Form.List name="phone">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex", marginBottom: 8, width: "100%" }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: "Telefon raqami kiriting" }]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="+998 XX XXX XX XX" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
                    )}
                  </Space>
                ))}
                <Button
                  type="link"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  className="!text-blue-500 !p-0 !h-auto"
                >
                  Ko'proq qo'shish
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label="Yashash manzili" name="address">
          <Input className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Yashash manzilini kiriting" />
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
        <Form.Item label="Rasm biriktirish" name="image">
          <UploadImage />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit" className="!mb-[40px] !bg-blue-500 !border-blue-500">
          Saqlash
        </Button>
      </Form>
    </div>
  )
}

export default DebtorCreate
