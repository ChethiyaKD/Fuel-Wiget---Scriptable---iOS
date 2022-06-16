const provinceId = 5;
const districtId = 22;
const fuelType = "p92";
const city = 691;

let pin = await new Request("https://dev.chethiya-kusal.me/fuel_widget/icons/pin.png").loadImage()
let cal = await new Request("https://dev.chethiya-kusal.me/fuel_widget/icons/calendar.png").loadImage()
let fuel = await new Request("https://dev.chethiya-kusal.me/fuel_widget/icons/fuel.png").loadImage()
let clock = await new Request("https://dev.chethiya-kusal.me/fuel_widget/icons/clock.png").loadImage()
let bowser = await new Request("https://dev.chethiya-kusal.me/fuel_widget/icons/bowser.png").loadImage()


let req = new Request("https://fuel.gov.lk/api/v1/sheddetails/search");
req.method = "post";
req.headers = {
    "x-something": "foo bar",
    "Content-Type": "application/json"
};
req.body = JSON.stringify({
    "province": provinceId,
    "district": districtId,
    "fuelType": fuelType,
    "city": city
});

// use loadJSON because the API answers with JSON
let res = await req.loadJSON();
let shedName = res[0].shedName

const widget = new ListWidget();
const nameStack = widget.addStack()
const dateStack = widget.addStack()
const clockStack = widget.addStack()
const fuelStack = widget.addStack();
const bowserStack = widget.addStack();

const titleFont = new Font("ArialRoundedMTBold", 14)
const lightFont = new Font("Avenir-Light", 12)


for (shed of res) {
    //location
    nameStack.addImage(pin).imageSize = new Size(18, 18);
    nameStack.spacing = 8;
    let nametxt = nameStack.addText(shed.shedName);
    nametxt.font = titleFont

    // date
    dateStack.addImage(cal).imageSize = new Size(18, 18)
    let dateTxt = dateStack.addText(shed.lastupdatebyshed.split(" ")[0]);
    dateStack.spacing = 8
    dateTxt.font = lightFont
    dateStack.centerAlignContent()
    //time
    clockStack.addImage(clock).imageSize = new Size(18, 18)
    let timetxt = clockStack.addText(shed.lastupdatebyshed.split(" ")[1]);
    clockStack.spacing = 8
    timetxt.font = lightFont
    clockStack.centerAlignContent()

    // fuel
    fuelStack.addImage(fuel).imageSize = new Size(18, 18)
    let fuelCountTxt = fuelStack.addText(shed.fuelCapacity + '');
    let txt = fuelStack.addText("litres left")
    fuelCountTxt.font = titleFont;
    txt.font = lightFont
    fuelStack.centerAlignContent()
    fuelStack.spacing = 8

    // bowser
    bowserStack.addImage(bowser).imageSize = new Size(18, 18)
    let bowserTxt = bowserStack.addText(shed.bowserDispatch ? shed.eta : 'No data');
    bowserTxt.font = lightFont;
    bowserStack.centerAlignContent()
    bowserStack.spacing = 8

    widget.addText(" ")
}
Script.setWidget(widget);
