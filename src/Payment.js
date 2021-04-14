import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
} from 'antd';
import { Input } from 'antd';


export default class Payment extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", backgroundImage: `url("https://images.pexels.com/photos/132197/pexels-photo-132197.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")` }}>
                <div className="App" style={{ backgroundImage: `url("https://i.pinimg.com/474x/b5/0e/e5/b50ee56824af324da5e7334b448e936f.jpg")`, width: "40%", height: "100%" }}>
                    <div id="PaymentForm">
                        <Form>
                            <Form.Item >
                                <img src="https://caweb.org/wp-content/uploads/2021/03/caweb.org-header-logo-1.png" style={{ width: "300px", paddingTop: "20px" }} />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="First Name"
                                tooltip="Enter your name"
                                rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                                style={{ width: "57%", marginLeft: "17%" }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Last Name"
                                tooltip="Enter your surname"
                                rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
                                style={{ width: "57%", marginLeft: "17%" }}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                                style={{ width: "59%", marginLeft: "15%" }}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                                style={{ width: "50%", marginLeft: "24%" }}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Captcha" extra="We must make sure that your are a human."
                                style={{ width: "50%", marginLeft: "24%" }}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="captcha"
                                            noStyle
                                            rules={[{ required: true, message: 'Please input the captcha you got!' }]}

                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Button>Get captcha</Button>
                                    </Col>
                                </Row>
                            </Form.Item>


                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}

                            >
                                <Checkbox>
                                    Door-to-door
                                </Checkbox>
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>

                                <Cards
                                    cvc={this.state.cvc}
                                    expiry={this.state.expiry}
                                    focused={this.state.focus}
                                    name={this.state.name}
                                    number={this.state.number}

                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    type="tel"
                                    name="number"
                                    placeholder="Card Number"
                                    maxLength={16}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    style={{ width: "250px" }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    type="string"
                                    name="name"
                                    placeholder="Name"
                                    style={{ width: "250px" }}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    type="tel"
                                    name="expiry"
                                    placeholder="Expiry"
                                    style={{ width: "125px" }}
                                    onChange={this.handleInputChange}
                                    maxLength={4}
                                    onFocus={this.handleInputFocus}
                                />
                                <Input
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    style={{ width: "125px" }}
                                    maxLength={3}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div >
        );
    }
}