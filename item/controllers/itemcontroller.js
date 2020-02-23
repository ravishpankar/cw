const itemmodel = require('./models/itemmodel');
const error = require('./error');
const Item = itemmodel.Item;

exports.createItem = async function(item) {
    if ('rating' in item) {
        if (!(item.rating > itemmodel.LRL && item.rating <= itemmodel.URL)) {
            var err = new Error(error.INVALID_RATING.formatUnicorn(itemmodel.LRL, itemmodel.URL));
            err.status = 400;
            throw err;
        }
    }
    if (itemmodel.CTGY.indexOf(item.category) === -1) {
        var err = new Error(error.INVALID_CATEGORY.formatUnicorn(itemmodel.CTGY));
        err.status = 400;
        throw err;
    }
    item.isDeleted = false;
    var i = new Item(item);
    doc = await i.save();
    if (!doc) {
        var err = new Error(error.error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
    return {"item" : JSON.stringify(doc)}
}

exports.uploadItemPhoto = async function(itemId, imgPath, imgType, capturedOn) {
    var item =  await Item.findOne({_id : itemId, isDeleted : false});
    item.images.concat([{ img : fs.readFileSync(imgpath), imgType : imgType, capturedOn : capturedOn } ]);
    doc = await item.save();
    if (!doc) {
        var err = new Error(error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
    return {"item" : JSON.stringify(doc)} //todo
}

exports.uploadItemVideo = async function(itemId, videoPath, videoType) {
    var item =  await Item.findOne({_id : itemId, isDeleted : false});
    item.videoLink = { video : fs.readFileSync(videoPath), videoType : videoType };
    doc = await item.save();
    if (!doc) {
        var err = new Error(error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
    return {"item" : JSON.stringify(doc)} //todo
}

exports.updateItem = async function(item) {
    if ('rating' in item) {
        if (!(item.rating > itemmodel.LRL && item.rating <= itemmodel.URL)) {
            var err = new Error(error.INVALID_RATING.formatUnicorn(itemmodel.LRL, itemmodel.URL));
            err.status = 400;
            throw err;
        }
    }
    if (item.price < 0) {
        var err = new Error(error.INVALID_PRICE);
        err.status = 400;
        throw err;
    }
    if (itemmodel.CTGY.indexOf(item.category) === -1) {
        var err = new Error(error.INVALID_CATEGORY.formatUnicorn(itemmodel.CTGY));
        err.status = 400;
        throw err;
    }
    item.isDeleted = false;
    itemId = item._id;
    delete item._id;
    doc = await Item.findOneAndUpdate({_id : itemId}, item);
    if (!doc) {
        var err = new Error(error.error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
    return {"item" : JSON.stringify(doc)}
}

exports.delItem = async function(itemId) {
    doc = await Item.findOneAndUpdate({ _id : itemId }, { isDeleted : true });
    if (!doc) {
        var err = new Error(error.error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
}

exports.getItem = async function(itemId) {
    doc = await Item.findOne({ _id : itemId }, { isDeleted : false });
    if (!doc) {
        var err = new Error(error.error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
    return {"item" : JSON.stringify(doc)}
}

exports.getItems = async function(itemId) {
    docs = await Item.find({ isDeleted : false });
    if (!docs) {
        var err = new Error(error.error.INTERNAL_ERROR);
        err.status = 500;
        throw err;
    }
    return {"items" : JSON.stringify(docs)}
}



