"use client"

import { useState } from "react"
import { Card, Typography, Input, Dropdown, Button } from "antd"
import {
  MoreOutlined,
  CarOutlined,
  HomeOutlined,
  CoffeeOutlined,
  PaperClipOutlined,
  EllipsisOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons"
import BudgetCard from "./BudgetCard"

const { TextArea } = Input
const { Title, Text } = Typography

const NoteComponent = ({ budget = 0, spent = 0 }) => {
  const [notesVisible, setNotesVisible] = useState(true)

  const items = [
    {
      key: "1",
      label: "Delete section",
    },
    {
      key: "2",
      label: "Collapse all sections",
    },
  ]

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <Title level={5} className="mb-4">
            Reservations and attachments
          </Title>
          <div className="grid grid-cols-6 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <Text className="mt-1 text-xs">Flight</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
                <HomeOutlined />
              </div>
              <Text className="mt-1 text-xs">Lodging</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
                <CarOutlined />
              </div>
              <Text className="mt-1 text-xs">Rental Car</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
                <CoffeeOutlined />
              </div>
              <Text className="mt-1 text-xs">Restaurant</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
                <PaperClipOutlined />
              </div>
              <Text className="mt-1 text-xs">Attachment</Text>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
                <EllipsisOutlined />
              </div>
              <Text className="mt-1 text-xs">Other</Text>
            </div>
          </div>
        </Card>

        <BudgetCard budget={budget} spent={spent} />
      </div>

      <div className="mt-4 rounded-lg">
        <div
          className="flex items-center justify-between p-4 px-0 cursor-pointer"
          onClick={() => setNotesVisible(!notesVisible)}
        >
          <div className="flex items-center">
            {notesVisible ? <DownOutlined /> : <UpOutlined />}
            <Title level={5} className="m-0 ml-2">
              Notes
            </Title>
          </div>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" overlayClassName="custom-dropdown">
            <Button
              type="text"
              icon={<MoreOutlined />}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>

        {notesVisible && (
          <div className="p-4 pt-0">
            <TextArea
              placeholder="Write or paste anything here: how to get around, tips and tricks"
              autoSize={{ minRows: 3 }}
              bordered={false}
              className="bg-gray-100 p-4 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteComponent
