//Hide result container
let container = document.querySelector(".qr-reader__result")
container.style.display = "none"

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:

    console.log(`Code matched = ${decodedText}`, decodedResult);

    let container = document.querySelector(".qr-reader__result")
    container.style.display = "block"

    let russian = document.getElementById("russian-goods");
    let ukrainian = document.getElementById("ukrainian-goods");
    let other = document.getElementById("other-goods");

    let decodedCountryCode = decodedText.substring(0, 3);

    let countryCodesRussia = ["460", "461", "462", "463", "464", "465", "466", "467", "468", "469"]
    let countryCodesUkraine = ["482"]

    if (decodedResult.result.format.formatName == "EAN_13") {

        if (countryCodesRussia.includes(decodedCountryCode)) {
            ukrainian.style.display = "none"
            other.style.display = "none"
            russian.style.display = "block"

        } else if (countryCodesUkraine.includes(decodedCountryCode)) {
            other.style.display = "none"
            russian.style.display = "none"
            ukrainian.style.display = "block"

        } else {
            ukrainian.style.display = "none"
            russian.style.display = "none"
            other.style.display = "block"
        }
    }

}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    //console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", {
        fps: 10,
        qrbox: {
            width: 250,
            height: 250
        }
    },
    /* verbose= */
    false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);