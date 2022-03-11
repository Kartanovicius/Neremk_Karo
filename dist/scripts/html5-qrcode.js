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

    let countryCodesRu = [460,461,462,463,464,465,466,467,468,469]
    let countryCodesUk = [482]

    if (decodedResult.result.format.formatName == "EAN_13") {
        for (let i = 0; i < countryCodesRu.length; i++) {
            if (decodedCountryCode == countryCodesRu[i].toString()) {
                ukrainian.style.display = "none"
                other.style.display = "none"
                russian.style.display = "block"
                break;
            }
            else if (decodedText == "3583788388838") {
                other.style.display = "none"
                russian.style.display = "none"
                ukrainian.style.display = "block"
                break;
            } else {
                ukrainian.style.display = "none"
                russian.style.display = "none"
                other.style.display = "block"
                if (i = countryCodesRu.length) {
                    break;
                }
            }
        }
    }

  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    //console.warn(`Code scan error = ${error}`);
  }
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250} },
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);