#!/bin/bash
if [ $# -eq 0 ]; then
	echo "No arguments supplied"
else
	i=1
	eval "arg=\$$i"

	while [ -n "$arg" ]
	do
		mkdir "ex$arg"
		i=$((i+1))
	done
fi
