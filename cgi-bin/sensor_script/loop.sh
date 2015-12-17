#!/bin/sh

while [ 0 ]
do
	./get_humidity_info.sh 10.0.1.166 | awk -f get_humidity_info.awk | awk '/00:40:5c:64:4e:76/ && /02800101/' | xargs -t ./pull_sensor_data.sh
	sleep 60
done
