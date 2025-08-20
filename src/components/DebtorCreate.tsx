"use client"

import { Button, Form, Input, Space } from "antd"
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import Heading from "./Heading"
import { useNavigate } from "react-router-dom"
import { Path } from "../hooks/Path"
import React from "react"
import UploadImage from "./UploadImage"

const DebtorCreate = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [buttonClick, setButtonClick] = React.useState(false)
  const [imageUrls, setImageUrls] = React.useState<string[]>([])

  const onFinish = (values: any) => {
    const formatted = {
      ...values,
      images: imageUrls,
    }
    console.log(formatted)
  }

  const handleImageChange = (urls: string[]) => {
    setImageUrls(urls)
  }

  return (
    <div className="containers">
      <div className="flex text-center gap-17 items-center mb-[32px]">
        <Button
          type="default"
          size="large"
          icon={<ArrowLeftOutlined />}
          className="text-[25px]"
          onClick={() => navigate(Path.debtor)}
        />
        <Heading children="Mijoz yaratish" tag="h1" />
      </div>

      <Form
        form={form}
        className="flex flex-col gap-8"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          phone: [""],
        }}
      >
        <Form.Item label="Ismi" name="name" rules={[{ required: true, message: "Ismni kiriting" }]}>
          <Input className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Ismni kiriting" />
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

        <Form.Item label="Rasm biriktirish">
          <UploadImage onChangeImages={handleImageChange} />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit" className="!mb-[40px] !bg-blue-500 !border-blue-500">
          Saqlash
        </Button>
      </Form>
    </div>
  )
}

export default DebtorCreate
