# Hitting the WebAPI

## CURL

```shell
# Send using JSON data
curl -d @sendemail.data -X POST https://u7xjubdgfl.execute-api.us-west-2.amazonaws.com/dev/sendemail
```

```shell
# Send with info in path and headers
curl -H @sendemail.headers -X POST https://u7xjubdgfl.execute-api.us-west-2.amazonaws.com/dev/sendemail/finljam@byu.edu/the30clues@gmail.com 
curl -X POST https://u7xjubdgfl.execute-api.us-west-2.amazonaws.com/dev/sendemail/finljam@byu.edu/the30clues@gmail.com -H "EmailText: Testing Body  🐙" -H "EmailSubject: Testing PATH MANUAL HEADERS 🐙" 
```
