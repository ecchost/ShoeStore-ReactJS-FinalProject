import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import Slider from 'react-slick';
import { Link } from 'react-router-dom'
import {
    Slider4,
    svgFreeShipping,
    svgservice,
    svgoffer,
    svgpayment} from '../../services/script'

// Import custom components
import LogoBlocks from "./common/logo-block"
import BlogSection from "./common/blogsection"
import Trending from "./common/trending";
import TrandingCollection from "./common/collection"
import Special from "./common/special";

import HeaderFive from "../common/headers/header"
import FooterFour from "../common/footers/footer";


class Watch extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color4.css` );
    }

    render(){
        return (
            <div>
                <Helmet>
                    <title>MagicZola - Shoes Store</title>
                </Helmet>
                <HeaderFive logoName={'layout4/logo.png'} />
                <section className="p-0 small-slider">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home9 text-left p-left">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>every time</h4>
                                                    <h1>magiczola</h1>
                                                    <Link to="#" className="btn btn-outline btn-classic">shop now</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home10 text-left p-left">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>men's shoes</h1>
                                                    <Link to="#" className="btn btn-outline btn-classic">shop now</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home11 text-left p-left">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>men's shoes</h1>
                                                    <Link to="#" className="btn btn-outline btn-classic">shop now</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*Logo Blocks section*/}
                <LogoBlocks />
                {/*Logo Blocks section end*/}


                {/*category wrapper*/}
                <section className="section-b-space ratio_portrait">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider {...Slider4} className="slide-4 category-m no-arrow">
                                    <div>
                                        <div className="category-wrapper">
                                            <div>
                                                <div>
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/watch/cat1.png`}
                                                         className="img-fluid blur-up lazyload bg-img" alt="" />
                                                </div>
                                                <h4>Nike Wildhorse</h4>

                                               </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="category-wrapper">
                                            <div>
                                                <div>
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/watch/cat2.png`}
                                                         className="img-fluid blur-up lazyload bg-img" alt="" />
                                                </div>
                                                <h4>Nike Pegasus Trail </h4>
                                                </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="category-wrapper">
                                            <div>
                                                <div>
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/watch/cat3.png`}
                                                         className="img-fluid blur-up lazyload bg-img" alt="" />
                                                </div>
                                                <h4>Nike Air Zoom Terra</h4>
                                                </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="category-wrapper">
                                            <div>
                                                <div>
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/watch/cat2.png`}
                                                         className="img-fluid blur-up lazyload bg-img" alt="" />
                                                </div>
                                                <h4>Nike Waffle Trainer</h4>
                                                </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
                {/*category wrapper end*/}

                {/*Special Products Start*/}
                <Trending type={'watch'} />
                {/*Special Products End*/}

                {/* Parallax banner*/}
                <TrandingCollection type={'watch'} />
                {/* Parallax banner end*/}

                <Special type={'watch'} />

                {/*Service Layout*/}
                <div className="container">
                    <section className="service section-b-space border-section border-top-0">
                        <div className="row partition4">
                            <div className="col-lg-3 col-md-6 service-block1">
                                <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                <h4>free shipping</h4>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 service-block1">
                                <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                <h4>24 X 7 service</h4>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 service-block1">
                                <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                <h4>festival offer</h4>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 service-block1">
                                <div dangerouslySetInnerHTML={{ __html: svgpayment }} />
                                <h4>online payment</h4>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            </div>
                        </div>
                    </section>
                </div>
                {/*Service Layout End*/}

                <FooterFour logoName={'layout4/footerlogo.png'} />

            </div>
        )
    }
}


export default Watch;