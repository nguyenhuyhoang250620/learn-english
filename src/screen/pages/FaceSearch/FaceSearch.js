import React, { useState } from 'react';
import { Form, Select, Row, Col, Tabs, Button, TreeSelect, DatePicker } from "antd";
import { CloseCircleTwoTone } from '@ant-design/icons';
import _ from 'lodash';
import dayjs from 'dayjs';

// Component
import Label from '../../../common/component/Label/index';

// Img
import AddImg from '../../../assets/images/add-img.svg';

import style from "./styles/Search.module.scss"
const { Option } = Select;


const DefaultValue = {
    cameraIds: null,
    timeType: 2,
    fromDate: dayjs().startOf('days'),
    toDate: dayjs().endOf('days'),
};

let idSetInterval = null;
const baseImgs = [];

function FaceSearch() {
    const [form] = Form.useForm();
    const [imgLocals, setImgLocals] = useState([]);
    const [isShowTimeRange, setIsShowTimeRange] = useState(true);
    const [editImgModal, setEditImgModal] = useState(false);
    const [currentImgEdit, setCurrentImgEdit] = useState('');
    const [currentIndexImgEdit, setCurrentIndexImgEdit] = useState();
    const [showTextResult, setShowTextResult] = useState(false);

    const onSearch = values => {
        setShowTextResult(true);
    };

    const { TabPane } = Tabs;

    return (
        <article>
            <div className={style.Wrapper}>
                <Tabs className={style.tabs}>
                    <TabPane className={style.tabPane} tab="Theo ảnh" key="1">
                        <Form form={form} initialValues={DefaultValue} onFinish={onSearch}>
                            <Row className={style.containerInfo}>
                                <Col span={12}>
                                    <Row
                                        gutter={[30]}
                                    >
                                        <Col span={24}>
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
                                                    placeholder="Chọn Camera"
                                                    showSearch
                                                    filterTreeNode={(search, item) =>
                                                        item.title
                                                            .toLowerCase()
                                                            .indexOf(search.toLowerCase()) >= 0
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
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
                                        </Col>
                                        <Col span={16}>
                                            {isShowTimeRange ? (
                                                <Row>
                                                    <Col span={12}>
                                                        <Label
                                                            title="Từ ngày"
                                                        />
                                                        <Row align="middle">
                                                            <Form.Item
                                                                name="fromDate"
                                                                style={{ marginBottom: 0 }}
                                                            >
                                                                <DatePicker
                                                                    className={style.datePicker}
                                                                    style={{ width: '100%' }}
                                                                    placeholder="placeholderFromDate"
                                                                    clearIcon={false}
                                                                    showTime
                                                                    showNow
                                                                />
                                                            </Form.Item>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Label
                                                            title="Đến ngày"
                                                        />
                                                        <Row align="middle">
                                                            <Form.Item
                                                                name="toDate"
                                                                style={{ marginBottom: 0 }}
                                                            >
                                                                <DatePicker
                                                                    className={style.datePicker}
                                                                    placeholder="placeholderToDate"
                                                                    clearIcon={false}
                                                                    showTime
                                                                    showNow
                                                                />
                                                            </Form.Item>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            ) : null}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row className={style.row} gutter={[15, 10]} id="upload-image-people">
                                        {_.compact(imgLocals).length < 8 ? (
                                            <Col className={style.column} span={6}>
                                                <div className={style.contentImg}>
                                                    <label
                                                        style={{ width: '100%', height: '100%' }}
                                                        htmlFor="file"
                                                    >
                                                        <img
                                                            src={AddImg}
                                                            alt="Fallback"
                                                            style={{
                                                                height: 130,
                                                                width: '100%',
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    </label>
                                                    <input
                                                        multiple
                                                        style={{ display: 'none' }}
                                                        id="file"
                                                        type="file"
                                                        name="selectedFile"
                                                        accept=".jpg, .jpeg, .png"
                                                        onChange={async event => {
                                                            _.forEach(
                                                                _.flatMap(event.target.files, (val, keyName) =>
                                                                    keyName !== 'length' ? val : null,
                                                                ),
                                                                (val, keyName) => {
                                                                    if (
                                                                        keyName !== 'length' &&
                                                                        _.compact(imgLocals).length + keyName < 8
                                                                    ) {
                                                                        const reader = new FileReader();
                                                                        reader.readAsDataURL(val);
                                                                        reader.onload = e => {
                                                                            const image = document.createElement(
                                                                                'img',
                                                                                {
                                                                                    className: 'img-upload',
                                                                                    id: `img-${imgLocals.length +
                                                                                    keyName}`,
                                                                                },
                                                                            );
                                                                            image.height = 130;
                                                                            image.width = '100%';
                                                                            image.src = e.target.result;
                                                                            baseImgs.push(e.target.result);
                                                                            document
                                                                                .getElementById(
                                                                                    `img-upload-${imgLocals.length +
                                                                                    keyName}`,
                                                                                )
                                                                                .appendChild(image);
                                                                        };
                                                                    }
                                                                },
                                                            );
                                                            setImgLocals([
                                                                ...imgLocals,
                                                                ..._.compact(
                                                                    _.flatMap(
                                                                        event.target.files,
                                                                        (val, keyName) =>
                                                                            keyName !== 'length' &&
                                                                            _.compact(imgLocals).length + keyName < 8
                                                                                ? val
                                                                                : null,
                                                                    ),
                                                                ),
                                                            ]);
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        ) : null}
                                        <Col
                                            style={{ padding: 0 }}
                                            span={_.compact(imgLocals).length < 8 ? 18 : 24}
                                        >
                                            <div className={style.scroll}>
                                                {_.map(imgLocals, (image, index) => (
                                                    <Col
                                                        className={style.column}
                                                        span={8}
                                                        key={index}
                                                        id={`container-img-upload-${index}`}
                                                    >
                                                        <div
                                                            className={style.contentImg}
                                                            id={`img-upload-${index}`}
                                                            onClick={() => {
                                                                if (
                                                                    document.getElementById(`img-upload-${index}`)
                                                                ) {
                                                                    setCurrentImgEdit(baseImgs[index]);
                                                                    setCurrentIndexImgEdit(index);
                                                                    setEditImgModal(true);
                                                                }
                                                            }}
                                                        >
                                                            <div
                                                                className="close-img-upload"
                                                                style={{ position: 'absolute', right: 20 }}
                                                            >
                                                                <CloseCircleTwoTone
                                                                    style={{ color: '#fa127c', fontSize: 16 }}
                                                                    twoToneColor="#fa127c"
                                                                    onClick={() => {
                                                                        document
                                                                            .getElementById(
                                                                                `container-img-upload-${index}`,
                                                                            )
                                                                            .remove();
                                                                        const tempArr = [...imgLocals];
                                                                        tempArr[index] = null;
                                                                        baseImgs[index] = null;
                                                                        setImgLocals(tempArr);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Row style={{ width: '100%', paddingRight: 20 }} justify="end">
                                    <Row justify="end">
                                        <Button onClick={() => {
                                            setShowTextResult(true);
                                        }} ghost type="primary" htmlType="submit">
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
                    </TabPane>
                    <TabPane
                        className={style.tabPane}
                        tab="Theo thuộc tính"
                        key="2"
                    >
                        <span>Content Tab 2</span>
                    </TabPane>
                </Tabs>
            </div>
        </article>
    );
}

export default FaceSearch;
