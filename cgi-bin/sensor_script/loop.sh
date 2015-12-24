#!/bin/sh

#param_str=`/www/cgi-bin/sensor_script/get_sensor_list.sh`

while [ 0 ]
do
    param_str=`/home/kindmong/work/ftm_manager/cgi-bin/sensor_script/get_sensor_list.sh`
   
    for params in $param_str
    do
        node_id=`echo $params | awk -F"|" '{ print $1 }'`
        sensor_id=`echo $params | awk -F"|" '{ print $2 }'`
        `./get_fte_es7.sh $node_id | awk '/'$sensor_id'/' | xargs -t ./pull_sensor_data.sh`
    done

	sleep 10
done
