import React  from "react";
import style from './style.module.css'
import connect from './connect.png'
import fb from './../icon/fb.png'
import whatsApp from './../icon/what.png'
import tw from './../icon/tw.png'
import you from './../icon/youtube.png'
export default function Slider({

}){

    return <div className={style.base}>
        <div className={style.button}>
                <img src={connect} alt="" style={{
                    height:"100%",
                    width:'100%'
                }}/>
        </div>
        <div className={style.slider}>
            <div className={style.dynamic}>
                    <div className={style.subComponents}>
                        <img src={fb} alt=""  style={{
                    height:"100%",
                    width:'100%'
                }}/>
                    </div>
                    <div className={style.subComponents}>
                        <img src={whatsApp} alt=""  style={{
                    height:"100%",
                    width:'100%'
                }}/>
                    </div>
                    <div className={style.subComponents}>
                        <img src={tw} alt=""  style={{
                    height:"100%",
                    width:'100%'
                }}/>
                    </div>
                    <div className={style.subComponents}>
                    <img src={you} alt="" style={{
                    height:"70%",
                    width:'100%'
                }}/>
                    </div>
            </div>
        </div>
    </div>
}