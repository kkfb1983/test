<?php

/**
 * PHP amqp(RabbitMQ) Demo-1  /svr/htdocs/test/rabbitmq/demo1/receive.php
 * @author  yuansir <yuansir@live.cn/yuansir-web.com>
 */
$exchangeName = 'demo';
$queueName = 'hello';
$routeKey = 'hello';

$connection = new AMQPConnection(array('host' => '127.0.0.1', 'port' => '5672', 'vhost' => '/', 'login' => 'guest', 'password' => 'guest'));
$connection->connect() or die("Cannot connect to the broker!\n");
$channel = new AMQPChannel($connection);
$exchange = new AMQPExchange($channel);
$exchange->setName($exchangeName);
$exchange->setType(AMQP_EX_TYPE_DIRECT);
$exchange->declare();
$queue = new AMQPQueue($channel);
$queue->setName($queueName);
$queue->declare();
$queue->bind($exchangeName, $routeKey);

$n = 0;
print_r('[*] Waiting for messages. To exit press CTRL+C');
while (true) {
	$n++;
	print_r($n);
        $queue->consume('callback') or die("Callback fail");
}
$connection->disconnect();

function callback($envelope, $queue) {
        $msg = $envelope->getBody();
        print_r(" [x] Received:" . $msg);
        $queue->nack($envelope->getDeliveryTag());
}

