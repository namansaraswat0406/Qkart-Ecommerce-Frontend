# Store workspace public IP to config file
IP_VAR="$(curlhttps://qkart-backend-hw45.onrender.com/)"
CONFIG='{"workspaceIp": "'"$IP_VAR"'"}'
echo $CONFIG > src/ipConfig.json
