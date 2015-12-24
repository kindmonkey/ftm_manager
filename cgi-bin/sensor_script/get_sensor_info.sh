#!/bin/sh

# get IP
ip=`/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/search_mac.sh $1`

/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_humidity_info.sh $ip | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_humidity_info.awk
/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_temperature_info.sh $ip | awk -f /home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_temperature_info.awk
