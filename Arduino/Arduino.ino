// Arduino uno a ethernet shield
/*
          Arduino UNO with W5100 Ethernetshield or  W5100 Ethernet module, used as MQTT client
          It will connect over LAN to the MQTT broker 
          and gives the Temperature and Humidity, as well as the state of some switches
          The topics have the format "home/br/sb" for southbound messages and  "home/nb" for northbound messages
          Southbound are messages going to the client, northbound are messages coming from the client
          As the available memory of a UNO  with Ethernetcard is limited, I have kept the topics short
          Also, the payloads  are kept short
          The Northbound topics are
          ZMS/L1/IP   Give IP of Arduino
          ZMS/L1/PCS  Give 1 PCS is Outgouing from Line
          ZMS/L1/NG1  Give 1 NG PCS from Line
          ZMS/L1/WORK Give Status Line 
 
          On Startup, the Client publishes the IP number
          
*/

#include <Ethernet.h>          // Ethernet.h library
#include <PubSubClient.h>      //PubSubClient.h Library from Knolleary

#define CLIENT_ID  "ZMSline1"  // definition arduino board  

#define PUBLISH_DELAY   3000   // that is 3 seconds interval

#define ledPin 13
#define PCSPin 6
#define NG1Pin 7
#define WorkPin 5

String PrefixMS = "ZMS/L1/";

 uint8_t mac[6] = {0x00, 0xaa, 0xbb, 0xcc, 0xde, 0x01};
String ip = "";

bool statusPCS = HIGH;
bool statusNG1 = HIGH;
bool statusWORK = HIGH;
bool relaystate = LOW;
//Temporary Start
bool startsend = HIGH;// flag for sending at startup

EthernetClient ethClient;
PubSubClient mqttClient;


long previousMillis;

void setup() {
  pinMode(4, INPUT_PULLUP);
  pinMode(relayPin, OUTPUT);

  // setup ethernet communication using DHCP
  if (Ethernet.begin(mac) == 0) {
    //Serial.println(F("Unable to configure Ethernet using DHCP"));
    for (;;);
  }

 //convert ip Array into String
  ip = String (Ethernet.localIP()[0]);
  ip = ip + ".";
  ip = ip + String (Ethernet.localIP()[1]);
  ip = ip + ".";
  ip = ip + String (Ethernet.localIP()[2]);
  ip = ip + ".";
  ip = ip + String (Ethernet.localIP()[3]);

  // setup mqtt client
  mqttClient.setClient(ethClient);
  mqttClient.setServer( "192.168.0.105", 1883); // local broker
  mqttClient.setCallback(callback);
  
 
  previousMillis = millis();
  
  mqttClient.publish((PrefixMS +"ip").c_str(), ip.c_str());
}

void loop() {

 


  // it's time to send new data?
  if (millis() - previousMillis > PUBLISH_DELAY) {
    sendData();
    previousMillis = millis();
  }
  mqttClient.loop();
}

void sendData() {
  char msgBuffer[20];
  if (mqttClient.connect(CLIENT_ID)) {
    mqttClient.publish((PrefixMS +"PCS").c_str(), dtostrf(t, 6, 2, msgBuffer));
    mqttClient.publish((PrefixMS +"NG1").c_str(), dtostrf(h, 6, 2, msgBuffer));
    mqttClient.publish((PrefixMS +"WORK").c_str(), (statusBD == HIGH) ? "ON" : "OFF");
    mqttClient.subscribe((PrefixMS +"command").c_str());
    if (startsend) {
      mqttClient.publish((PrefixMS +"ip").c_str(), ip.c_str());
      startsend = LOW;
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  char msgBuffer[20];
  // I am only using one ascii character as command, so do not need to take an entire word as payload
  // However, if you want to send full word commands, uncomment the next line and use for string comparison
  // payload[length]='\0';// terminate string with 0
//String strPayload = String((char*)payload);  // convert to string
  // Serial.println(strPayload); 

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  // Examine only the first character of the message
  
  if (payload[0] == 49)             // Message "1" in ASCII (turn output ON)
  {
    digitalWrite(LED_BUILTIN, HIGH);    //

  } else if (payload[0] == 48)      // Message "0" in ASCII (turn output OFF)
  {
    digitalWrite(relayPin, LOW);     //

  } else if (payload[0] == 50)
  {
    mqttClient.publish((PrefixMS +"ip").c_str(), ip.c_str());// publish IP nr
  } else {
    mqttClient.publish((PrefixMS +"command").c_str(), "Syntax Error");
  }

}
