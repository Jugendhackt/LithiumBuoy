#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <RCSwitch.h>

const char* ssid = "betahaus2.0";
const char* password = "betahaus10?";


RCSwitch Switch = RCSwitch();
ESP8266WebServer server(80);

#define LED 16

bool bOn = false;


void ChargingOn()
{
  digitalWrite(LED, 0);
  Switch.send("000101010101000101010101");
  bOn = true;
}
void ChargingOff()
{
  digitalWrite(LED, 1);
  Switch.send("000101010101000101010100");
  bOn = false;
}

void ChangeChargingState(bool bNewOn)
{
  if (bNewOn)
  {
    ChargingOn();
  }
  else
  {
    ChargingOff();
  }
}


void handleRoot() 
{
  //digitalWrite(led, 1);
  server.send(200, "text/plain", "hello from esp8266!");
  Serial.println("Request");
  //digitalWrite(led, 0);
}

void handleOnRequest() 
{
  server.send(200, "text/plain", "1");
  Serial.println("Turn on Request received!");
   ChargingOn();
}

void handleOffRequest() 
{
  server.send(200, "text/plain", "0");
  Serial.println("Turn off Request received!");
  ChargingOff();
}

void handleStateRequest() 
{
  String Response = "";
  if (bOn)
  {
    Response = "1";
  }
  else
  {  
    Response = "0";
  }
  server.send(200, "text/plain", Response);
}

void handleNotFound()
{
  //digitalWrite(led, 1);
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET)?"GET":"POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i=0; i<server.args(); i++){
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  //digitalWrite(led, 0);
}

void setup(void)
{
  pinMode(LED, OUTPUT);
 // digitalWrite(led, 0);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);
  server.on("/on", handleOnRequest);
  server.on("/off", handleOffRequest);
  server.on("/state", handleStateRequest);
  server.onNotFound (handleNotFound );
  
  server.begin(); 
  Serial.println("HTTP server started");

  
  Switch.enableTransmit(D1);
  Switch.setProtocol(1);
  Switch.setPulseLength(433);
  Switch.setRepeatTransmit(4);

  ChargingOff();
}

void loop(void){
  server.handleClient();
}
