((function () {
    "use strict";

    let time = 1500;
    let animationDirection = "PutToRight";
    let speed = .2;
    let pagination = false;

/////////  TEMPLATE SLIDER BOX  //////////////////////////
    const createSlide = {

        createS: function (tag, classN = null, innerHtml = null, attrEl = null) {
            let el = document.createElement(tag);
            el.className = (classN) ? classN : "";
            el.innerHTML = (innerHtml) ? innerHtml : "";
            if (attrEl) {
                attrEl.map((elAttr) => el.setAttribute(elAttr.name, elAttr.value))
            }
            return el;
        },
        addChild: function (parrent, children) {
            children.map(el => parrent.appendChild(el));
            return parrent;
        }
    };

/////////  SLIDER OBJECT /////////////////////////////////
    const sl = {
        /////////  CREATE SLIDER INSIDE YOUR CLASS  //////
        createLineSlide: function () {

            let sliderAppearMs = createSlide.createS("div", "slider_box_ms");
            let sliderBox = createSlide.createS("div", "slider_wrapper_ms ");
            for (let i = 0; i < 20; i++) {  /// => create line in
                createSlide.addChild(sliderAppearMs, [createSlide.addChild(createSlide.createS("div", "slider_lines_ms"), [createSlide.createS("div", "slider_lines_twin_ms first_twin_ms")])]);
            }
            sliderBox.appendChild(sliderAppearMs);

            return sliderBox
        },

        time: function (timing) {
            time = timing;
            return this
        },

        animationName: function (name) {
            animationDirection = name;
            return this
        },

        speed: function (speeding) {
            speed = speeding;
            return this
        },

        pagination: function (pug) {
            pagination = pug;
            return this
        },

        ///////  FIND SLIDER  ////////////////////////////////////
        findSlider: function (elementClass) {
            this.elClass = elementClass;
            this.mainBox = Array.from(document.getElementsByClassName(this.elClass));
            for (let i = 0; i < this.mainBox.length; i++) {
                // this.mainBox[i].style.position = "absolute";
                this.mainBox[i].appendChild(sl.createLineSlide());
                this.mainBox[i].classList.add(this.elClass + i) // => разделяем классы для боксов с одинаковыми классами
            }
            return this
        },

        ///////  PLAY SLIDER  ////////////////////////////////////
        play: function () {

            this.animationDirection = animationDirection;
            let timeDefault;
            let timing = time;
            let lastLine;
            let timeOfChange;
            let positionBg = 0;
            let countImage = 0;
            let interval;

            for (let i = 0; i < this.mainBox.length; i++) {
                this.arrLines = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));

                if (this.animationDirection === "StepToRight") {
                    this.animationOfName = "StepToRight_ms"
                } else if (this.animationDirection === "StepToLeft") {
                    this.animationOfName = "StepToLeft_ms";
                } else if (this.animationDirection === "PutToRight") {
                    this.animationOfName = "PutToRight_ms";
                } else if (this.animationDirection === "PutToLeft") {
                    this.animationOfName = "PutToLeft_ms";
                }

                let y = 0.2;
                if (this.animationOfName === "StepToRight_ms" || this.animationOfName === "PutToRight_ms" || this.animationOfName === "CoverToRight_ms") {
                    for (let i = 0; i < this.arrLines.length; i++) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                } else if (this.animationOfName === "StepToLeft_ms" || this.animationOfName === "PutToLeft_ms" || this.animationOfName === "CoverToLeft_ms") {
                    for (let i = this.arrLines.length - 1; i >= 0; i--) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                }
            }

            /////  CREATE DIRECTIONS AND ANIMATION`S NAMES /////////
            function playPag(mainBox, elClass, animationOfName) {
                for (let i = 0; i < mainBox.length; i++) {
                    let desc = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.background_ms > div.desc_ms'));
                    let boxS = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms'));
                    let firstSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
                    let imgPath = Array.from(document.querySelectorAll('.' + elClass + i + '>div.background_ms'));

                    let pugBox = createSlide.createS("div", "pagination_block_ms");
                    let pugBtnBox = createSlide.createS("div", "pagination_block_btn_ms");
                    let pugBoxCover = createSlide.createS("div", "pagination_block_cover_ms");
                    createSlide.addChild(pugBox, [pugBoxCover, pugBtnBox]);
                    for (let q = 0; q < imgPath.length; q++) {
                        let pugBtn = createSlide.createS("div", "pagination_btn_ms");
                        pugBtn.setAttribute("data-pugnumber", q);
                        pugBtnBox.appendChild(pugBtn)
                    }
                    mainBox[i].appendChild(pugBox)


                    let btn = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.pagination_block_ms > div.pagination_block_btn_ms > div.pagination_btn_ms'));
                    let btnBlock = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.pagination_block_ms > div.pagination_block_cover_ms'));
                    let pugBlock = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.pagination_block_ms'))

                    if (pagination === false) {
                        pugBlock.map((el) => {
                            el.style.display = "none"
                        })
                    } else if (pagination === true) {
                        pugBlock.map((el) => {
                            el.style.display = "block"
                        })
                    }

                    if (animationOfName === "StepToRight_ms" || animationOfName === "PutToRight_ms") {
                        lastLine = getComputedStyle(firstSlidesLine[firstSlidesLine.length - 1]).animationDelay;
                    } else if (animationOfName === "StepToLeft_ms" || animationOfName === "PutToLeft_ms") {
                        lastLine = getComputedStyle(firstSlidesLine[0]).animationDelay;
                    }

                    ////////  Timing  /////////////////////////////////////
                    timeOfChange = parseInt(lastLine + 1000) * 1000;
                    (timing) ? timeDefault = timing : timeDefault = 1000;

                    ///////  create BG Position  /////////////////////////
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        positionBg = positionBg + 5.262;  ///// initially 5.2560
                        firstSlidesLine[q].style.zIndex = "1000";
                    }
                    ////////  create FIRST IMG  ///////////        //// => was in version 1.1
                    // for (let q = 0; q < firstSlidesLine.length; q++) {
                    //     firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                    //     firstSlidesLine[q].style.animationName = animationOfName;
                    //     setTimeout(function () {
                    //         boxS[0].style.backgroundSize = "100% 100%";
                    //         boxS[0].style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                    //     }, timeOfChange + timeDefault)
                    // }
                    btn[0].classList.add("btn_active_ms");

                    //// for first opened paginations
                    setTimeout(function () {                 //// =>  => was in version 1.1
                        btnBlock[0].style.zIndex = "1";
                        for (let q = 0; q < btn.length; q++) {
                            btn[q].classList.remove("btn_disable_ms");
                            btn[q].classList.add("btn_enable_ms");

                            if (btn[q].dataset.pugnumber == +countImageS) {
                                btn[countImageS].classList.add("btn_active_ms");
                            }
                        }
                    }, timeOfChange + 500);

                    // setTimeout(function () {                 /// => was in version 1.1
                    //     desc[0].style.opacity = 1;
                    //     desc[0].style.zIndex = 100000000
                    // }, timeOfChange + 500);  //// +700 ???

                    let countImageS;
                    let startPlay = function (countImg) {
                        countImageS = +countImg;

                        //// => start first slide
                        for (let q = 0; q < firstSlidesLine.length; q++) {
                            firstSlidesLine[q].style.opacity = "0";
                            firstSlidesLine[q].style.animationName = "none";

                            setTimeout(function () {
                                firstSlidesLine[q].style.animationName = animationOfName;
                                firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                            }, 100);
                        }
                        //// ----------------------

                        interval = setInterval(function () {
                            desc[countImageS].style.opacity = "0";
                            desc[countImageS].style.zIndex = "0";
                            btnBlock[0].style.zIndex = "1000";

                            // add disable block pug
                            for (let c = 0; c < btn.length; c++) {
                                btn[c].classList.remove("btn_enable_ms");
                                btn[c].classList.remove("btn_active_ms");
                                btn[c].classList.add("btn_disable_ms");
                            }

                            if (countImageS < btn.length - 1) {
                                btn[countImageS].classList.remove("btn_active_ms");        //// little pug
                                btn[countImageS + 1].classList.add("btn_active_ms");
                            }
                            if (countImageS == btn.length - 1) {
                                btn[0].classList.add("btn_active_ms");
                            }

                            setTimeout(function () {
                                desc[countImageS].style.opacity = "1";
                                desc[countImageS].style.zIndex = "100000";
                                btnBlock[0].style.zIndex = "1";

                                // add enable block pug
                                for (let c = 0; c < btn.length; c++) {
                                    btn[c].classList.remove("btn_disable_ms");
                                    btn[c].classList.remove("btn_active_ms");
                                    btn[c].classList.add("btn_enable_ms")

                                    if (btn[c].dataset.pugnumber == +countImageS) {  //// big pug
                                        btn[c].classList.add("btn_active_ms");
                                    }
                                }
                            }, timeOfChange + 700);

                            for (let i = 0; i < boxS.length; i++) {
                                boxS[0].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                                for (let q = 0; q < firstSlidesLine.length; q++) {
                                    firstSlidesLine[q].style.opacity = "0";
                                    firstSlidesLine[q].style.animationName = "none";

                                    setTimeout(function () {
                                        firstSlidesLine[q].style.animationName = animationOfName;
                                        firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                                    }, 50)
                                }
                            }
                            countImageS += 1;
                            if (countImageS == imgPath.length) {
                                countImageS = 0
                            }
                        }, timeOfChange + timeDefault);
                        return this
                    };

                    let secondPlay = function (countImg) {
                        setTimeout(function () {
                            desc[countImg].style.opacity = "1";
                            desc[countImg].style.zIndex = "100000000";
                            btnBlock[0].style.zIndex = "1";

                            for (let c = 0; c < btn.length; c++) {
                                btn[c].classList.remove("btn_disable_ms");
                                btn[c].classList.remove("btn_active_ms");
                                btn[c].classList.add("btn_enable_ms");
                            }
                            if (btn[countImageS].dataset.pugnumber === countImageS) {
                                btn[countImageS].classList.add("btn_active_ms");
                            }
                        }, timeOfChange + 500);  //// +700 ???
                        startPlay(countImageS)
                    };

                    btn.map((el) => {
                        el.addEventListener("click", function (e) {
                            clearInterval(interval);
                            desc[countImageS].style.opacity = "0";
                            desc[countImageS].style.zIndex = "0";
                            btnBlock[0].style.zIndex = "1000000";

                            for (let c = 0; c < btn.length; c++) {
                                btn[c].classList.remove("btn_enable_ms");
                                btn[c].classList.remove("btn_active_ms");
                                btn[c].classList.add("btn_disable_ms");
                            }
                            e.target.classList.add("btn_active_ms");
                            boxS[0].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                            countImageS = e.target.dataset.pugnumber;

                            secondPlay(countImageS)
                        })
                    });
                    startPlay(countImage)
                }
            }


            playPag(this.mainBox, this.elClass, this.animationOfName);

            animationDirection = "PutToRight";
            speed = 0.2;
            time = 1500;
            pagination = false;
            return this
        }
    };

    window.MagickSlider = sl;
    return window.MagickSlider

}))();
//// Library is end

//// Options for "Check slider out"  -- for portfolio
function playWithOption() {
    let play = document.getElementById("play");
    let directCheckedFirst, directCheckedSecond;
    let directCheckedArray = [directCheckedFirst = document.getElementById("direction_check_1"), directCheckedSecond = document.getElementById("direction_check_2")];

    let animateCheckedFirst, animateCheckedSecond;
    let animateCheckedArray = [animateCheckedFirst = document.getElementById("animation_check_1"), animateCheckedSecond = document.getElementById("animation_check_2")];

    let speedValue = document.getElementById("speed");
    let timeValue = document.getElementById("time");

    let pagOff = document.getElementById("pagination_check")

    let direct = 0;
    let animation = 0;
    // let pagCheck = true;

    directCheckedArray.map((el) => {
        el.addEventListener("click", function () {
            for (let i = 0; i < directCheckedArray.length; i++) {
                if (directCheckedArray[i].checked === true) {
                    if (directCheckedArray[i] === directCheckedFirst) {
                        direct = 0
                    } else if (directCheckedArray[i] === directCheckedSecond) {
                        direct = 1
                    }
                }
            }
        })
    });
    animateCheckedArray.map((el) => {
        el.addEventListener("click", function () {
            for (let i = 0; i < animateCheckedArray.length; i++) {
                if (animateCheckedArray[i].checked == true) {
                    if (animateCheckedArray[i] == animateCheckedFirst) {
                        animation = 0
                    } else if (animateCheckedArray[i] == animateCheckedSecond) {
                        animation = 1
                    }
                }
            }
        })
    });

    let mainBlock = document.getElementById("main_block");
    let sliderBlock = document.getElementById("slider_block");
    let cloneSliderBlock = sliderBlock.cloneNode(true);

    function createOptions(direct, animation, speed, time, pagCheck) {
        let dir, speedV, timeV, pagCheked;
        (direct === 0 && animation === 0) ? dir = "PutToRight" : "PutToRight";
        (direct === 0 && animation === 1) ? dir = "StepToRight" : "PutToRight";
        (direct === 1 && animation === 0) ? dir = "PutToLeft" : "PutToRight";
        (direct === 1 && animation === 1) ? dir = "StepToLeft" : "PutToRight";

        (speed.value) ? speedV = +speed.value : speedV = 0.1;
        (time.value) ? timeV = +time.value : timeV = 2000;
        (pagCheck.checked === true) ? pagCheked = false : pagCheked = true;

        MagickSlider.findSlider("slider_block_cover")
            .time(timeV)
            .speed(speedV)
            .pagination(pagCheked)
            .animationName(dir)
            .play();
    }

    pagOff.addEventListener("click", function () {
        console.log(pagOff.checked)
    });

    play.addEventListener("click", function () {
        play.style.animationName = "";
        setTimeout(function () {
            play.style.animationName = "play_button"
        }, 100);

        let sliderWrapper = Array.from(document.getElementsByClassName("slider_wrapper_ms "));
        let pagBlock = Array.from(document.getElementsByClassName("pagination_block_ms "));
        mainBlock = document.getElementById("main_block");
        sliderBlock = document.getElementById("slider_block");
        // bg = Array.from(document.getElementsByClassName("p"));

        sliderBlock.parentNode.removeChild(sliderBlock);
        mainBlock.appendChild(cloneSliderBlock);

        sliderWrapper[0].parentNode.removeChild(sliderWrapper[0]);
        pagBlock[0].parentNode.removeChild(pagBlock[0]);

        createOptions(direct, animation, speedValue, timeValue, pagOff)
    })
}

playWithOption();


MagickSlider.findSlider("slider_block_cover")
    .time(3000)
    .speed(0.1)
    .pagination(true)
    .animationName("PutToRight")
    .play();

// LineSlider.findSlider("slider_block_cover_2")
//     .time(3000)
//     .speed(0.1)
//     .pagination(true)
//     .animationName("PutToLeft")
//     .play();

// LineSlider.findSlider("picture_monna")
//     .time(2000)
//     .speed(0.1)
//     .animationName("PutToRight")
//     .pagination(true)
//     .play();
//
// LineSlider.findSlider("picture_right")
//     .time(3000)
//     .speed(0.1)
//     .animationName("StepToLeft")
//     .pagination(true)
//     .play();


// LineSlider.findSlider("box")
//     // .time(3000)
//     // .speed(0.1)
//     .animationName("StepToLeft")
//     .play();