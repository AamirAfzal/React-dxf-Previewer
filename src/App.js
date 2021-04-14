import { useEffect, useState } from "react";
import DxfParser from 'dxf-parser';
import logo from './logo.svg';

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

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { svgerror } from './svgerror.js'


import { UploadOutlined, InboxOutlined } from '@ant-design/icons';


import * as dxf from 'dxf';

// import { DxfViewer } from "dxf-viewer";
import { Anchor } from 'antd';
import './App.css';
const { TextArea } = Input;
const { Link } = Anchor;


function App() {

  const [myfile, setFile] = useState();

  const [size, setsize] = useState([]);
  const [prise, setPrise] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [thickness2, setThickness2] = useState(0);
  const [displaySVG, setDisplaySVG] = useState('');
  const [minX, setminX] = useState(0);
  const [minY, setminY] = useState(0);
  const [maxX, setmaxX] = useState(0);
  const [maxY, setmaxY] = useState(0);
  const [materialPirceTotal, setmaterialPriceTotal] = useState(0);
  const [taxPriceTotal, settaxPriceTotal] = useState(0);
  const [profitPriceTotal, setprofitPriceTotal] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalPriceWithShipment, setTotalPriceWithShipment] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [shipment, setShipment] = useState(false);
  const [X, setX] = useState();
  const [Y, setY] = useState();
  const [material, setmaterial] = useState(null);
  const [mysvg, setsvg] = useState(null)

  const sizes = {
    blackacrylic: [{ len: 2.8, prise: 183, len2: 67000 }],
    clearacrylic: [{ len: 2.2, prise: 150, len2: 50000 },
    { len: 2.1, prise: 150, len2: 50000 }],
    whiteacrylic: [{ len: 2.8, prise: 183, len2: 67000 }],
    mdf: [{ len: 2.7, prise: 15.75, len2: 89250 },
    { len: 4, prise: 17.75, len2: 73500 }]
  };
  useEffect(() => { console.log(prise) }, [prise])
  const selectsize = (value) => {
    setmaterial(value)
    // console.log(sizes[value])
    setsize(sizes[value]);
    console.log(value);
    form.setFieldsValue({ selectthickness: JSON.stringify(sizes[value][0]) })
    setThickness(sizes[value][0].len)
    setThickness2(sizes[value][0].len2);
    setPrise(sizes[value][0].prise);
    setquantity(1)


    // console.log(size)
  };
  const selectshipment = (value) => {
    console.log(value.target.checked)

    // setShipment(value.target.checked)



  }


  const selectprize = (value) => {
    console.log(value + "Obj")
    setPrise(JSON.parse(value)?.prise)
    setThickness(JSON.parse(value)?.len)
    setThickness2(JSON.parse(value)?.len2)


    form.setFieldsValue({ selectprices: prise?.toString() })
    // console.log(size)
  };
  const selectquantity = (value) => {
    console.log(value)
    setquantity(value)
  }
  useEffect(() => {
    setDisplaySVG(mysvg)

    console.log(maxX - minX + "XXX")
    console.log(maxY - minY + "YYY")




    //let regex = /(width|height)=\"[^\"]*\"/g;
    //.toString().replaceAll(regex, ""));


    console.log(thickness)
    console.log(thickness2)
    console.log(prise)
    console.log(quantity)
    console.log(minX)
    console.log(minY)
    console.log(maxX)
    console.log(maxY)
    setX((maxX - minX).toFixed(0))
    setY((maxY - minY).toFixed(0))
    if (shipment == true) {
      setmaterialPriceTotal(0)
      settaxPriceTotal(0)
      setprofitPriceTotal(0)
      settotalPrice(0)
      setTotalPriceWithShipment(0)
    }
    else {
      if (quantity == 0) {
        setmaterialPriceTotal(0)
        settaxPriceTotal(0)
        setprofitPriceTotal(0)
        settotalPrice(0)
        setTotalPriceWithShipment(0)
      }
      else {




        let Area = (maxX - minX) * (maxY - minY)

        console.log("X " + (maxX - minX))
        console.log("Y " + (maxY - minY))

        console.log("Area= " + Area + "mm2")


        console.log("Y" + prise)
        console.log("T" + thickness)
        let amount = ((Area * prise) / thickness2)
        let preciseamount = amount.toFixed(2).toString()
        preciseamount = preciseamount.replace(".", ",")

        setmaterialPriceTotal(preciseamount)

        console.log("Material Price= " + materialPirceTotal)
        let vat = 0.18
        amount = amount + (amount * vat)
        //let netamount = amount + parseInt(( amount * val))
        let precisetax = amount.toFixed(2).toString()
        precisetax = precisetax.replace(".", ",")


        settaxPriceTotal(precisetax)

        console.log("Material Price With Value Added Tax: " + taxPriceTotal)
        let profit = 0.2
        let shipping = 15
        amount = amount + (amount * profit)
        console.log("Material Price With Value Added Tax and Profit: " + profitPriceTotal)
        setprofitPriceTotal(amount)
        console.log("Total Price Wihout Shipment: " + profitPriceTotal)
        amount = amount * quantity
        if (amount > 0 && amount < 15) {
          amount = 15
          settotalPrice(amount)
          let total = amount + shipping
          let precisetotal = total.toFixed(2)
          precisetotal = precisetotal.toString().replace(".", ",")
          console.log(precisetotal + " Precise Total")
          setTotalPriceWithShipment(precisetotal)
          // setTotalPriceWithShipment(total.toFixed(2))
          // let newprice = totalPriceWithShipment.toString().replace(".", ",")
          // console.log(newprice + " Howdy")

          // setTotalPriceWithShipment(newprice)
        }
        else if (amount > 15) {
          settotalPrice(amount)
          let total = amount + shipping
          let precisetotal = total.toFixed(2)
          precisetotal = precisetotal.toString().replace(".", ",")
          console.log(precisetotal + " Precise Total")
          setTotalPriceWithShipment(precisetotal)

          // let newprice = totalPriceWithShipment.toString().replace(".", ",")
          // console.log(newprice + " Howdy")

          // setTotalPriceWithShipment(newprice)
        }
        else {
          amount = 0
          settotalPrice(amount)
          let total = amount + shipping
          let precisetotal = total.toFixed(2)
          precisetotal = precisetotal.toString().replace(".", ",")
          console.log(precisetotal + " Precise Total")
          setTotalPriceWithShipment(precisetotal)
          //setTotalPriceWithShipment(total.toFixed(2))

          // let newprice = totalPriceWithShipment.toString().replace(".", ",")
          // console.log(newprice + " Howdy")

          // setTotalPriceWithShipment(newprice)


        }

      }
    }

  }, [minX, minY, maxX, maxY, thickness, prise, quantity, shipment, X, Y, material])


  const parsefile = (file) => {

    console.log(file)
  };



  const { Option } = Select;
  var form = "";
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };



  return (

    <div style={{
      width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#B2B2B2"
    }}>
      <div style={{ backgroundColor: "white", width: "40%", height: "100vh" }}>
        <Form style={{ color: "red" }}
          name="validate_other"
          {...formItemLayout}
        >
          <div className="cadviewer" ></div>
          <Form.Item >
            <img src="https://caweb.org/wp-content/uploads/2021/03/caweb.org-header-logo-1.png" style={{ width: "300px", marginLeft: "40%", paddingTop: "20px" }} />
          </Form.Item>
          <div style={{ paddingTop: "-20px", transform: [{ rotate: '180deg' }] }}>
            <p style={{ position: "relative", left: "340px", transform: [{ rotate: '180deg' }], color: "black" }}>{X}mm</p>
            <p style={{ position: "relative", left: "10px", top: "185px", transform: [{ rotate: '180deg' }], color: "black" }}>{Y}mm</p>
          </div>

          <div style={{ marginRight: 50, marginLeft: 80, height: "420px", border: "1px solid black", position: "relative", top: "-40px" }}>

            <div style={{ height: "100%", display: "flex", justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: displaySVG }}>

            </div>

          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "10px" }}>
            <Form.Item name="checkbox-group" label=" Kapıdan kapıya ödeme " >
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox onChange={selectshipment}></Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="checkbox-group1" label=" Sözleşme Kutusu ">
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox ></Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>

        </Form>


      </div>
      <div className="App" style={{ backgroundColor: "white", width: "40%", height: "100vh" }}>
        <Form
          name="validate_other"
          ref={f => form = f}
          {...formItemLayout}

          onFinish={onFinish}
          initialValues={{
            ['input-number']: 1,
          }}
        >
          <Form.Item >
            <img src="https://caweb.org/wp-content/uploads/2021/03/caweb.org-header-logo-1.png" style={{ width: "300px", marginLeft: "40%", paddingTop: "20px" }} />
          </Form.Item>
          <Form.Item style={{ color: "red" }}
            name="Material"
            label="Materyal"
            hasFeedback
            rules={[{ required: true, message: 'Lütfen Materyal Seçin!' }]}

          >
            <Select placeholder="Lütfen Materyal Seçin" onChange={selectsize}>
              <Option value="blackacrylic">Black Acrylic</Option>
              <Option value="clearacrylic">Clear Acrylic</Option>
              <Option value="whiteacrylic">White Acrylic</Option>
              <Option value="mdf">MDF</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="selectthickness"
            label="Kalınlık"
            hasFeedback

            rules={[{ required: true, message: 'Lütfen Kalınlık Seçin!' }]}

          >
            <Select placeholder="Lütfen Kalınlık Seçin" onChange={selectprize} >
              {size.map((s, key) => (
                <option key={key} value={JSON.stringify(s)} >{s.len}mm</option>

              )

              )}

            </Select>
          </Form.Item>




          <Form.Item label="Adet">
            <Form.Item name="input-number" noStyle >
              <InputNumber min={1} max={1000} onChange={selectquantity} />
            </Form.Item>
          </Form.Item>



          {/* <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}

          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
          </Button>
            </Upload>
          </Form.Item> */}
          {/* <div className="cadviewer"></div> */}
          {/* <Form.Item label="Dosya">
            <Upload.Dragger name="files"
              accept=" .dxf"
              beforeUpload={(file) => {
                console.log("hhhh");

                let reader = new FileReader();
                reader.onload = e => {
                  //   var parser = new DxfParser();
                  // var dxf = parser.parseSync(e.target.result);
                  // dxf.entities = dxf.entities.map(E => ({...E, updateWorldMatrix: () => {},children: []}));
                  // console.log(dxf)

                  var parsed = dxf.parseString(e.target.result);
                  var svg = dxf.toSVG(parsed);
                  console.log(parsed)





                  setmaxX(parsed.header.extMax.x)

                  setminX(parsed.header.extMin.x)

                  setmaxY(parsed.header.extMax.y)

                  setminY(parsed.header.extMin.y)


                  //let regex = /(width|height)=\"[^\"]*\"/g;
                  setDisplaySVG(svg)//.toString().replaceAll(regex, ""));


                  // console.log(ThreeDxfLoader)
                  // var cadCanvas = new ThreeDxfLoader.Viewer(dxf, document.getElementsByClassName('cadviewer'), 400, 400);
                  // let viewer = new DxfViewer(document.getElementsByClassName('cadviewer'));
                  // viewer.Load(e.target.result);
                  // var font
                  // var loader = new THREE.FontLoader();
                  // loader.load( './font.json', function ( response ) {
                  //   font = response;
                  // });
                  //new ThreeDxf.Viewer(dxf, document.getElementsByClassName('cadviewer'),400,400,undefined)

                }
                reader.readAsText(file);
                // Prevent upload
                return false;
              }}>

              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Yüklemek için dosyayı bu alana tıklayın veya sürükleyin</p>
              <p className="ant-upload-hint">Tek veya toplu yükleme desteği.</p>
            </Upload.Dragger>
          </Form.Item> */}
          <Form.Item>
            <input type="file"

              style={{ marginLeft: "80%" }}
              accept=" .dxf"
              onChange={(file) => {
                console.log("hhhh");

                let reader = new FileReader();
                reader.onload = e => {
                  //   var parser = new DxfParser();
                  // var dxf = parser.parseSync(e.target.result);
                  // dxf.entities = dxf.entities.map(E => ({...E, updateWorldMatrix: () => {},children: []}));
                  // console.log(dxf)

                  var parsed = dxf.parseString(e.target.result);
                  var svg = dxf.toSVG(parsed);
                  console.log(parsed)
                  console.log(material)
                  setmaxX(parsed.header.extMax.x)

                  setminX(parsed.header.extMin.x)

                  setmaxY(parsed.header.extMax.y)

                  setminY(parsed.header.extMin.y)

                  setsvg(svg)












                  // console.log(ThreeDxfLoader)
                  // var cadCanvas = new ThreeDxfLoader.Viewer(dxf, document.getElementsByClassName('cadviewer'), 400, 400);
                  // let viewer = new DxfViewer(document.getElementsByClassName('cadviewer'));
                  // viewer.Load(e.target.result);
                  // var font
                  // var loader = new THREE.FontLoader();
                  // loader.load( './font.json', function ( response ) {
                  //   font = response;
                  // });
                  //new ThreeDxf.Viewer(dxf, document.getElementsByClassName('cadviewer'),400,400,undefined)

                }
                reader.readAsText(file.target.files[0]);
                // Prevent upload
                return false;
              }}

            >
            </input>

          </Form.Item>
          <Form.Item>

            <h4 style={{ color: "gray" }}> Materyal Fiyat: <span>{materialPirceTotal}TL</span></h4>
            <h4 style={{ color: "gray" }}> Materyal Fiyat İle VAT: <span>{taxPriceTotal}TL</span></h4>
            {/* <h4 style={{ color: "purple" }}>Material Price With VAT And Profit: {profitPriceTotal.toFixed(2)}TL</h4> */}
            {/* <h4 style={{ color: "purple" }}>Total Price Without Shipment: {totalPrice.toFixed(2)}TL</h4> */}
            <h4 style={{ color: "gray" }}>Toplam Fiyat İle gönderi: {totalPriceWithShipment}TL</h4>

          </Form.Item>



          <h3 style={{ color: "gray" }}>Dosyayla ilgili eklemek istedikleriniz</h3>

          <Form.Item>
            <TextArea style={{ marginLeft: "35%" }} rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>

            {/* "https://caweb.org/" */}
            <Button type="primary" htmlType="submit"

              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'https://caweb.org/';
              }}
            >
              Sepete Ekle
            </Button>

          </Form.Item>
        </Form>

      </div>




    </div >
  );
}

export default App;