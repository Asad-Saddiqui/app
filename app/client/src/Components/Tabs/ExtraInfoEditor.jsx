import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Button, Row, Col, Divider } from 'antd';

const ExtraInfoEditor = ({ editorData, setEditorData }) => {



    return (
        <>
            <Row gutter={8}>
                {/* Land Size */}
                <Col sm={23} md={23} lg={23} xl={23} xxl={23}>
                    <Divider>Description</Divider>
                </Col>
                <Col sm={23} md={23} lg={23} xl={23} xxl={23}>
                    <Form.Item label="Notes" name="notes">

                        <CKEditor

                            editor={ClassicEditor}
                            data={editorData}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorData(data);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default ExtraInfoEditor;
