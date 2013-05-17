var Montage = require("montage").Montage,
    ProxyContext = require("palette/core/serialization/proxy-context").ProxyContext;

exports.SandyContext = Montage.create(ProxyContext, {

    getElementById: {
        value: function(id) {
            //TODO implement this
            return {"#": id};
        }
    }

});
