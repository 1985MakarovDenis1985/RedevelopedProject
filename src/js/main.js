((function () {
    "use strict";

    let time = 1500;
    let animationDirection = "StepToRight";
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
            let sliderAppearMs = createSlide.createS("div", "slider_box_ms");
            let sliderBox = createSlide.createS("div", "slider_wrapper_ms ");
            for (let i = 0; i < 20; i++) {  /// => create line in
                createSlide.addChild(sliderAppearMs, [createSlide.addChild(createSlide.createS("div", "slider_lines_ms"), [createSlide.createS("div", "slider_line_animation_ms")])]);
            }
            sliderBox.appendChild(sliderAppearMs);
            return sliderBox
        },
        ///////  FIND SLIDER  ////////////////////////////////////
        findSlider: function (elementClass) {
            this.elClass = elementClass;
            this.mainBox = document.getElementById(this.elClass);
            this.mainBox.appendChild(sl.createLineSlide());
            return this
        },

        ///////  PLAY SLIDER  ////////////////////////////////////
        play: function () {
            this.arrLines = Array.from(document.querySelectorAll(`.${this.elClass} > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.slider_line_animation_ms`));

            if (animationDirection === "StepToRight") {
                this.animationOfName = "StepToRight_ms"
            } else if (animationDirection === "StepToLeft") {
                this.animationOfName = "StepToLeft_ms";
            } else if (animationDirection === "PutToRight") {
                this.animationOfName = "PutToRight_ms";
            } else if (animationDirection === "PutToLeft") {
                this.animationOfName = "PutToLeft_ms";
            }
            this.arrLines.map(el=>el.style.animationName = this.animationOfName)

            let y = 0.2;
            if (this.animationOfName === "StepToRight_ms" || this.animationOfName === "PutToRight_ms") {
                for (let i = 0; i < this.arrLines.length; i++) {
                    this.arrLines[i].style.animationDelay = y + "s";
                    (speed) ? y += speed : y += 0.2
                }
            } else if (this.animationOfName === "StepToLeft_ms" || this.animationOfName === "PutToLeft_ms") {
                for (let i = this.arrLines.length - 1; i >= 0; i--) {
                    this.arrLines[i].style.animationDelay = y + "s";
                    (speed) ? y += speed : y += 0.2
                }
            }

        }


    };

    window.MagickSlider = sl;
    return window.MagickSlider

}))();
//// Library is end

//// Options for "Check slider out"  -- for portfolio


MagickSlider.findSlider("slider_block_1")
    .time(3000)
    // .speed(0.1)
    // .pagination(true)
    .animationDirection("PutToRight")
    .play();

MagickSlider.findSlider("slider_block_2")
    .time(5000)
    // .speed(0.1)
    // .pagination(true)
    .animationDirection("StepToLeft")
    .play();

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