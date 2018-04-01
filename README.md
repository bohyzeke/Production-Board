Production-Board
================================================================================

Projekt na zobrazenie Produkcie na linkach ZMS prevadzky.

Production board bezi na RaspberyPi3 a zbiera udaje z jednotlivych Arduino dosiek.
RaspberryPi je pripojeny Monitor na ktorom sa zobrazuje dashboard NodeRed 

Arduino dosky komunikuju z raspberryPi na mqtt urovni.

# RaspberryPi

Na raspberryPi je nainstalovany server NodeRed s Dashboardom spojazdnenym VNC.
 Raspberry ma pridelenu pevnu IP a by sa Arduina vedeli na nu vzdy pripojit.
 Dashboard treba Naimportovat zo suborov [/Dashboard](https://github.com/bohyzeke/Production-Board/tree/master/Dashboard)

# Arduino Dosky

Arduino dosky maju za ulohu preposielat signal o vyrobenych kusoch na Raspberry.
 Arduino komunikuje z Raspberry po LAN sieti a preto musi mat spojazdneny ethernetshield.
 Arduino musi mat pridelenu pevnu IP na rovnakej podsieti ako Raspberry. 
 Zdrojak pre Arduino najdete [/Arduino](https://github.com/bohyzeke/Production-Board/tree/master/Arduino)
 
