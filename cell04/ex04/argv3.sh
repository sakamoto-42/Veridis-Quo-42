#!/bin/bash
if [ $# -eq 0 ]; then
	echo "No arguments supplied"
else
	i=1
	while [ $i -le 3 ]		
	do				
		if [ -n "$1" ]; then
			echo "$1"	
			shift		
		else			
			break
		fi
		i=$((i+1))
	done
fi