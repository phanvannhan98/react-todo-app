const Memo = require('../models/memo.model')

module.exports.getAllMemo = async (req, res) => {

    // title: String,
    // name: String,
    // content: String,
    // category: {type: ObjectId, ref: 'categories'},
    // dateCreated: {type: Date, default: Date.now},
    // dateEdited: {type: Date, default: null},
    // dateDeleted: {type: Date, default: null},
    // isClip: Boolean,

    //  "5e532fe332814318f4110ea2"

    // var memo = new Memo({
    //     title: 'Memo Title',
    //     name: 'Hello World!',
    //     category: "5e532fe332814318f4110ea3",
    //     content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
    //     isClip: true
    // })

    // memo.save().then((a) => console.log(a)).catch((b)=>console.log(b))

    Memo.find().populate('category').exec().then((doc) => {
        res.send(doc)
    })
}

module.exports.getOneMemo = async (req, res) => {
    var id = req.params.id;
    console.log(id);

    var data = await Memo.findOne({ _id: id }).exec().catch(err => []);
    console.log(data);

    res.send(data);

}

module.exports.getMemoGroupByIDCategory = async (req, res) => {
    var id = req.params.id;
    console.log(id);

    var data = await Memo.findOne({ category: id }).exec().catch(err => []);
    console.log(data);

    res.send(data);

}
