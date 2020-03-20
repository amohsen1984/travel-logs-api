import { Given, When, Then } from "cucumber";
import axios from "axios";
import dotenv from "dotenv";
import { assert } from "chai";
import "reflect-metadata";

dotenv.config();

const serviceUrl = process.env.SERVICE_URL || "";

Given("A travel log is received", function() {
    this.receivedLog = {
        captainName: `My Captain - ${Date.now()}`,
        vesselName: "My Vessel",
        arrivalDate: "2019-01-01",
        port: "Dubai",
    } 
});

When("I ingest the travel log", async function() {
    await axios.post(
        serviceUrl,
        {
            variables: {}, 
            query: `mutation { addTravelLog(captainName: \"${this.receivedLog.captainName}\", vesselName: \"${this.receivedLog.vesselName}\", arrivalDate: \"${this.receivedLog.arrivalDate}\", port: \"${this.receivedLog.port}\"){captainName}}`
        }
    );
});

Then("I should be able to list it", async function() {
    const response = await axios.post(
        serviceUrl,
        {
            variables:{},
            query: `{  travelLogsByCaptainName(cptainName: \"${this.receivedLog.captainName}\") {    captainName    vesselName    arrivalDate    port  }}`,
        }
    );

    assert.deepEqual(response.data.data.travelLogsByCaptainName, [this.receivedLog]);
});
