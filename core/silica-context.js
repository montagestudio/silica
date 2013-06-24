var Montage = require("montage").Montage,
    ProxyContext = require("palette/core/serialization/proxy-context").ProxyContext;

exports.SilicaContext = ProxyContext.specialize({

    constructor: {
        value: function SilicaContext() {
            this.super();
        }
    },

    getElementById: {
        value: function(id) {
            //TODO implement this
            return {"#": id};
        }
    }

});
