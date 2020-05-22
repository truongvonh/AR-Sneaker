import React from "react";
import Arweave from "arweave/web";
import { Decimal } from "decimal.js";
import {
  createTransaction,
  signAndDeployTransaction,
  getAddressAndBalance,
  openNotificationWithIcon,
} from "./utils/arweaveUtils";

import { Layout, Card, Modal, Button, Row, Col, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./App.css";

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Meta } = Card;

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  timeout: 20000,
  logging: false,
});
const data = [
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/78/48/74/14784874_26282782_300.jpg",
    title: "Golden Goose",
    img2:
      "https://cdn-images.farfetch-contents.com/14/78/48/74/14784874_26282784_1000.jpg",
    html: `The hardest thing about being a Grown-Up? Keeping your sneakers pearly white and clean as can be....well, you don't have to worry with these hand-distressed Superstar sneakers - with a scuffed design and an off-white hue, Golden Goose have done the hard work for you. No leather protectant, no problem. Featuring a round toe, a lace-up front fastening, a logo patch at the tongue, a branded insole, branded heel counter, a flat rubber sole, distressed effects, a star motif at the sidewall and a gold-tone lettered logo at the sidewall.`,
    description: "Superstar lace-up sneakers",
    price: 0.05,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/15/07/26/54/15072654_26833072_300.jpg",
    title: "New Balance",
    img2:
      "https://cdn-images.farfetch-contents.com/15/07/26/54/15072654_26833073_1000.jpg",
    html: `Sold your 'sole' to style? So did these ML827 sneakers from New Balance - and with their front lace-up fastening and reflective detailing, this pair might have done a deal with the Devil but they'd rather be in your wardrobe than the underworld. Though we've heard that Hades has a pair too. Featuring a round toe, a lace-up front fastening, a pull tab at the rear, a logo patch to one side, reflective detailing and a thick rubber sole.`,
    description: "ML827 low-top sneakers",
    price: 0.5,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/81/73/07/14817307_26966214_300.jpg",
    title: "ASICS",
    img2:
      "https://cdn-images.farfetch-contents.com/14/81/73/07/14817307_26966215_1000.jpg",
    html: `Sold your 'sole' to style? So did these GEL-Kiril sneakers from ASICS x Kiko Kostadinov - and with their front lace-up fastening and two-tone design, this pair might have done a deal with the Devil but they'd rather be in your wardrobe than the underworld. Though we've heard that Hades has a pair too. Featuring a round toe, a lace-up front fastening, branded heel counter, a rubber sole and a checkered panel at the sidewall.`,
    description: "x Kiko Kostadinov GEL-Kiril sneakers",
    price: 1.5,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/75/46/81/14754681_26076373_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/14/75/46/81/14754681_26076375_1000.jpg",
    html: `You'll never need to compromise on style with Moncler's Montpellier sneakers just because they're comfortable. They're, naturally, punctuated with the brand's signature and diagonal stripes at the sides. Earn yours by adding them to your basket. Featuring a white rubber sole, a front lace up detail and a contrasting heel counter.`,
    title: "Moncler",
    description: "Montpellier striped logo-print sneakers",
    price: 2,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/19/11/87/14191187_22708117_300.jpg",
    title: "Valentino",
    img2:
      "https://cdn-images.farfetch-contents.com/14/71/23/45/14712345_26474811_1000.jpg",
    html: `Are you a sneakerhead? Then you surely need to have these black Valentino Garavani Climbers sneakers from Valentino in your wardrobe. Designed with a white logo print on the side, they'll make you stand out in the streets. Keep it up. Featuring a round toe, a lace-up front fastening, a logo patch at the tongue, a ridged rubber sole and a Valentino Garavani logo print on the side.`,
    description: "Valentino Garavani Climber sneakers",
    price: 2,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/98/98/07/14989807_25932205_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/14/98/98/07/14989807_25932207_1000.jpg",
    html: `Converse's Chuck sneakers are as classic as they come, and you can't beat a classic. Red alert! Featuring a rubber sole, a front lace up detail and an almond toe.`,
    title: "Converse",
    description: "Chuck 70mm low top sneakers",
    price: 0.1,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/19/40/03/14194003_24731865_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/14/19/40/03/14194003_24731868_1000.jpg",
    html: `Sneakers with sole. These M997 sneakers from New Balance will take you far and wide... literally. So, where to? Featuring a round toe, a lace-up front fastening, a logo patch at the tongue, a branded insole, branded heel counter, a logo at the sidewall, a panelled design and a rubber sole.`,
    title: "New Balance",
    description: "M997 lace-up sneakers",
    price: 0.2,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/15/34/02/42/15340242_26808743_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/15/34/02/42/15340242_26808742_1000.jpg",
    html: `White, red and black leather and rubber side script sneakers from Y-3 featuring a round toe, a lace-up front fastening, a brand embossed tongue, a branded insole and a white rubber sole.`,
    title: "Y-3",
    description: "side script sneakers",
    price: 0.9,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/81/48/90/14814890_25288303_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/14/81/48/90/14814890_25288308_480.jpg",
    html: `Who said that sneakers are scruffy? These elegant black leather B court sneakers from Balmain have a minimalistic style with a silver-tone logo plaque adorning the side of the shoe that shimmers with each step you take. Say hello to your unexpected solemate. Featuring a round toe, a lace-up front fastening, a brand embossed tongue, a branded insole, branded heel counter, and a flat rubber sole.`,
    title: "Balmain",
    description: "B court sneakers",
    price: 0.5,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/15/18/10/64/15181064_26152939_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/15/18/10/64/15181064_26152940_1000.jpg",
    title: "Moschino",
    description: "panelled colour-block sneakers",
    html: `You're sure to stand out in this pair. In true Moschino style, these low-top sneakers are perfectly quirky. Bright colours will cheer up any look.`,
    price: 1.9,
  },

  {
    img:
      "https://cdn-images.farfetch-contents.com/14/60/70/23/14607023_24621671_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/14/60/70/23/14607023_24621672_480.jpg",
    title: "Alexander McQueen",
    html: `Enjoy dressing like you're ready to take on a marathon but prefer a brisk walk to the nearest burger restaurant instead? These black leather reflective runner sneakers from Alexander McQueen may not be the first option for a workout but with striking contrasting panel construction and decorative perforations, you'll love these Italian crafted lightweight shoes. The only running happening here is the bill at the end of dinner. Featuring a round toe, a lace-up front fastening, a logo tag, a branded insole, branded heel counter and a ridged rubber sole.`,
    description: "reflective runner sneakers",
    price: 0.1,
  },
  {
    img:
      "https://cdn-images.farfetch-contents.com/14/78/48/88/14784888_26095368_300.jpg",
    img2:
      "https://cdn-images.farfetch-contents.com/14/78/48/88/14784888_26095370_480.jpg",
    html: `The hardest thing about being a Grown-Up? Keeping your sneakers pearly white and clean as can be....well, you don't have to worry with these hand-distressed Superstar sneakers - with a scuffed design and an off-white hue, Golden Goose have done the hard work for you. No leather protectant, no problem. Featuring a round toe, a lace-up front fastening, a logo patch at the tongue, a branded insole, branded heel counter, a flat rubber sole, distressed effects, a gold-tone logo at the sidewall and a silver-tone star motif applique at the sidewall.`,
    title: "Golden Goose",
    description: "Superstar distressed-effect sneakers",
    price: 0.8,
  },
];
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class App extends React.Component {
  state = {
    loading: false,
    loadWallet: false,
    walletData: "",
    creatingTx: false,
    arwAddress: "",
    arwBalance: 0,

    newBalance: 0,
    selected: null,
    openModel: false,
    openLogin: false,
  };

  handleCloseTxModal = () => this.setState({ modalTx: false });
  handleCloseModal = () => this.setState({ openModel: false });
  handleCloseLogin = () => this.setState({ openLogin: false });

  handleFileUpload = async (e, nameEvent) => {
    const rawWallet = await this.readWallet(e.target.files[0]);
    this.setState({ [nameEvent]: rawWallet });
  };

  readWallet = (walletFile) => {
    const readAsDataURL = (walletFile) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => {
          reader.abort();
          reject();
        };
        reader.addEventListener(
          "load",
          () => {
            resolve(reader.result);
          },
          false
        );
        reader.readAsText(walletFile);
      });
    };
    return readAsDataURL(walletFile);
  };

  confirmLoadWallet = async () => {
    try {
      this.setState({ loading: true });
      const walletData = this.state.loadWalletData;
      let walletObj = JSON.parse(walletData);
      const { address, balance } = await getAddressAndBalance(walletObj);

      this.setState({
        loading: false,
        loadWallet: true,
        walletData: walletObj,
        arwAddress: address,
        arwBalance: balance,
        loadWalletData: "",
        openLogin: false,
      });
    } catch (err) {
      this.setState({ loading: false });
      openNotificationWithIcon(
        "error",
        "Error",
        "Something wrong, check your file key"
      );
    }
  };

  change = (e, name) => {
    this.setState({
      [name]: e,
    });
  };
  transferCrypto = async () => {
    try {
      this.setState({ creatingTx: true });
      const arReceiverAddress = "T6fG7u0TiSvl4wWIUq1dCdABckiRFcDD8aFCl2-JLi8";
      const { arwBalance, walletData, selected } = this.state;
      const arValue = selected && selected.price;
      if (arValue <= arwBalance) {
        let transaction = await createTransaction(
          arReceiverAddress,
          arValue,
          walletData
        );
        let fee = arweave.ar.winstonToAr(transaction.reward);
        let result = await Decimal.add(fee, arValue).valueOf();

        let newBalance = await Decimal.sub(arwBalance, result).valueOf();
        if (newBalance < 0) {
          this.setState({ creatingTx: false }, () => {
            openNotificationWithIcon(
              "error",
              "Error Message!",
              "Your balance is not enough to buy this sneaker"
            );
          });
          return;
        }
        const response = await signAndDeployTransaction(
          transaction,
          walletData
        );
        if (response.data === "OK" && response.status === 200) {
          this.setState(
            {
              creatingTx: false,
              openModel: false,
              arwBalance: newBalance,
            },
            () => {
              openNotificationWithIcon(
                "success",
                "Success Message!",
                "You buy this sneaker, we will send to you soon. Thank you!"
              );
            }
          );
          return;
        } else {
          openNotificationWithIcon(
            "error",
            "Error Message!",
            "Transaction Failed"
          );
        }
      } else {
        this.setState({ creatingTx: false }, () => {
          openNotificationWithIcon(
            "error",
            "Error Message!",
            "Your balance is not enough to buy this sneaker"
          );
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({ creatingTx: false }, () => {
        openNotificationWithIcon(
          "error",
          "Error Message!",
          "Something wrong, please try again!"
        );
      });
    }
  };

  render() {
    const {
      loading,
      selected,
      openModel,
      openLogin,
      creatingTx,
      walletData,
      arwAddress,
      arwBalance,
      fullname,
      address,
      phone,
      email,
      size,
      postcode,
    } = this.state;
    const checkForm =
      !fullname || !address || !phone || !email || !size || !postcode;
    return (
      <Layout className="font-default">
        <Header className="header">
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 className="title">AR SNEAKERS</h1>
            {!walletData ? (
              <Button
                size="large"
                style={{ marginRight: "10%" }}
                onClick={() => this.setState({ openLogin: true })}
              >
                Login to Arweave
              </Button>
            ) : (
              <div style={{ marginRight: "10%", fontSize: "15px" }}>
                <p>
                  {arwAddress}: {arwBalance}
                </p>
              </div>
            )}
          </div>
        </Header>
        <Content
          className="container"
          style={{
            minHeight: "calc(100vh - 94px)",
            overflow: "initial",
          }}
        >
          <Modal
            title="Confirm Buy Sneaker"
            onCancel={this.handleCloseModal}
            visible={openModel}
            footer={[
              <Button
                key="back"
                style={{
                  paddingLeft: "60px",
                  paddingRight: "60px",
                  marginRight: "20px",
                }}
                onClick={this.handleCloseModal}
              >
                No
              </Button>,
              <Button
                key="submit"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                loading={creatingTx}
                disabled={creatingTx || checkForm}
                onClick={this.transferCrypto}
              >
                Yes
              </Button>,
            ]}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ price: selected && selected.price }}
            >
              <Form.Item label="Full name" name="fullname">
                <Input
                  onChange={(e) => {
                    this.change(e.target.value, "fullname");
                  }}
                />
              </Form.Item>
              <Form.Item label="Size" name="size">
                <Input
                  onChange={(e) => {
                    this.change(e.target.value, "size");
                  }}
                />
              </Form.Item>
              <Form.Item label="E-mail" name="email">
                <Input
                  onChange={(e) => {
                    this.change(e.target.value, "email");
                  }}
                />
              </Form.Item>
              <Form.Item label="Phone number" name="phone">
                <Input
                  onChange={(e) => {
                    this.change(e.target.value, "phone");
                  }}
                />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input
                  onChange={(e) => {
                    this.change(e.target.value, "address");
                  }}
                />
              </Form.Item>
              <Form.Item label="Postcode" name="postcode">
                <Input
                  onChange={(e) => {
                    this.change(e.target.value, "postcode");
                  }}
                />
              </Form.Item>
              <Form.Item label="Note" name="note">
                <TextArea row={4} />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input disabled />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Login to Arweave"
            style={{ textAlign: "center" }}
            onCancel={this.handleCloseLogin}
            visible={openLogin}
            footer={[
              <Button
                key="back"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                onClick={this.handleCloseLogin}
              >
                No
              </Button>,
              <Button
                key="submit"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                loading={loading}
                onClick={this.confirmLoadWallet}
              >
                Yes
              </Button>,
            ]}
          >
            <input
              style={{ paddingBottom: 10 }}
              type="file"
              accept=".json"
              onChange={(e) => {
                this.handleFileUpload(e, "loadWalletData");
              }}
            />
          </Modal>
          {selected && (
            <div>
              <ArrowLeftOutlined
                onClick={() => {
                  this.setState({ selected: null });
                }}
                style={{ fontSize: "30px", marginBottom: "20px" }}
              />
              <Row>
                <Col span={18}>
                  <img
                    alt=''
                    src={selected.img2}
                    style={{ width: "80%", height: "auto" }}
                  ></img>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontSize: "20px" }}>Detail:</p>
                    <p>{selected.html}</p>
                    <strong style={{ fontSize: "20px" }}>
                      {selected.title}
                    </strong>
                    <p style={{ fontSize: "15px" }}>{selected.description}</p>
                    <strong style={{ fontSize: "20px" }}>
                      AR {selected.price}
                    </strong>
                    <Button
                      onClick={() => {
                        if (!walletData) {
                          openNotificationWithIcon(
                            "error",
                            "Error",
                            "Please login your wallet!"
                          );
                        } else {
                          this.setState({ openModel: true });
                        }
                      }}
                      style={{ marginTop: "30px" }}
                      size={"large"}
                    >
                      Buy
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          {!selected && (
            <Row
              gutter={[16, 8]}
              justify={"space-between"}
              type="flex"
              align="middle"
            >
              {data.map((item, index) => {
                return (
                  <Col
                    span={4}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    key={index}
                    style={{ display: "flex" }}
                  >
                    <Card
                      onClick={() => {
                        this.setState({ selected: item });
                      }}
                      bordered={false}
                      hoverable
                      className="card-item"
                      cover={<img alt="example" src={item.img} />}
                    >
                      <Meta
                        style={{ textAlign: "center" }}
                        title={item.title}
                        description={item.description}
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          color: "#222",
                        }}
                      >
                        <span style={{ fontSize: "medium" }}>
                          AR {item.price}
                        </span>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Content>
      </Layout>
    );
  }
}

export default App;
