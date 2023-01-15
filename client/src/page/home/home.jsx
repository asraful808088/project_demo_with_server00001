import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavButton from "../../assest/bg/home/button.png";
import homeHeaderPhoto from "../../assest/bg/home/homecoffee.jpg";
import homeLogo from "../../assest/bg/home/homeLogo2.png";
import email from "../../assest/icon/email.png";
import phone from "../../assest/icon/phone.png";
import st1 from "../../assest/icon/st1.png";
import st2 from "../../assest/icon/st2.png";
import st3 from "../../assest/icon/st3.png";
import st4 from "../../assest/icon/st4.png";
import { getCookie, removeCookie } from "../../data/cookie/cookie";
import SERVERLINK from "../../link/server/link";
import Loading from "../loading/loading";
import style from "./style.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [navigationEneble, setNavigationEneble] = useState(false);
  const [isLoin, setLogin] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      withCredentials: true,
      method: "get",
      url: `${SERVERLINK}/`,
      headers: {
        authorization: getCookie("coffeeShop"),
      },
    })
      .then((res) => {
        setLogin(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        try {
          if (err.response.status) {
            return;
          }
        } catch (error) {
          toast("network problem.please try again later");
        }
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className={style.mainRoot}>
      <div
        className={style.navigation}
        style={{
          left: navigationEneble ? "0px" : "-300px",
          width: navigationEneble ? "350px" : "0px",
        }}
      >
        <div className={style.Logo}>
          <img src={homeLogo} alt="" height={"100%"} width="100%" />
        </div>
        <div className={style.items}>
          <div
            className={style.item}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
          <div className={style.item}>Our Services</div>
          <div className={style.item}>Contact Us</div>
          <div
            className={style.item}
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </div>
          <div
            className={style.item}
            onClick={() => {
              navigate("/settings");
            }}
            style={{
              display: isLoin ? "flex" : "none",
            }}
          >
            Settings
          </div>
          <div
            className={style.item}
            onClick={() => {
              removeCookie("coffeeShop");
              navigate("/login");
            }}
          >
            {isLoin ? "logout" : "login"}
          </div>
        </div>
      </div>
      <div className={style.root} style={{}}>
        <div className={style.header}>
          <div className={style.logo_navigation}>
            <div className={style.items}>
              <div className={style.logo}>
                <img src={homeLogo} alt="" height={"100%"} width={"100%"} />
              </div>
            </div>
            <div className={style.items}>
              <div className={style.navigation}>
                <div
                  className={style.link}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </div>
                <div
                  className={style.link}
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  about
                </div>
                <div
                  className={style.link}
                  onClick={() => {
                    navigate("/settings");
                  }}
                  style={{
                    display: isLoin ? "flex" : "none",
                  }}
                >
                  settings
                </div>
                <div
                  className={style.link}
                  onClick={async () => {
                    removeCookie("coffeeShop");
                    navigate("/login");
                  }}
                >
                  {isLoin ? "logout" : "login"}
                </div>
              </div>
              <div className={style.sideButtonBox}>
                <div
                  className={style.button}
                  onClick={() => {
                    setNavigationEneble(!navigationEneble);
                  }}
                >
                  <img src={NavButton} alt="" height={"100%"} width={"100%"} />
                </div>
              </div>
            </div>
          </div>
          <div className={style.headerContainer}>
            <div className={style.headertext}>
              <p>We Make</p>
              <p>Awesome Coffee</p>
            </div>

            <p className={style.domeText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              delectus repudiandae dolores ab harum nulla sint inventore debitis
              sequi itaque aliquam excepturi ad tempore quasi necessitatibus in
              incidunt, consectetur temporibus.sequi itaque aliquam excepturi ad
              tempore quasi necessitatibus in incidunt, consectetur
              temporibus.sequi itaque aliquam excepturi ad tempore quasi
              necessitatibus in incidunt, consectetur temporibus.
            </p>
            <div className={style.hr}></div>
            <div className={style.button}>
              <div className={style.items}>our services</div>
              <div className={style.items}>contact us</div>
            </div>
          </div>

          <img
            src={homeHeaderPhoto}
            alt=""
            height={"100%"}
            width={"100%"}
            style={{}}
          />
        </div>
        <h1>Coffee Items</h1>
        <div className={style.hr}></div>

        <div className={style.container}>
          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pi2.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Espresso</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>01.79$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pic6.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Iced Coffee</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>03.29$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pic5.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Cafe au Lait</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>01.99$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pic4.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Affogato</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.09$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pic8.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Cafe Latte</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.09$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pic7.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Flat White</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.09$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <img
                src={require("../../assest/bg/home/items/pic3.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Vienna</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.92$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.offer}>
          <div className={style.item}>
            <p>discount</p>
            <img
              alt=""
              src={require("../../assest/bg/home/items/offer.png")}
              height={"30%"}
              width={"20%"}
              style={{
                position: "absolute",
              }}
            />
            <img
              src={require("../../assest/bg/home/items/001.png")}
              alt=""
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className={style.item}>
            <p>offer</p>
            <img
              alt=""
              src={require("../../assest/bg/home/items/offer.png")}
              height={"30%"}
              width={"20%"}
              style={{
                position: "absolute",
              }}
            />
            <img
              src={require("../../assest/bg/home/items/002.png")}
              alt=""
              height={"100%"}
              width={"100%"}
            />
          </div>
        </div>

        <div className={style.container}>
          <div className={style.items}>
            <div className={style.pic}>
              <p>-60%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap07.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Espresso</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>01.79$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <p>-50%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap06.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Iced Coffee</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>03.29$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <p>-20%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap05.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Cafe au Lait</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>01.99$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <p>-40%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap04.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Affogato</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.09$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <p>-70%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap03.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Cafe Latte</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.09$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <p>-53%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap02.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Flat White</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.09$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>

          <div className={style.items}>
            <div className={style.pic}>
              <p>-10%</p>
              <img
                src={require("../../assest/bg/home/items/offer.png")}
                alt=""
                height={"30%"}
                width={"20%"}
                style={{
                  position: "absolute",
                  zIndex: "1",
                }}
              />
              <img
                src={require("../../assest/bg/home/items/cap01.png")}
                alt=""
                height={"100%"}
                width="100%"
              />
            </div>
            <div className={style.details}>
              <h2>Vienna</h2>
              <hr />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum{" "}
              </p>
              <div className={style.price}>
                <div className={style.rate}>02.92$</div>
                <div className={style.buy}>Buy</div>
              </div>
            </div>
          </div>
        </div>

        <footer className={style.footer}>
          <div className={style.items}>
            <img src={homeLogo} alt="" height="100%" width="100%" />
          </div>
          <div className={style.items}>
            <h1>Contact Us </h1>
            <hr />

            <div className={style.items}>
              <div className={style.icon}>
                <img src={phone} alt="" height={"100%"} width={"100%"} />
              </div>
              <div className={style.text}>+8801914457192</div>
            </div>

            <div className={style.items}>
              <div className={style.icon}>
                <img src={phone} alt="" height={"100%"} width={"100%"} />
              </div>
              <div className={style.text}>+8801912422192</div>
            </div>

            <div className={style.items}>
              <div className={style.icon}>
                <img src={email} alt="" height={"100%"} width={"100%"} />
              </div>
              <div className={style.text}>coffeeshopgmail.com</div>
            </div>

            <div className={style.items}>
              <div className={style.icon}>
                <img src={email} alt="" height={"100%"} width={"100%"} />
              </div>
              <div className={style.text}>coffeeshophotmail.com</div>
            </div>
          </div>
          <div className={`${style.items} ${style.STitems}`}>
            <h1>Stay Connect</h1>
            <hr />
            <div className={style.icon}>
              <img src={st1} alt="" height={"100%"} width="100%" />
            </div>
            <div className={style.icon}>
              <img src={st2} alt="" height={"100%"} width="100%" />
            </div>
            <div className={style.icon}>
              <img src={st3} alt="" height={"100%"} width="100%" />
            </div>
            <div className={style.icon}>
              <img src={st4} alt="" height={"100%"} width="100%" />
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
}
