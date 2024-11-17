import { EditOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Row, Space, Tabs, Tag, Typography } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Charges from './Charges'
import ReactToPrint from 'react-to-print'
import MemberShipTabOneDetails from './MemberShipTabOneDetails'
import CreateCharges from '../Forms/CreateCharges'
function MemberShipPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("1"); // Initialize active tab key
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const componentRef = useRef();

  return (
    <>
      <CreateCharges
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Charges"
      />

      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey} // Update activeKey on tab change
        tabBarExtraContent={
          activeKey === "2" && ( // Conditionally render the print button
            <Space>
              <Button type="primary" onClick={openModal}>
                Create Charges
              </Button>

              <ReactToPrint
                trigger={() => <Button type="primary">Print Selected Charges</Button>}
                content={() => componentRef.current}
              />

            </Space>)
        }
      >
        <TabPane tab="MemberShip Details" key={"1"}>
          <MemberShipTabOneDetails />
        </TabPane>
        <TabPane tab="Charges" key={"2"}>
          <Charges componentRef={componentRef} />
        </TabPane>
      </Tabs>
    </>
  )
}

export default MemberShipPreview;
