import React, { useState } from 'react';
import { Form, Select, Row, Col, Tabs, Button, TreeSelect, DatePicker, Input } from "antd";
import dayjs from 'dayjs';

// Component
import Label from '../../../common/component/Label/index';

// Style
import style from "./styles/Search.module.scss"

// const
const { Option } = Select;

const DefaultValue = {
    cameraIds: null,
    timeType: 2,
    fromDate: dayjs().startOf('days'),
    toDate: dayjs().endOf('days'),
};

let idSetInterval = null;
const baseImgs = [];

function LicensePlateSearch() {
    const [form] = Form.useForm();
    const [isShowTimeRange, setIsShowTimeRange] = useState(true);
    const [showTextResult, setShowTextResult] = useState(false);

    const onSearch = values => {
        setShowTextResult(true);
    };

    const { TabPane } = Tabs;

    return (
        <article>
            <div className={style.Wrapper}>
                <Form form={form} initialValues={DefaultValue}>
                    <Row className={style.containerInfo}>
                        <Col span={12} style={{ paddingRight: 15 }}>
                            <Label
                                title="Biển số"
                                isRequired
                            />
                            <Form.Item
                                name="noPlate"
                                rules={[
                                    {
                                        required: true,
                                        message: "Biển số là bắt buộc",
                                    },
                                ]}
                            >
                                <Input
                                    className={style.input}
                                    placeholder="Nhập biển số"
                                />
                            </Form.Item>
                            <Label title="Camera" isRequired />
                            <Form.Item
                                name="cameraIds"
                                rules={[
                                    {
                                        required: true,
                                        message: "Camera là bắt buộc",
                                    },
                                ]}
                                valuePropName="selectedkeys"
                            >
                                <TreeSelect
                                    className={style.treeSelect}
                                    treeCheckable
                                    placeholder="Chọn camera"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 15 }}>
                            <Label
                                title="Thời gian"
                                isRequired
                            />
                            <Form.Item name="timeType">
                                <Select
                                    className={style.container}
                                    style={{ width: '100%' }}
                                    onChange={e => {
                                        if (e === 2) {
                                            setIsShowTimeRange(true);
                                            clearInterval(idSetInterval);
                                        } else setIsShowTimeRange(false);
                                    }}
                                >
                                    <Option value={1}>
                                        Hiện tại
                                    </Option>
                                    <Option value={2}>
                                        Khoảng thời gian
                                    </Option>
                                </Select>
                            </Form.Item>
                            {isShowTimeRange ? (
                                <Row gutter={[40, 0]}>
                                    <Col span={12}>
                                        <Label
                                            title="Từ ngày"
                                        />
                                        <Form.Item name="fromDate" style={{ marginBottom: 0 }}>
                                            <DatePicker
                                                className={style.datePicker}
                                                style={{ width: '100%' }}
                                                placeholder="placeholderFromDate"
                                                clearIcon={false}
                                                showTime
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Label title="Đến ngày" />
                                        <Form.Item name="toDate" style={{ marginBottom: 0 }}>
                                            <DatePicker
                                                className={style.datePicker}
                                                style={{ width: '100%' }}
                                                placeholder="placeholderToDate"
                                                clearIcon={false}
                                                showTime
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ) : null}
                        </Col>
                        <Row style={{ width: '100%', paddingRight: 15 }} justify="end">
                            <Row justify="end" style={{ paddingBottom: 20 }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        onSearch();
                                        setShowTextResult(true);
                                    }}
                                    ghost
                                >
                                    Tìm kiếm
                                </Button>
                            </Row>
                        </Row>
                    </Row>
                </Form>
                {isShowTimeRange && (
                    <div className={style.containerResult}>
                        {showTextResult ? (
                            <div className={style.showResult}>
                                kết quả tìm kiếm:
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </article>
    );
}
export default LicensePlateSearch;
