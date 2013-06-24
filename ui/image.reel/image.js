var Montage = require("montage").Montage,
    AbstractImage = require("montage/ui/base/abstract-image").AbstractImage;

exports.Image = AbstractImage.specialize({

    constructor: {
        value: function Image() {
            this.super();
        }
    },

    hasTemplate: {
        value: false
    },

    constructor: {
        value: function Image () {
            this.super();

            this.addPathChangeListener("rotation", this, "scheduleDraw");
        }
    },

    rotation: {
        value: 0
    },

    scheduleDraw: {
        value: function () {
            this.needsDraw = true;
        }
    },

    draw: {
        value: function () {
            this.super();
            var r = this.rotation ? this.rotation : 0;
            this.element.style.webkitTransform = "rotate(" + r + "deg)";
        }
    }

});
