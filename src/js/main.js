((function () {
    "use strict";

    let time = 1500;
    let animationDirection = "StepToRight";
    let speed = .2;
    let lineDuration = .5;
    let pagination = false

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
        addChild: function (parent, children) {
            children.map(el => parent.appendChild(el));
            return parent;
        }
    };

/////////  SLIDER OBJECT /////////////////////////////////
    const createNewSlider = {
        /////////  CREATE SLIDER INSIDE YOUR CLASS  //////

        time: function (timing) {
            time = timing;
            return this
        },

        lineDuration: function (seconds) {
            lineDuration = seconds;
            return this
        },

        animationDirection: function (name) {
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

        /////// CREATE SL  ////////////////////////////////////

        createLineSlide: function () {
            const sliderBox = createSlide.createS("div", "slider_box_ms");
            const sliderBoxWrapper = createSlide.createS("div", "slider_wrapper_ms ");
            for (let i = 0; i < 20; i++) {  /// => create line in
                createSlide.addChild(sliderBox, [createSlide.addChild(createSlide.createS("div", "slider_lines_ms"), [createSlide.createS("div", "slider_line_animation_ms")])]);
            }
            sliderBoxWrapper.appendChild(sliderBox);
            return sliderBoxWrapper
        },

        createPaginationBox: function () {
            const pugBox = createSlide.createS("div", "pag_btn_container_ms")
            Array.from(document.querySelectorAll(`.${this.elClass} > div.background_ms`)).map((el, index) => pugBox.appendChild(createSlide.createS("div", "pag_btn_ms", null, [{
                "name": "data-number",
                "value": index
            }])));
            const paginationBox = createSlide.addChild(createSlide.createS("div", "pag_box_ms"), [createSlide.createS("div", "pag_cover_ms"), pugBox])
            return paginationBox
        },

        ///////  FIND SLIDER  ////////////////////////////////////
        findSlider: function (elementClass) {
            this.elClass = elementClass;
            this.mainBox = createSlide.addChild(document.getElementById(this.elClass), [createNewSlider.createLineSlide(), createNewSlider.createPaginationBox()])
            this.mainBox.style.position = "relative"
            return this
        },

        ///////  PLAY SLIDER  ////////////////////////////////////
        play: function () {
            const arrLines = Array.from(document.querySelectorAll(`.${this.elClass} > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.slider_line_animation_ms`));

            if (animationDirection === "StepToRight") {
                this.animationOfName = "StepToRight_ms"
            } else if (animationDirection === "StepToLeft") {
                this.animationOfName = "StepToLeft_ms";
            } else if (animationDirection === "PutToRight") {
                this.animationOfName = "PutToRight_ms";
            } else if (animationDirection === "PutToLeft") {
                this.animationOfName = "PutToLeft_ms";
            }

            arrLines.map(el => {
                el.style.animationDuration = lineDuration + "s"
            })

            let incrementDuration = 0.2;
            if (this.animationOfName === "StepToRight_ms" || this.animationOfName === "PutToRight_ms") {
                for (let i = 0; i < arrLines.length; i++) {
                    arrLines[i].style.animationDelay = incrementDuration + "s";
                    (speed) ? incrementDuration += speed : incrementDuration += 0.2
                }
            } else if (this.animationOfName === "StepToLeft_ms" || this.animationOfName === "PutToLeft_ms") {
                for (let i = arrLines.length - 1; i >= 0; i--) {
                    arrLines[i].style.animationDelay = incrementDuration + "s";
                    (speed) ? incrementDuration += speed : incrementDuration += 0.2
                }
            }


            (function createS(sliderAnimationName, elClass) {
                let lastLine, timeOfChange, backgroundPosition = 0, intervalChangeSlide, countImage = 0;
                const desc = Array.from(document.querySelectorAll(`.${elClass} > div.background_ms > div.desc_ms`));
                const boxS = document.querySelector(`.${elClass} > div.slider_wrapper_ms > div.slider_box_ms`);
                const imgPath = Array.from(document.querySelectorAll(`.${elClass} > div.background_ms`));
                const pagContainer = document.querySelector(`.${elClass} > div.pag_box_ms`)
                const pagBtn = Array.from(document.querySelectorAll(`.${elClass} > div.pag_box_ms > div.pag_btn_container_ms > div.pag_btn_ms`));
                const pagCover = document.querySelector(`.${elClass} > div.pag_box_ms > div.pag_cover_ms`)
                pagBtn[0].classList.add("pag_btn_active_ms")


                //// ---- VALUE DELAY LAST LINE ----
                if (sliderAnimationName === "StepToRight_ms" || sliderAnimationName === "PutToRight_ms") {
                    lastLine = getComputedStyle(arrLines[arrLines.length - 1]).animationDelay;
                } else if (sliderAnimationName === "StepToLeft_ms" || sliderAnimationName === "PutToLeft_ms") {
                    lastLine = getComputedStyle(arrLines[0]).animationDelay;
                }

                //// ---- Timing ----
                timeOfChange = (parseInt(lastLine) + lineDuration) * 1000;
                (time) ? time = time : time = 1500;

                //// ---- Create BG Position ----
                arrLines.map((el) => {
                    el.style.backgroundPositionX = backgroundPosition + "%"
                    backgroundPosition = backgroundPosition + 5.25;
                    el.style.zIndex = "1000"
                })

                function firstPlaySlide() {
                    arrLines.map((el) => {
                        //// ---- Create first IMG of slide ----
                        el.style.animationName = "nothing"; // will do separated option
                        setTimeout(() => {
                            el.style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                            el.style.animationName = sliderAnimationName; // will do separated option
                        }, 100)
                    });
                    //// ---- Open pagination ----
                    pagCover.style.zIndex = "100"
                    ///// Appear first desc of slide and first BG
                    setTimeout(() => {
                        //// ---- Close pagination ----
                        pagCover.style.zIndex = "1"
                        //// ---- Description block is appearing ----
                        desc[countImage].style.opacity = "1"
                    }, timeOfChange)
                }
                firstPlaySlide();

                function activeBtn(){
                    pagBtn.map(el=>{el.classList.remove("pag_btn_active_ms")});
                    (countImage == imgPath.length -1) ? (pagBtn[0].classList.add("pag_btn_active_ms")) : pagBtn[countImage+1].classList.add("pag_btn_active_ms")
                }

                ///// Func RUN Slider with interval
                function changeSlider() {
                    intervalChangeSlide = setInterval(() => {
                        activeBtn()
                        new Promise(res => {
                            //// ---- Open pagination ----
                            pagCover.style.zIndex = "100"

                            //// ---- Remove animation of line ----
                            arrLines.map((el) => {
                                el.style.animationName = "nothing"
                            })
                            //// ---- Description block is disappearing ----
                            desc.map(el => {
                                el.style.opacity = "0"
                            })
                            res()
                        }).then(() => {
                            //// ---- Set animation of line ----
                            setTimeout(() => {
                                (countImage === imgPath.length - 1) ? countImage = 0 : countImage = countImage += 1
                                arrLines.map((el) => {
                                    el.style.animationName = sliderAnimationName;
                                    el.style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                                });
                                (countImage === 0) ? boxS.style.backgroundImage = `url(${imgPath[imgPath.length - 1].dataset.path_img})` : boxS.style.backgroundImage = `url(${imgPath[countImage - 1].dataset.path_img})`;
                                //// ---- Animation Description ----
                                setTimeout(() => {
                                    pagCover.style.zIndex = "1"
                                    desc[countImage].style.opacity = "1"
                                }, timeOfChange)
                            }, 100)
                        })
                    }, timeOfChange + time)
                }

                function setSlideUsePagination() {
                    pagBtn.map((el) => {

                        el.addEventListener("click", (e) => {
                            clearInterval(intervalChangeSlide)
                            pagBtn.map(el=>{
                                pagBtn.map(el=>{el.classList.remove("pag_btn_active_ms")})
                            })
                            pagBtn[e.target.dataset.number].classList.add("pag_btn_active_ms")
                            new Promise((res, rej) => {
                                try {
                                    boxS.style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`
                                    desc[countImage].style.opacity = "0"
                                    res()
                                } catch (rej) {
                                    console.error(rej)
                                }

                            }).then(() => {
                                countImage = +e.target.dataset.number
                                firstPlaySlide()
                                changeSlider()
                            })
                        })
                    })
                }

                changeSlider();
                (pagination) ? (pagContainer.style.display = "block", setSlideUsePagination()) : pagContainer.style.display = "none";
            })(this.animationOfName, this.elClass)

            time = 1500;
            speed = .2;
            lineDuration = .5;
            pagination = false
            // return this
        }
    };

    window.MagickSlider = createNewSlider;
    return window.MagickSlider

}))();
//// Library is end

//// Options for "Check slider out"  -- for portfolio


MagickSlider.findSlider("slider_block_1")
    .time(3000)
    .lineDuration(.2)
    .speed(0.1)
    .pagination(true)
    .animationDirection("PutToRight")
    .play();


MagickSlider.findSlider("slider_block_2")
    .time(2000)
    .lineDuration(.5)
    .speed(0.2)
    .pagination(true)
    .animationDirection("StepToLeft")
    .play();


// MagickSlider.findSlider("slider_block_3")
//     .time(2000)
//     // .speed(0.1)
//     .animationDirection("PutToRight")
//     // .lineDuration(2.8)
//     .pagination(true)
//     .play();

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

