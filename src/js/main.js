((function () {
    "use strict";

    let time = 1500;
    let animationDirection = "StepToRight";
    let speed = .2;
    let lineDuration = .5;
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
        addChild: function (parent, children) {
            children.map(el => parent.appendChild(el));
            return parent;
        }
    };

/////////  SLIDER OBJECT /////////////////////////////////
    const sl = {
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
            // console.log(this)
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
            let sliderBox = createSlide.createS("div", "slider_box_ms");
            let sliderBoxWrapper = createSlide.createS("div", "slider_wrapper_ms ");
            for (let i = 0; i < 20; i++) {  /// => create line in
                createSlide.addChild(sliderBox, [createSlide.addChild(createSlide.createS("div", "slider_lines_ms"), [createSlide.createS("div", "slider_line_animation_ms")])]);
            }
            sliderBoxWrapper.appendChild(sliderBox);
            return sliderBoxWrapper
        },
        ///////  FIND SLIDER  ////////////////////////////////////
        findSlider: function (elementClass) {
            this.elClass = elementClass;
            this.mainBox = document.getElementById(this.elClass);
            this.mainBox.appendChild(sl.createLineSlide());
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

            (function createS(sliderAnimationName, elClass, animationName) {

                let lastLine, timeOfChange, backgroundPosition = 0, countImage = 0;
                const desc = Array.from(document.querySelectorAll(`.${elClass} > div.background_ms > div.desc_ms`));
                let boxS = Array.from(document.querySelectorAll(`.${elClass} > div.slider_wrapper_ms > div.slider_box_ms`));
                let imgPath = Array.from(document.querySelectorAll(`.${elClass}> div.background_ms`));

                ////////  VALUE DELAY LAST LINE  /////////////////////////////////////
                if (sliderAnimationName === "StepToRight_ms" || sliderAnimationName === "PutToRight_ms") {
                    lastLine = getComputedStyle(arrLines[arrLines.length - 1]).animationDelay;
                } else if (sliderAnimationName === "StepToLeft_ms" || sliderAnimationName === "PutToLeft_ms") {
                    lastLine = getComputedStyle(arrLines[0]).animationDelay;
                }

                ////////  Timing  /////////////////////////////////////
                timeOfChange = (parseInt(lastLine) + lineDuration) * 1000;
                (time) ? time = time : time = 1500;

                ///////  Create BG Position  /////////////////////////
                arrLines.map((el, index) => {
                    el.style.backgroundPositionX = backgroundPosition + "%"
                    backgroundPosition = backgroundPosition + 5.25;
                    el.style.zIndex = "1000"

                    ///////  Create first IMG of slide  /////////////////////////
                    el.style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                    el.style.animationName = sliderAnimationName; // will do separated option
                })

                ///// Appear first desc of slide and first BG
                boxS[0].style.backgroundImage = `url(${imgPath[imgPath.length - 1].dataset.path_img})`;
                setTimeout(() => {desc[0].style.opacity = "1"}, timeOfChange)

                let intervalChangeSlide = setInterval(() => {
                    new Promise(res => {
                        arrLines.map((el) => {el.style.animationName = "nothing"})
                        desc.map(el => {el.style.opacity = "0"})
                        res()
                    }).then(() => {
                        ////////  Rename animation of line
                        setTimeout(() => {
                            (countImage == imgPath.length - 1) ? countImage = 0 : countImage = countImage += 1
                            arrLines.map((el, index) => {
                                el.style.animationName = sliderAnimationName;
                                el.style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                            });
                            (countImage == 0) ? boxS[0].style.backgroundImage = `url(${imgPath[imgPath.length - 1].dataset.path_img})` : boxS[0].style.backgroundImage = `url(${imgPath[countImage - 1].dataset.path_img})`;

                            //////// Animation Description
                            setTimeout(() => {
                                desc[countImage].style.opacity = "1"
                            }, timeOfChange)
                        }, 100)
                    })
                }, timeOfChange + time)


            })(this.animationOfName, this.elClass)


            time = 1500;
            speed = .2;
            lineDuration = .5;
            // return this
        }
    };

    window.MagickSlider = sl;
    return window.MagickSlider

}))();
//// Library is end

//// Options for "Check slider out"  -- for portfolio


MagickSlider.findSlider("slider_block_1")
    .time(3000)
    .lineDuration(.2)
    .speed(0.1)
    // .pagination(true)
    .animationDirection("PutToRight")
    .play();

MagickSlider.findSlider("slider_block_2")
    .time(1000)
    .lineDuration(.5)
    .speed(0.2)
    // .pagination(true)
    .animationDirection("StepToLeft")
    .play();

MagickSlider.findSlider("slider_block_3")
    .time(2000)
    // .speed(0.1)
    .animationDirection("PutToRight")
    // .lineDuration(2.8)
    // .pagination(true)
    .play();

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

