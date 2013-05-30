var Montage = require("montage").Montage,
    AbstractImage = require("montage/ui/base/abstract-image").AbstractImage;

exports.Image = Montage.create(AbstractImage, {

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
            console.log("draw!", this.rotation);
            this.element.style.webkitTransform = "rotate(" + this.rotation + "deg)"
        }
    }

});
