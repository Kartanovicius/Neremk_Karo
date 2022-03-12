//Hide result container
let container = document.querySelector(".qr-reader__result")
container.style.display = "none"

let activeTimer = false


function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:

    console.log(`Code matched = ${decodedText}`, decodedResult);

    let container = document.querySelector(".qr-reader__result")
    let countryElement = container.querySelector(".qr-reader__result__country")
    let statusElement = container.querySelector(".qr-reader__result__status")
    let buttons = document.querySelectorAll("button")


    container.style.display = "flex"


    if (decodedResult.result.format.formatName == "EAN_13") {

        let object = EAN_13CountryCodes
        let found = false;


        for (const country in object) {

            let decodedCountryCode = decodedText.substring(0, 3);

            if (object[country].code.includes(decodedCountryCode)) {
                countryElement.innerHTML = country
                statusElement.innerHTML = object[country].status
                if (object[country].status == "Kremlin") {
                    statusElement.style.backgroundColor = "#ff0000"
                } else {
                    statusElement.style.backgroundColor = "#F5F5F5"
                }
                found = true
            }

        }

        if (!found) {
            countryElement.innerHTML = "Other"
        }

    }

    if (activeTimer == false) {
        activeTimer = true
        setTimeout(
            function () {
                activeTimer = false
                container.style.display = "none"
            }, 5000)
    }

    for (const button in buttons) {
        buttons[button].addEventListener("click", function () {
            container.style.display = "none"
        });
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