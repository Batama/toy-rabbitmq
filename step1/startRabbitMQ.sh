docker run -d \
  --hostname demo-rabbit \
  --name demo-rabbit \
  -p 5672:5672 \
  -p 15672:15672 \
 rabbitmq:4-management
