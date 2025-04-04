docker run -d \
  --hostname demo-rabbit \
  --name demo-rabbit \
  -v rabbitmq_data:/var/lib/rabbitmq \
  -v rabbitmq_logs:/var/log/rabbitmq \
  -v rabbitmq_config:/etc/rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
 rabbitmq:4-management
