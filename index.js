const { default: axios } = require("axios");

async function FindBefore(date) {
  const FindBeforeDate = new Date(date);
  console.info(`
  starting sniper to find something before; ${date} \n
  or in unix epoch: ${FindBeforeDate} \n 
  ------------------------
  `);

  // fetch the appointments
  const appointments = await axios
    .get(
      "https://online3.jccsoftware.nl/JCC/Afspraakgeleiding%20Productie/JCC-Afspraakgeleiding/Api/api/proxy/warp/appointment/availabletimelist?fromDate=2021-6-8&toDate=2023-6-15&activityId=143817a2-e691-4d24-938f-2bf17f57aa34&amount=1&locationId=12006f0d-cead-4a16-90e4-15166394dd38&currentAppointmentId=null",
      {
        credentials: "omit",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          language: "nl",
          token: "571217ee-fc1b-4b27-b784-0e93f413075e",
          id: "76bf07f2-1b38-411e-9743-6c279bcff1da",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        referrer: "https://alphenaandenrijn.mijnafspraakmaken.nl/",
        method: "GET",
        mode: "cors",
      }
    )
    .catch((err) => console.error(err));

    console.log(appointments.data.data.availableTimesList)
  // loop trough the appointment
  appointments.data.data.availableTimesList.forEach((element) => {
    // convert the appointment date to unix epoch since thats simpler
    const AppointmentDateEpoch = new Date(element).getTime();

    // check if the appointment before what we want
    if (AppointmentDateEpoch < FindBeforeDate) {
      while (true) {
        console.log("FOUND FOUND");
        console.log(
          "https://alphenaandenrijn.mijnafspraakmaken.nl/Client/#?link=6ac1"
        );
        console.log(element);
      }
    }
  });
}

setInterval(() => {
  FindBefore(process.env.date);
}, 5000);
