var Montage = require("montage").Montage,
    EditingProxy = require("palette/core/editing-proxy").EditingProxy;

exports.SandyProxy = EditingProxy.specialize( {

    constructor: {
        value: function SandyProxy() {
            this.super();
        }
    },

    stageObject: {
        value: null
    },

    setObjectProperty: {
        value: function (property, value) {
            this.super(property, value);

            if (this.stageObject) {
                if (this.stageObject.setPath) {
                    this.stageObject.setPath(property, value);
                } else if (this.stageObject.setProperty) {
                    this.stageObject.setProperty(property, value);
                }
            }
        }
    }

});
